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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamQuestion $question) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamQuestion $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamQuestion $question)
    {
        //
    }
}
