<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\ExamPaper;
use App\Models\ExamQuestion;
use Illuminate\Http\Request;

class ExamQuestionController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ExamPaper $exam)
    {
        // Kiểm tra người đang lấy có lịch sử đang làm hay k

        $user = $request->user();

        $attemp = $user->examAttempts()->where('exam_paper_id', $exam->id)->where('status', 'in_progress')->first();

        if (!$attemp) {
            return $this->errorResponse('Không tìm thấy bài làm!', 403);
        }
        // Check thời gian làm bài
        if ($attemp && $attemp->started_at->diffInMinutes(now()) > $exam->duration_minutes) {
            // Tự động nộp bài, gọi controller nộp bài
            $examPaper = new ExamPaperController();
            $examPaper->submitExam($request, $exam);
            return $this->errorResponse('Thời gian làm bài đã hết hạn', 403);
        }
        // Lấy đề thi + answers
        $exam->load('questions');
        return $this->successResponse($exam);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'exam_paper_id' => 'required|exists:exam_papers,id',
            'type'        => 'required|string',
            'content'     => 'required|string',
            'marks'       => 'required|numeric|min:0',
            'options'     => 'nullable|array',
            'options.*.content' => 'required_with:options|string',
            'options.*.is_correct' => 'required_with:options|boolean',
            'explanation' => 'nullable|string',
        ]);

        // Chuẩn hóa options
        $options = [];
        $correctAnswers = [];
        if (!empty($data['options'])) {
            foreach ($data['options'] as $option) {
                $options[] = [
                    'content' => $option['content'],
                ];
                if (isset($option['is_correct']) && $option['is_correct']) {
                    $correctAnswers[] = $option['content'];
                }
            }
        }
        // Check nếu điểm vượt quá max_score của đề thi
        $examPaper = ExamPaper::find($data['exam_paper_id']);
        $totalMarks = $examPaper->questions()->sum('marks');
        if ($totalMarks + $data['marks'] > $examPaper->max_score) {
            return $this->errorResponse(null, 'Tổng điểm câu hỏi vượt quá điểm tối đa của đề thi', 400);
        }

        $examQuestion = ExamQuestion::create([
            'exam_paper_id' => $data['exam_paper_id'],
            'type'        => $data['type'],
            'content'     => $data['content'],
            'marks'       => $data['marks'],
            'options'     => $options,
            'correct'     => $correctAnswers,
            'explanation' => $data['explanation'] ?? null,
        ]);

        return $this->successResponse($examQuestion, 'Tạo câu hỏi thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamQuestion $question) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamQuestion $exam_question)
    {
        $data = $request->validate([
            'type'        => 'required|string|in:SINGLE_CHOICE,MULTIPLE_CHOICE,TRUE_FALSE,NUMERIC_INPUT,ESSAY',
            'content'     => 'required|string',
            'marks'       => 'required|numeric|min:0',
            'options'     => 'nullable|array',
            'options.*.content' => 'required_with:options|string',
            'options.*.is_correct' => 'required_with:options|boolean',
            'correct'     => 'required|array',
            'explanation' => 'nullable|string',
        ]);

        // Chuẩn hóa options
        $options = [];
        if (!empty($data['options'])) {
            foreach ($data['options'] as $option) {
                $options[] = [
                    'content' => $option['content'],
                ];
            }
        }

        // Check nếu điểm vượt quá max_score của đề thi
        $examPaper = $exam_question->examPaper;
        $totalMarks = $examPaper->questions()->where('id', '!=', $exam_question->id)->sum('marks');
        if ($totalMarks + $data['marks'] > $examPaper->max_score) {
            return $this->errorResponse(null, 'Tổng điểm câu hỏi vượt quá điểm tối đa của đề thi', 400);
        }

        // Cập nhật câu hỏi
        $exam_question->update([
            'type'        => $data['type'],
            'content'     => $data['content'],
            'marks'       => $data['marks'],
            'options'     => $options,
            'correct'     => $data['correct'],
            'explanation' => $data['explanation'] ?? null,
        ]);

        return $this->successResponse($exam_question, 'Cập nhật câu hỏi thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamQuestion $exam_question)
    {
        $exam_question->delete();
        return $this->successResponse(null, 'Xoá câu hỏi thành công');
    }
}
