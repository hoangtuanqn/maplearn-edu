<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Certificate;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CertificateController extends BaseApiController
{
    public function getInfoCertificate(Certificate $certificate)
    {
        $course = $certificate->course;
        $user   = $certificate->user;
        if (!$user) {
            return $this->errorResponse('Người dùng không tồn tại.', 404);
        }
        if (!$course) {
            return $this->errorResponse('Khóa học không tồn tại.', 404);
        }
        if (!$user->hasVerifiedEmail()) {
            return $this->errorResponse('Yêu cầu xác minh địa chỉ email để xem chứng chỉ.', 400);
        }
        $totalLessons = $course->lessons()->count();
        $certificateData  = [
            'course_title'    => $course->name,
            'lesson_count'    => $totalLessons,
            'full_name'       => $certificate->full_name,
            'email'           => $user->email,
            'lecturer_name'   => $course->teacher->full_name,
            'completion_date' => Carbon::parse($certificate->issued_at)->format('d/m/Y'),
            'duration_hours'  => ceil($course->lessons()->sum('duration') / 3600),
        ];
        return $this->successResponse($certificateData, "Lấy thông tin chứng chỉ thành công");
    }
}
