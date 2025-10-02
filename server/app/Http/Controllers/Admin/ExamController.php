<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Admin\AttemptExams\ViolationsCountFilter;
use App\Filters\PaperExam\CategoriesSlugFilter;
use App\Filters\PaperExam\DifficultiesSlugFilter;
use App\Filters\PaperExam\ProvincesSlugFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\ExamAttempt;
use App\Models\ExamPaper;
use App\Models\ExamQuestion;
use App\Services\GoogleAuthenService;
use App\Traits\AuthorizesOwnerOrAdmin;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ExamController extends BaseApiController
{
    use AuthorizesRequests, AuthorizesOwnerOrAdmin;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $limit = (int)($request->limit ?? 20);

        // Filter môn học, phân loại học, độ khóa
        $exams = QueryBuilder::for(ExamPaper::class)
            ->allowedFilters([
                'title',
                'grade_level',
                'subject',
                "difficulty",
                "exam_category",
                AllowedFilter::custom('provinces', new ProvincesSlugFilter),
                AllowedFilter::custom('categories', new CategoriesSlugFilter),
                AllowedFilter::custom('difficulties', new DifficultiesSlugFilter),
            ])
            // thêm cái where, nếu quyền là teacher thì chỉ lấy đề thi của mình
            ->when($user->role === 'teacher', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->allowedSorts(['start_time'])
            ->orderByDesc('id')
            ->paginate($limit);

        // ẩn thuộc tính này khi hiển thị
        $exams->makeHidden(['is_in_progress', 'question_count', 'total_attempt_count', 'attempt_count']);



        // Thêm thuộc tính: Số người đã làm bài
        $exams->getCollection()->transform(function ($item) {
            $item->registered_count = $item->examAttempts()->count();
            return $item;
        });
       

        return $this->successResponse($exams, 'Lấy danh sách đề thi thành công!');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        Gate::authorize('admin-teacher');

        // Validate dữ liệu đề thi
        $examData = $request->validate([
            'title'                  => 'required|string|max:255',
            'exam_category'          => 'required|string|max:255',
            'subject'                => 'required|string|max:255',
            'grade_level'            => 'required|string|max:255',
            'province'               => 'nullable|string|max:255',
            'difficulty'             => 'nullable|string|max:255',
            'max_score'              => 'required|numeric|min:0',
            'pass_score'             => 'required|numeric|min:0',
            'duration_minutes'       => 'required|integer|min:1',
            'start_time'             => 'nullable|date',
            'end_time'               => 'nullable|date|after:start_time',
            'description'            => 'nullable|string',
            'instructions'           => 'nullable|string',
            'is_active'              => 'nullable|boolean',
            'is_shuffle_questions'   => 'nullable|boolean',
            'is_shuffle_answers'     => 'nullable|boolean',
            'is_show_result'         => 'nullable|boolean',
            'is_retakeable'          => 'nullable|boolean',
            'max_attempts'           => 'nullable|integer|min:1',
            'anti_cheat_enabled'     => 'nullable|boolean',
            'max_violation_attempts' => 'nullable|integer|min:0',
            'questions'              => 'required|array|min:1',
            'is_password_protected'  => 'nullable|boolean',
        ]);

        // Validate từng câu hỏi
        foreach ($examData['questions'] as $idx => $question) {
            $request->validate([
                "questions.$idx.type"                 => 'required|string|in:SINGLE_CHOICE,MULTIPLE_CHOICE,TRUE_FALSE,NUMERIC_INPUT,ESSAY',
                "questions.$idx.content"              => 'required|string',
                "questions.$idx.score"                => 'required|numeric|min:0',
                "questions.$idx.options"              => 'nullable|array',
                "questions.$idx.options.*.content"    => 'required_with:questions.*.options|string',
                "questions.$idx.options.*.is_correct" => 'required_with:questions.*.options|boolean',
                "questions.$idx.correct_answer"       => 'required|array',
                "questions.$idx.explanation"          => 'nullable|string',
            ]);
        }

        try {
            DB::beginTransaction();

            // Chuẩn bị dữ liệu để tạo ExamPaper
            $examCreateData = [
                'title'                  => $examData['title'],
                'exam_category'          => $examData['exam_category'],
                'subject'                => $examData['subject'],
                'grade_level'            => $examData['grade_level'],
                'province'               => $examData['province'] ?? null,
                'difficulty'             => $examData['difficulty'] ?? 'normal',
                'max_score'              => $examData['max_score'],
                // pass_score sẽ ở định dạng 3,4,5 tương ứng 30%,40%,50% của max_score
                'pass_score'             => $examData['pass_score'] * 10 * $examData['max_score'] / 100,
                'duration_minutes'       => $examData['duration_minutes'],
                'start_time'             => $examData['start_time'] ?? null,
                'end_time'               => $examData['end_time'] ?? null,
                'description'            => $examData['description'] ?? null,
                'instructions'           => $examData['instructions'] ?? null,
                'status'                 => $examData['is_active'] ?? true,
                'is_shuffle_questions'   => $examData['is_shuffle_questions'] ?? false,
                'is_shuffle_answers'     => $examData['is_shuffle_answers'] ?? false,
                'is_show_result'         => $examData['is_show_result'] ?? false,
                'is_retakeable'          => $examData['is_retakeable'] ?? false,
                'max_attempts'           => $examData['max_attempts'] === 999 ? null : $examData['max_attempts'], // = null là không giới hạn số lần thi
                'anti_cheat_enabled'     => $examData['anti_cheat_enabled'] ?? false,
                'max_violation_attempts' => $examData['max_violation_attempts'] ?? 3,
                'user_id'                => $user->id,
                'password'               => ($examData['is_password_protected'] ?? false) ? GoogleAuthenService::generateSecret2FA($examData['title'])['secret'] : null,
            ];


            // Tạo ExamPaper
            $exam = ExamPaper::create($examCreateData);

            // Tạo các câu hỏi
            foreach ($examData['questions'] as $questionData) {
                // Xử lý đáp án đúng cho từng loại câu hỏi
                $correctAnswers = $questionData['correct_answer'] ?? [];

                // Xử lý options nếu có
                $options = [];
                if (!empty($questionData['options'])) {
                    foreach ($questionData['options'] as $option) {
                        $opt = [
                            'content' => $option['content'],
                        ];
                        $options[] = $opt;
                    }
                }

                $questionCreateData = [
                    'exam_paper_id' => $exam->id,
                    'type'          => $questionData['type'],
                    'content'       => $questionData['content'],
                    'marks'         => $questionData['score'],
                    'explanation'   => $questionData['explanation'] ?? null,
                    'options'       => $options,
                    'correct'       => $correctAnswers,
                ];

                ExamQuestion::create($questionCreateData);
            }

            DB::commit();

            // Load lại exam với questions
            $exam->load('questions');

            return $this->successResponse($exam, 'Tạo đề thi và câu hỏi thành công!');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->errorResponse(null, 'Có lỗi xảy ra khi tạo đề thi: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamPaper $exams_admin)
    {
        Gate::authorize('admin-teacher-owner', $exams_admin);
        $exam = $exams_admin->load('questions');
        $exam->url_qr_code_password = $exam->password ? GoogleAuthenService::getQRCodeBase64("Đề thi: " . $exam->title, $exam->password) : null;
        return $this->successResponse($exam, 'Lấy thông tin đề thi thành công!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamPaper $exams_admin)
    {
        Gate::authorize('admin-teacher-owner', $exams_admin);
        $data = $request->validate([
            'title'                  => 'nullable|string|max:255',
            'exam_category'          => 'nullable|string|max:255',
            'subject'                => 'nullable|string|max:255',
            'grade_level'            => 'nullable|string|max:255',
            'province'               => 'nullable|string|max:255',
            'difficulty'             => 'nullable|string|max:255',
            'max_score'              => 'nullable|numeric|min:0',
            'pass_score'             => 'nullable|numeric|min:0',
            'duration_minutes'       => 'nullable|integer|min:1',
            'anti_cheat_enabled'     => 'nullable|boolean',
            'is_active'              => 'nullable|boolean',
            'max_attempts'           => 'nullable|integer|min:1',
            'is_password_protected'  => 'nullable|boolean',
            'start_time'             => 'nullable|date',
            'end_time'               => 'nullable|date|after:start_time',
        ]);
        if ($data['is_password_protected']) {
            if (!$exams_admin->password) {
                $data['password'] = GoogleAuthenService::generateSecret2FA($data['title'] ?? $exams_admin->title)['secret'];
            }
        } else {
            $data['password'] = null;
        }
        $data['pass_score'] = isset($data['pass_score']) ? $data['pass_score'] * 10 * ($data['max_score'] ?? $exams_admin->max_score) / 100 : $exams_admin->pass_score;
        $exams_admin->update($data);
        return $this->successResponse($exams_admin, 'Cập nhật đề thi thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamPaper $exams_admin)
    {
        Gate::authorize('admin-teacher-owner', $exams_admin);
        // Chưa có người thi thì xóa được
        if ($exams_admin->examAttempts()->count() > 0) {
            return $this->errorResponse(null, 'Đề thi đã có người tham gia, không thể xóa!', 400);
        }
        $exams_admin->delete();
        return $this->successResponse(null, 'Xóa đề thi thành công!');
    }
    // get tất cả lịch sử làm bài thi
    public function allHistory(Request $request)
    {
        Gate::authorize('admin-teacher');

        $user = $request->user();
        $limit = (int)($request->limit ?? 20);

        $histories = QueryBuilder::for(ExamAttempt::class)
            ->allowedFilters([
                "started_at",
                "score",
                "status",
                "time_spent",
                AllowedFilter::custom('violation_count', new ViolationsCountFilter),
                AllowedFilter::partial('search', 'paper.title'),
                AllowedFilter::partial('full_name', 'user.full_name'),
                AllowedFilter::callback('min_score', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->where('score', '>=', (float) $value);
                    }
                }),
                AllowedFilter::callback('max_score', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->where('score', '<=', (float) $value);
                    }
                }),
            ])
            ->allowedSorts(['score', 'started_at', 'time_spent'])
            ->with(['paper', 'user:id,full_name,username']);

        // Nếu là teacher thì chỉ được xem lịch sử làm bài thi của các đề thi do mình tạo
        if ($user->role === 'teacher') {
            $teacherExamIds = ExamPaper::where('user_id', $user->id)->pluck('id');
            $histories->whereIn('exam_paper_id', $teacherExamIds);
        }
        // Nếu là admin thì xem được tất cả lịch sử

        $histories = $histories->orderByDesc('id')->paginate($limit);

        $histories->makeHidden(['details']);
        return $this->successResponse($histories, 'Lấy tất cả lịch sử làm bài thi thành công!');
    }

    // get lịch sử làm bài thi
    public function history(Request $request, ExamPaper $exams_admin)
    {
        Gate::authorize('admin-teacher-owner', $exams_admin);
        $limit   = (int)($request->limit ?? 20);
        $history = $exams_admin->examAttempts()
            ->with('user:id,full_name,username')
            ->orderByDesc('id')
            ->paginate($limit);

        return $this->successResponse($history, 'Lấy lịch sử làm bài thi thành công!');
    }
}
