<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CertificateController extends BaseApiController
{
    public function getInfoCertificate(Request $request, $slugCourse, $email)
    {
        // Check
        $course = Course::where('slug', $slugCourse)->firstOrFail();
        $user   = $course->students()->where('email', $email)->first();
        if (!$user) {
            return $this->errorResponse('Người dùng chưa đăng ký khóa học này.', 404);
        }
        // người dùng chưa xác minh
        if (!$user->hasVerifiedEmail()) {
            return $this->errorResponse('Người dùng chưa xác minh email, nên không có chứng chỉ.', 400);
        }
        // Check khóa học này xem người dùng đã học xong hết chưa
        $completedLessons = $course->lessons()->whereHas('completions', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();
        $totalLessons = $course->lessons()->count();
        if ($completedLessons < $totalLessons) {
            return $this->errorResponse('Người dùng chưa hoàn thành khóa học, nên không có chứng chỉ.', 400);
        }
        // get id video cuối cùng trong khóa
        $lastCompletedLesson = $course->lessons()->whereHas('completions', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->orderByDesc('id')->first();
        // Get thời gian hoàn thành video này
        $completionRecord = $lastCompletedLesson->completions()->where('user_id', $user->id)->first();
        $certificateData  = [
            'course_title'    => $course->name,
            'lesson_count'    => $totalLessons,
            'full_name'       => $user->full_name,
            'email'           => $user->email,
            'lecturer_name'   => $course->teacher->full_name,
            'completion_date' => Carbon::parse($completionRecord->updated_at)->format('d/m/Y'),
            'duration_hours'  => ceil($course->lessons()->sum('duration') / 3600),
        ];
        return $this->successResponse($certificateData, "Lấy thông tin chứng chỉ thành công");
    }
}
