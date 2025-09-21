<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\ExamAttempt;
use App\Models\ExamPaper;
use App\Traits\AuthorizesOwnerOrAdmin;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class ExamAttemptController extends BaseApiController
{
    use AuthorizesRequests, AuthorizesOwnerOrAdmin;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ExamPaper $exam)
    {

        // Lấy lịch sử làm bài
        $user = $request->user();

        $attempts = $user->examAttempts()->where('exam_paper_id', $exam->id)->orderBy('id', 'DESC')->get();
        // Check xem nhưng để thi nào đang in_process mà đã hết giờ thì hủy bài
        $attempts->each(function ($item) use ($exam) {
            // Công thêm 2 phút để tránh lỗi (nếu k nộp bài thi => hủy bài)
            // $item->started_at dạng timestamp, còn $exam->duration_minutes dạng phút
            if ($item->status === 'in_progress' && Carbon::parse($item->started_at)->addMinutes($exam->duration_minutes + 2)->isPast()) {
                $item->update([
                    'status' => 'canceled',
                    'note'   => 'Thời gian làm bài đã hết nhưng không nộp.',
                ]);
            }
        });
        $attempts->each(function ($item) {
            $item->makeHidden(['details']);
        });
        return $this->successResponse($attempts, 'Lấy danh sách lịch sử làm bài thành công!');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(ExamAttempt $examAttempt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamAttempt $examAttempt) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamAttempt $examAttempt)
    {
        //
    }

    // phát hiện gian lận
    public function detectedCheat(Request $request, ExamPaper $exam)
    {
        $user = $request->user();
        // Lấy bài thi đang có status in_process
        $examAttempt = $user->examAttempts()
            ->where('exam_paper_id', $exam->id)
            ->where('status', 'in_progress')
            ->first();

        if (!$examAttempt) {
            return $this->errorResponse([], "Không tìm thấy dữ liệu đang làm bài thi của thí sinh!");
        }

        // Phân tích các lần làm bài để phát hiện gian lận

        $examAttempt->increment('violation_count');

        // Nếu vượt quá ngưỡng cho phép tự động đánh dấu bài thi và score = 0
        if ($examAttempt->violation_count > $exam->max_violation_attempts) {
            // Update status = canceled
            $examAttempt->update([
                'status' => 'detected',
                'note'   => 'Thí sinh gian lận trong quá trình thi cử. Bài thi đã bị hủy.',
                'score'  => 0,
            ]);
        }
        $exam = $examAttempt->paper();

        return $this->successResponse($examAttempt, "Đã đánh dấu bài thi gian lận!");
    }

    public function ranking(ExamPaper $exam)
    {
        // Lấy danh sách bài thi đã hoàn thành, chỉ tính lần làm bài đầu tiên của mỗi người
        $attempts = $exam->examAttempts()
            ->where('status', 'submitted')
            ->with(['user' => function ($query) {
                $query->select('id', 'avatar', 'full_name');
            }])
            ->orderByDesc('score')
            ->orderBy('time_spent') // Ưu tiên thời gian thấp hơn nếu điểm bằng nhau
            ->get()
            ->each(function ($item) {
                $item->makeHidden(['details']);
            })
            ->groupBy('user_id')
            ->map(function ($group) {
                // Chỉ lấy lần làm bài đầu tiên (theo id nhỏ nhất)
                return $group->sortBy('id')->first();
            })
            ->sort(function ($a, $b) {
                // Sắp xếp theo điểm giảm dần, nếu bằng thì theo time_spent tăng dần
                if ($a->score == $b->score) {
                    return $a->time_spent <=> $b->time_spent;
                }
                return $b->score <=> $a->score;
            })
            ->filter(function ($item) {
                return $item->score > 0;
            })
            ->take(10) // Lấy 10 người
            ->values();

        return $this->successResponse($attempts, 'Lấy bảng xếp hạng thành công!');
    }

    // Check ranking của người dùng đang gửi request
    public function checkUserRanking(Request $request, ExamPaper $exam)
    {
        $user = $request->user();

        // Lấy tất cả các bài thi đã nộp, chỉ lấy lần đầu tiên của mỗi người
        $attempts = $exam->examAttempts()
            ->where('status', 'submitted')
            ->orderByDesc('score')
            ->orderBy('time_spent')
            ->get()
            ->groupBy('user_id')
            ->map(function ($group) {
                return $group->sortBy('id')->first();
            })
            ->sort(function ($a, $b) {
                if ($a->score == $b->score) {
                    return $a->time_spent <=> $b->time_spent;
                }
                return $b->score <=> $a->score;
            })
            ->filter(function ($item) {
                return $item->score > 0;
            })
            ->values();

        // Tìm vị trí của user hiện tại
        $ranking = $attempts->search(function ($attempt) use ($user) {
            return $attempt->user_id == $user->id;
        });

        if ($ranking === false) {
            return $this->errorResponse([], 'Người dùng chưa có bài thi trong bảng xếp hạng.');
        }

        $userAttempt = $attempts[$ranking];
        $userAttempt->makeHidden(['details']);

        return $this->successResponse([
            'rank'    => $ranking + 1,
            'attempt' => $userAttempt,
        ], 'Lấy thứ hạng của người dùng thành công!');
    }

    public function myAttempts(Request $request, ExamPaper $exam, $id)
    {

        $user = $request->user();

        // Bài làm của học sinh
        // Nếu là admin hoặc teacher thì không cần lọc theo user_id
        if ($user->hasRole(['admin', 'teacher'])) {
            $attempt = ExamAttempt::where('exam_paper_id', $exam->id)
                ->where('id', $id)
                ->whereIn('status', ['submitted', 'detected'])
                ->first();
        } else {
            $attempt = ExamAttempt::where('exam_paper_id', $exam->id)
                ->where('user_id', $user->id)
                ->where('id', $id)
                ->whereIn('status', ['submitted', 'detected'])
                ->first();
        }
        if (!$attempt) {
            return $this->errorResponse(null, 'Không tìm thấy bài làm của bạn!');
        }

        $answers = $attempt->details['answers'];
        // return $this->successResponse($attempt->details['answers'], 'Lấy thông tin bài làm thành công!');

        if (!$attempt) {
            return $this->errorResponse(null, 'Không tìm thấy bài làm của bạn!');
        }

        $questions = $exam->questions;
        // $this->successResponse($questions, 'Lấy thông tin bài làm thành công!');

        // Gắn thông tin đáp án của người dùng vào từng câu hỏi
        $questions->each(function ($question) use ($answers) {
            // Nếu người dùng có trả lời câu hỏi này
            if (isset($answers[$question->id])) {
                $userAnswer            = $answers[$question->id];
                $question->is_correct  = $userAnswer['is_correct'];
                $question->your_choice = $userAnswer['value'];
                // Nếu trả lời sai, lấy đáp án đúng

            } else {
                $question->your_choice = [];
                $question->is_correct  = false;
            }

            $question->correct_answer = array_map(fn($item) => $item['content'], array_filter($question->correct, fn($item) => $item['is_correct']));
        });
        return $this->successResponse($exam->questions->makeHidden(['correct']), 'Lấy thông tin bài làm thành công!');

        // Ẩn chi tiết nếu cần

        return $this->successResponse($attempt, 'Lấy thông tin bài làm thành công!');
    }
}
