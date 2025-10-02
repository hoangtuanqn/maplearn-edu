<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\ExamPaper;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{

    public function getDashboardData(Request $request)
    {
        // Validate start_date và end_date nếu có
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $data = [
            'total_in_this_year'  => $this->getTotalInThisYear($startDate, $endDate),
            'total_courses'       => $this->getTotalCourses($startDate, $endDate),
            'total_exams'         => $this->getTotalExams($startDate, $endDate),
            'total_users'         => $this->getTotalUsers($startDate, $endDate),
            'payment_methods'     => $this->getPaymentMethods($startDate, $endDate),
            'courses_by_category' => $this->getCoursesByCategory(),
            'new_users'           => $this->getNewUsers(),
            'new_payments'        => $this->getNewPayments(),
            'top_courses'         => $this->getTopCourses(),
            'activity_in_12_months' => $this->getActivityIn12Months($startDate, $endDate),
            'recent_activity'     => $this->getRecentActivity(),
        ];
        return $this->successResponse($data, 'Lấy dữ liệu dashboard thành công');
    }


    // tính tổng doanh thu trong năm nay (tính từ tháng 1 năm nay) hoặc theo khoảng thời gian
    private function getTotalInThisYear($startDate = null, $endDate = null): array
    {
        // Nếu không truyền start_date và end_date thì lấy từ đầu năm đến cuối năm hiện tại
        if (!$startDate || !$endDate) {
            $startDate = now()->startOfYear()->toDateString();
            $endDate = now()->endOfYear()->toDateString();
        }

        // Tạo danh sách các tháng trong khoảng thời gian
        $start = Carbon::parse($startDate)->startOfMonth();
        $end = Carbon::parse($endDate)->endOfMonth();
        $months = [];
        $current = $start->copy();
        while ($current <= $end) {
            $months[$current->format('Y-m')] = 0;
            $current->addMonth();
        }

        // Lấy tổng tiền theo từng tháng trong khoảng thời gian
        $payments = Payment::where('status', 'paid')
            ->whereBetween('paid_at', [$startDate, $endDate])
            ->selectRaw('DATE_FORMAT(paid_at, "%Y-%m") as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        foreach ($payments as $payment) {
            $months[$payment->month] = (int)$payment->total;
        }

        return $months;
    }


    private function getTotalCourses($startDate = null, $endDate = null): int
    {
        // Nếu không truyền start_date và end_date thì filter trong năm nay (từ tháng 1)
        if (!$startDate || !$endDate) {
            $startOfYear = now()->startOfYear();
            $endOfYear = now()->endOfYear();
            return Course::whereBetween('created_at', [$startOfYear, $endOfYear])->count();
        }

        // Nếu có start_date và end_date thì filter theo khoảng thời gian đó
        return Course::whereBetween('created_at', [$startDate, $endDate])->count();
    }


    private function getTotalExams($startDate = null, $endDate = null): int
    {
        // Nếu không truyền start_date và end_date thì filter trong năm nay (từ tháng 1)
        if (!$startDate || !$endDate) {
            $startOfYear = now()->startOfYear();
            $endOfYear = now()->endOfYear();
            return ExamPaper::whereBetween('created_at', [$startOfYear, $endOfYear])->count();
        }

        // Nếu có start_date và end_date thì filter theo khoảng thời gian đó
        return ExamPaper::whereBetween('created_at', [$startDate, $endDate])->count();
    }

    // tính tổng người dùng student được tạo trong khoảng thời gian
    private function getTotalUsers($startDate = null, $endDate = null): int
    {
        // Nếu không truyền start_date và end_date thì filter trong năm nay (từ tháng 1)
        if (!$startDate || !$endDate) {
            $startOfYear = now()->startOfYear();
            $endOfYear = now()->endOfYear();
            return User::where('role', 'student')
                ->whereBetween('created_at', [$startOfYear, $endOfYear])
                ->count();
        }

        // Nếu có start_date và end_date thì filter theo khoảng thời gian đó
        return User::where('role', 'student')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();
    }

    // tính số lần thanh toán theo phương thức trong khoảng thời gian. VD: VNPAY: 10, MOMO: 5
    private function getPaymentMethods($startDate = null, $endDate = null): array
    {
        // Xác định khoảng thời gian
        if (!$startDate || !$endDate) {
            $startDate = now()->startOfYear();
            $endDate = now()->endOfYear();
        }

        // Lấy danh sách phương thức thanh toán từ DB (không trùng)
        $paymentMethods = Payment::distinct()->pluck('payment_method')->toArray();
        // Khởi tạo kết quả với giá trị 0
        $result = [];
        foreach ($paymentMethods as $method) {
            $result[$method] = [
                'count' => 0,
                'total' => 0
            ];
        }

        // Lấy dữ liệu payments trong khoảng thời gian
        $payments = Payment::where('status', 'paid')
            ->whereBetween('paid_at', [$startDate, $endDate])
            ->select('payment_method')
            ->selectRaw('COUNT(*) as count, SUM(amount) as total')
            ->groupBy('payment_method')
            ->get();

        // Cập nhật kết quả với dữ liệu thực tế
        foreach ($payments as $payment) {
            $result[$payment->payment_method] = [
                'count' => (int)$payment->count,
                'total' => (int)$payment->total
            ];
        }

        return $result;
    }

    // phân bổ khóa học theo danh mục (trả về tên danh mục + số khóa học trong đó)
    private function getCoursesByCategory(): array
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
    private function getNewUsers(): array
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
    private function getNewPayments(): array
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
    private function getTopCourses(): array
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

    // lịch sử hoạt động trong khoảng thời gian (Khóa học mới, người dùng mới, đề thi mới - chỉ tính số lượng)
    private function getActivityIn12Months($startDate = null, $endDate = null): array
    {
        // Nếu không truyền start_date và end_date thì lấy từ đầu năm đến cuối năm hiện tại
        if (!$startDate || !$endDate) {
            $startDate = now()->startOfYear()->toDateString();
            $endDate = now()->endOfYear()->toDateString();
        }

        // Tạo danh sách các tháng trong khoảng thời gian
        $start = Carbon::parse($startDate)->startOfMonth();
        $end = Carbon::parse($endDate)->endOfMonth();
        $months = [];
        $current = $start->copy();
        while ($current <= $end) {
            $months[$current->format('Y-m')] = [
                'month' => $current->format('m-Y'),
                'new_courses' => 0,
                'new_users' => 0,
                'new_exams' => 0,
            ];
            $current->addMonth();
        }

        // Lấy dữ liệu khóa học mới theo tháng
        $newCourses = Course::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->get();

        foreach ($newCourses as $course) {
            if (isset($months[$course->month])) {
                $months[$course->month]['new_courses'] = (int)$course->count;
            }
        }

        // Lấy dữ liệu người dùng mới theo tháng
        $newUsers = User::where('role', 'student')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->get();

        foreach ($newUsers as $user) {
            if (isset($months[$user->month])) {
                $months[$user->month]['new_users'] = (int)$user->count;
            }
        }

        // Lấy dữ liệu đề thi mới theo tháng
        $newExams = ExamPaper::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->get();

        foreach ($newExams as $exam) {
            if (isset($months[$exam->month])) {
                $months[$exam->month]['new_exams'] = (int)$exam->count;
            }
        }

        return array_values($months);
    }

    // get thông tin người dùng mới, khóa học mới, đề thi mới trong 1 tháng vừa qua
    private function getRecentActivity(): array
    {
        $startOfMonth = now()->startOfMonth();
        $endOfMonth   = now()->endOfMonth();

        $newCourses = Course::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $newUsers   = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->where('role', 'student')->count();
        $newExams   = ExamPaper::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        return [
            'new_courses' => $newCourses,
            'new_users'   => $newUsers,
            'new_exams'   => $newExams,
        ];
    }
}
