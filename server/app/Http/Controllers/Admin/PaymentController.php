<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Payment;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PaymentController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $limit = (int)($request->limit ?? 20);

        $paymentsQuery = QueryBuilder::for(Payment::class)
            ->allowedFilters([
                "search",
                "payment_method",
                "status",
                // "date_from",
                // "date_to",
                AllowedFilter::partial('search', 'username.full_name'),
                AllowedFilter::callback('amount_min', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->where('amount', '>=', (float) $value);
                    }
                }),
                AllowedFilter::callback('amount_max', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->where('amount', '<=', (float) $value);
                    }
                }),
                AllowedFilter::callback('date_from', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->whereDate('paid_at', '>=', $value);
                    }
                }),
                AllowedFilter::callback('date_to', function ($query, $value) {
                    if ($value !== null && $value !== '') {
                        $query->whereDate('paid_at', '<=', $value);
                    }
                }),
            ])
            ->where('status', 'paid'); // Example: only show completed or canceled payments

        // Nếu là teacher thì chỉ được xem thanh toán của khóa học do mình tạo
        if ($user->role === 'teacher') {
            $teacherCourseIds = \App\Models\Course::where('user_id', $user->id)->pluck('id');
            $paymentsQuery->whereIn('course_id', $teacherCourseIds);
        }
        // Nếu là admin thì xem được tất cả thanh toán

        $payments = $paymentsQuery
            ->with(['user:id,full_name,username', 'course:id,name,slug']) // Eager load relationships if needed
            ->orderByDesc('id')
            ->paginate($limit);

        return $this->successResponse($payments, 'Lấy danh sách thanh toán thành công!');
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
    public function show(Payment $payment)
    {
        return $this->successResponse($payment, 'Lấy thông tin thanh toán thành công!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        // Chỉ update status
        $data = $request->validate([
            'status' => 'required|in:pending,paid,canceled',
        ]);
        $payment->status = $data['status'];
        $payment->save();
        return $this->successResponse($payment, 'Cập nhật trạng thái thanh toán thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    public function getStatsPayment(Request $request)
    {
        $user = $request->user();

        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        // Mặc định lấy 7 ngày gần nhất nếu không truyền gì
        if (!$dateFrom && !$dateTo) {
            $dateFrom = now()->subDays(6)->format('Y-m-d');
            $dateTo = now()->format('Y-m-d');
        }

        $query = Payment::query()
            ->where('status', 'paid');

        // Nếu là teacher thì chỉ được xem thống kê của khóa học do mình tạo
        if ($user->role === 'teacher') {
            // Lấy danh sách course_id do teacher này tạo
            $teacherCourseIds = \App\Models\Course::where('user_id', $user->id)->pluck('id');
            $query->whereIn('course_id', $teacherCourseIds);
        }
        // Nếu là admin thì xem được tất cả thống kê

        if ($dateFrom) {
            $query->whereDate('paid_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('paid_at', '<=', $dateTo);
        }

        $totalPayments = $query->count();
        $totalRevenue = $query->sum('amount');
        $uniqueStudents = $query->distinct('user_id')->count('user_id');
        $averageOrderValue = $totalPayments > 0 ? $totalRevenue / $totalPayments : 0;
        $uniqueCourses = $query->distinct('course_id')->count('course_id');

        return $this->successResponse([
            'total_payments' => $totalPayments,
            'total_revenue' => (int)$totalRevenue,
            'total_students' => $uniqueStudents,
            'average_order_value' => round($averageOrderValue, 2),
            'total_courses_sold' => $uniqueCourses,
            'date_from' => $dateFrom,
            'date_to' => $dateTo,
            'role' => $user->role, // Thêm role để frontend biết đang xem thống kê của ai
        ], 'Thống kê thanh toán thành công!');
    }
}
