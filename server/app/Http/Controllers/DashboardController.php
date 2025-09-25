<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\ExamPaper;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{

    public function getDashboardData(Request $request)
    {
        $data = [
            'total'               => $this->getTotal(),
            'total_in_12_months'  => $this->getTotalIn12Months(),
            'total_last_month'    => $this->getTotalLastMonth(),
            'total_in_this_year'  => $this->getTotalInThisYear(),
            'total_courses'       => $this->getTotalCourses(),
            'total_exams'         => $this->getTotalExams(),
            'total_users'         => $this->getTotalUsers(),
            'payment_methods'     => $this->getPaymentMethods(),
            'courses_by_category' => $this->getCoursesByCategory(),
            'new_users'           => $this->getNewUsers(),
            'new_payments'        => $this->getNewPayments(),
            'top_courses'         => $this->getTopCourses(),
            'activity_in_4_weeks' => $this->getActivityIn4Weeks(),
        ];
        return $this->successResponse($data, 'Lấy dữ liệu dashboard thành công');
    }
    // tính tổng doanh thu
    public function getTotal(): int
    {
        $total = Payment::where('status', 'paid')->sum('amount');
        return $total;
    }
    // tỉnh tổng doanh thu trong 12 tháng
    public function getTotalIn12Months(): int
    {
        $total = Payment::where('status', 'paid')->whereYear('paid_at', now()->year)->sum('amount');
        return $total;
    }

    // tỉnh doanh thu tháng trước
    public function getTotalLastMonth(): int
    {
        $total = Payment::where('status', 'paid')->whereYear('paid_at', now()->year)
            ->whereMonth('paid_at', now()->subMonth()->month)
            ->sum('amount');
        return $total;
    }
    // tỉnh tổng doanh thu tháng này (trong 1 năm) trả về array(mỗi phần tử chứa số tiền từng tháng)
    public function getTotalInThisYear(): array
    {
        $totals = [];
        for ($month = 1; $month <= 12; $month++) {
            $total = Payment::where('status', 'paid')->whereYear('paid_at', now()->year)
                ->whereMonth('paid_at', $month)
                ->sum('amount');
            $totals[] = (int)$total;
        }
        return $totals;
    }

    // tỉnh tổng khóa học đang có
    public function getTotalCourses(): int
    {
        $total = Course::count();
        return $total;
    }

    // tỉnh tổng đề thi đang có
    public function getTotalExams(): int
    {
        $total = ExamPaper::count();
        return $total;
    }

    // tỉnh tổng người dùng đang có
    public function getTotalUsers(): int
    {
        $total = User::count();
        return $total;
    }

    // tính số lần thanh toán (theo phương thức thanh toán). VD: VNPAY: 10, MOMO: 5
    public function getPaymentMethods(): array
    {
        $methods = Payment::where('status', 'paid')->select('payment_method')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('payment_method')
            ->get()
            ->pluck('count', 'payment_method')
            ->toArray();
        return $methods;
    }

    // phân bổ khóa học theo danh mục (trả về tên danh mục + số khóa học trong đó)
    public function getCoursesByCategory(): array
    {
        $categories = Course::select('category')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('category')
            ->get()
            ->pluck('count', 'category')
            ->toArray();
        return $categories;
    }

    // get thông tin 4 người dùng mới (full_name, email)
    public function getNewUsers(): array
    {
        $users = User::select('id', 'full_name', 'avatar', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->where('role', 'student')
            ->limit(4)
            ->get();
        // loại bỏ trường created_at, role
        $users->makeHidden(['created_at', 'role']);
        return $users->toArray();
    }

    // get 4 hóa đơn được thanh toán mới nhất
    public function getNewPayments(): array
    {
        $payments = Payment::where('status', 'paid')
            ->with(['user:id,full_name', 'course:id,name,slug']) // Thêm slug vào select
            ->orderBy('paid_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($payment) {
                $course = $payment->course;
                return [
                    'full_name'   => $payment->user->full_name ?? null,
                    'course_name' => $course->name ?? null,
                    'slug'        => $course->slug ?? null,
                    'amount'      => $payment->amount,
                ];
            })
            ->toArray();
        return $payments;
    }

    // get 4 khóa học có số học viên cao nhất ( chỉ return về name, số học viên, doanh thu bán được)
    public function getTopCourses(): array
    {
        $courses = Course::withCount('students')
            ->withSum('payments', 'amount')
            ->has('students')
            ->orderBy('students_count', 'desc')
            ->limit(4)
            ->get(['id', 'name'])
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

    // lịch sử hoạt động trong 4 tuần gần đây (Khóa học mới, người dùng mới, đề thi mới - chỉ tính số lượng)
    public function getActivityIn4Weeks(): array
    {
        $activities = [];
        for ($week = 0; $week < 4; $week++) {
            $startOfWeek = now()->subWeeks($week)->startOfWeek();
            $endOfWeek   = now()->subWeeks($week)->endOfWeek();

            $newCourses = Course::whereBetween('start_date', [$startOfWeek, $endOfWeek])->count();
            $newUsers   = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])->where('role', 'student')->count();
            $newExams   = ExamPaper::whereBetween('start_time', [$startOfWeek, $endOfWeek])->count();

            $activities[] = [
                'week'        => "Tuần " . (4 - $week),
                'new_courses' => $newCourses,
                'new_users'   => $newUsers,
                'new_exams'   => $newExams,
            ];
        }
        return array_reverse($activities);
    }
}
