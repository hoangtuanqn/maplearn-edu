<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\ExamPaper;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{
    // Dashboard data cho teacher - chỉ hiển thị dữ liệu của chính teacher đó
    public function getDashboardData(Request $request)
    {
        $teacher = $request->user();

        // Kiểm tra quyền teacher
        if (!$teacher->isTeacher()) {
            return $this->errorResponse('Bạn không có quyền truy cập', 403);
        }

        $data = [
            'total'               => $this->getTotal($teacher),
            'total_in_12_months'  => $this->getTotalIn12Months($teacher),
            'total_last_month'    => $this->getTotalLastMonth($teacher),
            'total_in_this_year'  => $this->getTotalInThisYear($teacher),
            'total_courses'       => $this->getTotalCourses($teacher),
            'total_exams'         => $this->getTotalExams($teacher),
            'total_students'      => $this->getTotalStudents($teacher),
            'payment_methods'     => $this->getPaymentMethods($teacher),
            'courses_by_category' => $this->getCoursesByCategory($teacher),
            'new_students'        => $this->getNewStudents($teacher),
            'new_payments'        => $this->getNewPayments($teacher),
            'top_courses'         => $this->getTopCourses($teacher),
            'activity_in_4_weeks' => $this->getActivityIn4Weeks($teacher),
        ];

        return $this->successResponse($data, 'Lấy dữ liệu dashboard thành công');
    }

    // Tính tổng doanh thu của teacher
    public function getTotal(User $teacher): int
    {
        $courseIds = $teacher->courses()->pluck('id');
        $total = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->sum('amount');
        return (int)$total;
    }

    // Tính tổng doanh thu trong 12 tháng của teacher
    public function getTotalIn12Months(User $teacher): int
    {
        $courseIds = $teacher->courses()->pluck('id');
        $total = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->whereYear('paid_at', now()->year)
            ->sum('amount');
        return (int)$total;
    }

    // Tính doanh thu tháng trước của teacher
    public function getTotalLastMonth(User $teacher): int
    {
        $courseIds = $teacher->courses()->pluck('id');
        $total = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->whereYear('paid_at', now()->year)
            ->whereMonth('paid_at', now()->subMonth()->month)
            ->sum('amount');
        return (int)$total;
    }

    // Tính doanh thu từng tháng trong năm của teacher
    public function getTotalInThisYear(User $teacher): array
    {
        $courseIds = $teacher->courses()->pluck('id');
        $totals = [];
        for ($month = 1; $month <= 12; $month++) {
            $total = Payment::where('status', 'paid')
                ->whereIn('course_id', $courseIds)
                ->whereYear('paid_at', now()->year)
                ->whereMonth('paid_at', $month)
                ->sum('amount');
            $totals[] = (int)$total;
        }
        return $totals;
    }

    // Tính tổng khóa học của teacher
    public function getTotalCourses(User $teacher): int
    {
        return $teacher->courses()->count();
    }

    // Tính tổng đề thi của teacher
    public function getTotalExams(User $teacher): int
    {
        return ExamPaper::where('user_id', $teacher->id)->count();
    }

    // Tính tổng học sinh của teacher (qua các khóa học đã bán)
    public function getTotalStudents(User $teacher): int
    {
        $courseIds = $teacher->courses()->pluck('id');
        return Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->distinct('user_id')
            ->count('user_id');
    }

    // Thống kê phương thức thanh toán của các khóa học teacher
    public function getPaymentMethods(User $teacher): array
    {
        $courseIds = $teacher->courses()->pluck('id');
        $methods = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->select('payment_method')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('payment_method')
            ->get()
            ->pluck('count', 'payment_method')
            ->toArray();
        return $methods;
    }

    // Phân bổ khóa học theo danh mục của teacher
    public function getCoursesByCategory(User $teacher): array
    {
        $categories = $teacher->courses()
            ->select('category')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('category')
            ->get()
            ->pluck('count', 'category')
            ->toArray();
        return $categories;
    }

    // Lấy 4 học sinh mới nhất của teacher
    public function getNewStudents(User $teacher): array
    {
        $courseIds = $teacher->courses()->pluck('id');
        $studentIds = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->orderBy('paid_at', 'desc')
            ->limit(4)
            ->pluck('user_id');

        $students = User::whereIn('id', $studentIds)
            ->select('id', 'full_name', 'avatar', 'email')
            ->get();
        return $students->toArray();
    }

    // Lấy 4 hóa đơn mới nhất của teacher
    public function getNewPayments(User $teacher): array
    {
        $courseIds = $teacher->courses()->pluck('id');
        $payments = Payment::where('status', 'paid')
            ->whereIn('course_id', $courseIds)
            ->with(['user:id,full_name,avatar', 'course:id,name'])
            ->orderBy('paid_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($payment) {
                return [
                    'full_name'   => $payment->user->full_name ?? null,
                    'course_name' => $payment->course->name ?? null,
                    'amount'      => $payment->amount,
                    'avatar'      => $payment->user->avatar ?? null,
                ];
            })
            ->toArray();
        return $payments;
    }

    // Lấy top 4 khóa học có nhiều học viên nhất của teacher
    public function getTopCourses(User $teacher): array
    {
        $courses = $teacher->courses()
            ->withCount('students')
            ->withSum('payments', 'amount')
            ->has('students')
            ->orderBy('students_count', 'desc')
            ->limit(4)
            ->get(['id', 'name', 'slug'])
            ->map(function ($course) {
                return [
                    'name'           => $course->name,
                    'students_count' => $course->students_count,
                    'slug'           => $course->slug,
                    'revenue'        => (int)$course->payments_sum_amount ?? 0,
                ];
            })
            ->toArray();
        return $courses;
    }

    // Lịch sử hoạt động trong 4 tuần gần đây của teacher
    public function getActivityIn4Weeks(User $teacher): array
    {
        $activities = [];
        for ($week = 0; $week < 4; $week++) {
            $startOfWeek = now()->subWeeks($week)->startOfWeek();
            $endOfWeek   = now()->subWeeks($week)->endOfWeek();

            $newCourses = $teacher->courses()
                ->whereBetween('start_date', [$startOfWeek, $endOfWeek])
                ->count();

            $courseIds = $teacher->courses()->pluck('id');
            $newStudents = Payment::where('status', 'paid')
                ->whereIn('course_id', $courseIds)
                ->whereBetween('paid_at', [$startOfWeek, $endOfWeek])
                ->distinct('user_id')
                ->count('user_id');

            $newExams = ExamPaper::where('user_id', $teacher->id)
                ->whereBetween('start_time', [$startOfWeek, $endOfWeek])
                ->count();

            $activities[] = [
                'week'        => "Tuần " . (4 - $week),
                'new_courses' => $newCourses,
                'new_students' => $newStudents,
                'new_exams'   => $newExams,
            ];
        }
        return array_reverse($activities);
    }

    // get số học sinh của giáo viên (compatibility method)
    public function getStudentCount(Request $request): int
    {
        $teacher = $request->user();
        return $this->getTotalStudents($teacher);
    }
}
