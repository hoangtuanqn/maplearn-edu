<?php

namespace App\Http\Controllers;

use App\Filters\PaperExam\CategoriesSlugFilter;
use App\Filters\PaperExam\DifficultiesSlugFilter;
use App\Filters\PaperExam\ProvincesSlugFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\Certificate;
use App\Models\ExamAttempt;
use App\Models\ExamPaper;
use App\Notifications\CourseCompletedNotification;
use App\Traits\AuthorizesOwnerOrAdmin;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ExamPaperController extends BaseApiController
{
    use AuthorizesRequests, AuthorizesOwnerOrAdmin;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = (int)($request->limit ?? 20);
        // Filter môn học, phân loại học, độ khóa
        $posts = QueryBuilder::for(ExamPaper::class)
            ->where('status', true)
            ->where(function ($query) {
                $query->whereNull('end_time')
                    ->orWhere('end_time', '>', now());
            })
            ->allowedFilters([
                'title',
                'grade_level',
                'subject',
                "difficulty",
                AllowedFilter::custom('provinces', new ProvincesSlugFilter),
                AllowedFilter::custom('categories', new CategoriesSlugFilter),
                AllowedFilter::custom('difficulties', new DifficultiesSlugFilter),
            ])
            ->orderByDesc('id')
            ->paginate($limit);

        return $this->successResponse($posts, 'Lấy danh sách đề thi thành công!');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ExamPaper $exam)
    {
        $user = $request->user();
        if ($exam->end_time && $exam->end_time < now()) {
            return $this->errorResponse(null, 'Đề thi đã kết thúc!', 400);
        }
        if ($exam->status == false) {
            // check người dùng đã mua khóa học có đề thi này chưa
            if (!$user || !$user->purchasedCourses()->where('exam_paper_id', $exam->id)->exists()) {
                return $this->errorResponse(null, 'Đề thi không tồn tại!', 404);
            }
        }

        return $this->successResponse($exam, 'Lấy thông tin đề thi thành công!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamPaper $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamPaper $exam)
    {
        //
    }

    public function startExam(Request $request, ExamPaper $exam)
    {
        $user = $request->user();
        // Check số lần đã thi
        if ($exam->max_attempts && $exam->attempt_count >= $exam->max_attempts) {
            return $this->errorResponse(null, 'Bạn đã vượt quá số lần làm bài thi cho phép!');
        }
        if (!ExamAttempt::where('exam_paper_id', $exam->id)->where('user_id', $user->id)->where('status', 'in_progress')->exists()) {
            // Chưa có bài làm nào, tạo mới
            ExamAttempt::create([
                'exam_paper_id' => $exam->id,
                'user_id'       => $user->id,
                'status'        => 'in_progress',
                'details'       => (['answers' => [], 'start' => now()->timestamp, 'questionActive' => 0]), // Khởi tạo chi tiết bài làm là mảng rỗng
                'started_at'    => now(),
            ]);

            return $this->successResponse(null, "Bắt đầu làm bài thi thành công!");
        } else {
            return $this->errorResponse(null, 'Bạn đang trong quá trình làm bài thi này rồi!');
        }
    }

    // Xem chi tiết thông tin bài thi (bài thi cuối cùng, thi gần nhất)
    public function detailResultExam(Request $request, ExamPaper $exam, $id = null)
    {
        $user = $request->user();
        // Kiểm tra id này có phải của người dùng này hay k

        $this->authorize('admin-teacher-owner', $exam);
        $query = ExamAttempt::where('exam_paper_id', $exam->id)
            ->where('user_id', $user->id)
            ->whereIn('status', ['submitted', 'detected']);
        if ($id) {
            $query->where('id', $id);
        }
        $exam['results'] = $query->latest()->first();
        if ($exam['results']) {
            return $this->successResponse($exam, 'Lấy thông tin bài thi thành công!');
        } else {
            return $this->errorResponse(null, 'Không tìm thấy thông tin bài thi!');
        }
    }

    /// Submit bài làm
    public function submitExam(Request $request, ExamPaper $exam)
    {
        $user = $request->user();
        // Validate input
        $data = $request->validate([
            'data' => 'required|array',
        ]);

        $attempt = ExamAttempt::where('exam_paper_id', $exam->id)
            ->where('user_id', $user->id)
            ->where('status', 'in_progress')
            ->first();

        if (!$attempt) {
            return $this->errorResponse(null, 'Không tìm thấy dữ liệu bài thi!');
        }

        $answers = $data['data'];

        $paper     = $exam->load('questions');
        $questions = $paper->questions;

        $scores = 0; // Điểm của người dùng

        // Duyệt qua câu trả lời của user
        foreach ($answers['answers'] as $key => $value) {
            foreach ($questions as $index =>  $question) {
                if ($question->id == $key) {
                    $questionIndex = $index;
                    break;
                }
            }

            $question = $questions[$questionIndex] ?? null;
            if (!$question) {
                continue;
            }
            // return $question;

            $isCorrect = false;

            switch ($question->type) {
                case "SINGLE_CHOICE":
                case "NUMERIC_INPUT":
                case "TRUE_FALSE":
                    // $value có thể là mảng -> lấy phần tử đầu tiên
                    $userAnswer = is_array($value) ? $value[0] : $value;

                    $isCheck = array_filter($question->correct, fn($item) => $item === $userAnswer);

                    if ($isCheck) {
                        $isCorrect = true;
                        $scores += $question->marks ?? 0;
                    }

                    $answers['answers'][$key] = [
                        'value'      => $userAnswer,
                        'is_correct' => $isCorrect,
                    ];
                    break;

                case "MULTIPLE_CHOICE":
                    $answersInCorrect = $question->correct;
                    if (is_array($value) && count($value) === count($answersInCorrect)) {
                        $allCorrect = true;
                        foreach ($answersInCorrect as $answerInCorrect) {
                            if (!in_array($answerInCorrect, $value)) {
                                $allCorrect = false;
                                break;
                            }
                        }
                        if ($allCorrect) {
                            $isCorrect = true;
                            $scores += $question->marks ?? 0;
                        }
                    }

                    $answers['answers'][$key] = [
                        'value'      => $value,
                        'is_correct' => $isCorrect,
                    ];
                    break;

                case "DRAG_DROP":
                    $answersInCorrect = $question->correct;
                    if (is_array($value) && count($value) === count($answersInCorrect)) {
                        $i          = 0;
                        $allCorrect = true;
                        foreach ($answersInCorrect as $answerInCorrect) {
                            if ($answerInCorrect != $value[$i++]) {
                                $allCorrect = false;
                                break;
                            }
                        }
                        if ($allCorrect) {
                            $isCorrect = true;
                            $scores += $question->marks ?? 0;
                        }
                    }

                    $answers['answers'][$key] = [
                        'value'      => $value,
                        'is_correct' => $isCorrect,
                    ];
                    break;
            }
        }
        // dd($answers);
        // bỏ key không cần thiết
        unset($answers['questionActive']);

        // Cập nhật attempt
        $attempt->status  = 'submitted';
        $attempt->score   = $scores;
        $attempt->details = $answers; // lưu JSON chuẩn
        $attempt->save();

        // Kiểm tra các khóa học của người dùng, xem khóa học nào đã hoàn thành rồi (chưa nhận chứng chỉ mà đã hoàn thành video).
        // exam_paper_id = $exam->id thì gửi email hoàn thành khóa học (chỉ gửi lần đầu tiên)
        if ($scores > $exam->pass_score) {
            $user->completedCourses();
            foreach ($user->completedCourses() as $course) {
                // Gui thong bao can
                $courseExam = $course->exam;
                if ($courseExam && $courseExam->id === $exam->id) {
                    // Tạo chứng chỉ cho người học
                    $cert = Certificate::create([
                        'user_id'   => $user->id,
                        'full_name' => $user->full_name,
                        'course_id' => $course->id,
                    ]);
                    if ($cert) {
                        $user->notify(new CourseCompletedNotification($course, env('APP_URL_FRONT_END') . '/certificate/' . $cert->code));
                    }
                }
            }
        }


        return $this->successResponse([
            'id_attempt' => $attempt->id,
            'scores' => $scores,
        ], 'Bài làm đã được nộp thành công');
    }
}
