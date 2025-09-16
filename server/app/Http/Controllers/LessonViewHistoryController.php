<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\CourseLesson;
use App\Models\LessonViewHistory;
use Illuminate\Http\Request;

class LessonViewHistoryController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'lesson_id' => 'required|exists:course_lessons,id',
            'progress' => 'required|integer|min:0',
        ]);

        // Kiểm tra người dùng đã mua khóa học này chưa
        $lesson = CourseLesson::where('id', $data['lesson_id'])->with('chapter.course')->first();
        if (!$lesson || !$lesson->chapter || !$lesson->chapter->course) {
            return $this->errorResponse(null, 'Không tìm thấy bài học hoặc khóa học!', 404);
        }

        $courseId = $lesson->chapter->course->id;
        $hasPurchased = $user->purchasedCourses()->where('courses.id', $courseId)->exists();
        if (!$hasPurchased) {
            return $this->errorResponse(null, 'Bạn chưa mua khóa học này!', 403);
        }
        $courseLesson = CourseLesson::find($lesson->id);


        // Tạo mới dữ liệu history
        $existingView = LessonViewHistory::where([
            'user_id' => $user->id,
            'lesson_id' => $data['lesson_id']
        ])->first();

        $lessonView = LessonViewHistory::updateOrCreate(
            [
                'user_id' => $user->id,
                'lesson_id' => $data['lesson_id']
            ],
            [
                'progress' => $data['progress'],
                'is_completed' => $existingView && $existingView->is_completed ? true : ($courseLesson->duration - 30 <= $data['progress'])
            ]
        );

        return $this->successResponse($lessonView, 'Thao tác thành công!', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(LessonViewHistory $lesson)
    {
        return $this->successResponse($lesson, 'Lịch sử xem bài học đã được tìm thấy!', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LessonViewHistory $lesson)
    {
        // Cập nhật giây xem
        $data = $request->validate([
            'progress' => 'required|integer|min:0',
        ]);
        $courseLesson = CourseLesson::find($lesson->lesson_id);
        $data['is_completed'] = $courseLesson->duration - 30 <= $data['progress'];

        $lesson->update($data);

        return $this->successResponse($lesson, 'Lịch sử xem bài học đã được cập nhật!', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LessonViewHistory $lesson)
    {
        //
    }
}
