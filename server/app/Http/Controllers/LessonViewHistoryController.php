<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\LessonViewHistory;
use App\Notifications\CourseCompletedNotification;
use App\Notifications\CourseCompletionExamRequiredNotification;
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
            'progress'  => 'required|integer|min:0',
        ]);

        // Kiểm tra người dùng đã mua khóa học này chưa
        $lesson = CourseLesson::where('id', $data['lesson_id'])->with('chapter.course')->first();
        if (!$lesson || !$lesson->chapter || !$lesson->chapter->course) {
            return $this->errorResponse(null, 'Không tìm thấy bài học hoặc khóa học!', 404);
        }

        $courseId     = $lesson->chapter->course->id;
        $hasPurchased = $user->purchasedCourses()->where('courses.id', $courseId)->exists();
        if (!$hasPurchased) {
            return $this->errorResponse(null, 'Bạn chưa mua khóa học này!', 403);
        }
        $courseLesson = CourseLesson::find($lesson->id);

        // Tạo mới dữ liệu history
        $existingView = LessonViewHistory::where([
            'user_id'   => $user->id,
            'lesson_id' => $data['lesson_id'],
        ])->first();
        $totalLessons = CourseLesson::whereHas('chapter', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->count();
        // đếm số video đã hoàn thành
        $completedLessons = LessonViewHistory::where('user_id', $user->id)->whereHas('lesson.chapter', function ($query) use ($courseId) {
            $query->where('course_id', $courseId);
        })->where('is_completed', true)->count();

        $lessonView = LessonViewHistory::updateOrCreate(
            [
                'user_id'   => $user->id,
                'lesson_id' => $data['lesson_id'],
            ],
            [
                'progress'     => $data['progress'],
                'is_completed' => $existingView && $existingView->is_completed ? true : ($courseLesson->duration - 30 <= $data['progress']),
            ]
        );
        // Check xem người dùng đã có chứng chỉ chưa
        $isCertificateExist = Certificate::where('user_id', $user->id)->where('course_id', $courseId)->exists();
        if ($completedLessons == $totalLessons - 1 && $lessonView->is_completed && !$isCertificateExist) {
            // Gửi email thông báo hoàn thành khóa học
            $this->sendCourseCompletionEmail($request, $courseLesson);
        }
        return $this->successResponse($lessonView, 'Thao tác thành công!', 201);
    }
    // gửi email khi hoàn thành khóa học
    private function sendCourseCompletionEmail(Request $request, CourseLesson $lesson)
    {
        $user = $request->user();
        // Kiểm tra xem người dùng đã hoàn thành tất cả các bài học trong khóa học chưa
        $course       = $lesson->chapter->course;
        $totalLessons = $course->lessons()->count();
        $completedLessons = LessonViewHistory::where('user_id', $user->id)
            ->whereIn('lesson_id', $course->lessons->pluck('id'))
            ->where('is_completed', true)
            ->count();
        if ($totalLessons > 0 && $completedLessons >= $totalLessons) {
            // Gửi thông báo cần
            $exam = $course->exam;
            $user->notify(new CourseCompletionExamRequiredNotification($user, $course, $exam));
            // $user->notify(new CourseCompletedNotification($course, env('APP_URL_FRONT_END') . '/certificate/' . $course->slug . '/' . $user->email));
        }
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
        $courseLesson         = CourseLesson::find($lesson->lesson_id);
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
