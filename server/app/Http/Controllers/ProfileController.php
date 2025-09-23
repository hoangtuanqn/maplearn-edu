<?php

namespace App\Http\Controllers;

use App\Filters\Invoice\DateFilter;
use App\Filters\Invoice\StatusFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\Payment;
use App\Notifications\VerifyEmailNotification;
use App\Services\GoogleAuthenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProfileController extends BaseApiController
{
    public function update(Request $request)
    {
        $request->user()->update($request->validate([
            'avatar'        => 'sometimes|max:2048',
            'full_name'     => 'required|string|max:255',
            'phone_number'  => 'sometimes|string|max:20',
            'gender'        => 'sometimes|string|in:male,female,other',
            'birth_year'    => 'sometimes|nullable',
            'school'        => 'sometimes|string|max:255',
            'city'          => 'sometimes|string|max:255',
            'facebook_link' => 'sometimes|string|max:255',
        ]));

        // return response()->json([
        //     'message' => $request->user(),
        // ]);
        return $this->successResponse($request->user(), "Cập nhật thông tin thành công!");
    }
    public function changePassword(Request $request)
    {
        $request->validate([
            'password_old' => 'required|string|max:255',
            'password_new' => 'required|string|min:6|max:255',
        ]);

        $user = $request->user();

        // Kiểm tra mật khẩu cũ có đúng không
        if (!Hash::check($request->password_old, $user->password)) {
            return $this->errorResponse(null, 'Mật khẩu cũ không chính xác.', 400);
        }

        // Cập nhật mật khẩu mới (đã hash)
        $user->update([
            'password' => Hash::make($request->password_new),
        ]);
        return $this->successResponse(null, "Đổi mật khẩu thành công.");

        // return response()->json([
        //     'message' => 'Đổi mật khẩu thành công.',
        // ]);
    }

    // Lấy danh sách khóa học của tôi
    public function getCoursesMe(Request $request)
    {
        $user  = $request->user();
        $limit = $request->input('limit', 10); // số item mỗi trang, mặc định 10

        $courses = QueryBuilder::for($user->purchasedCourses()->orderBy('payments.id', 'desc'))
            ->allowedFilters(['title']) // lọc theo title nếu cần

            // ->latest('created_at')
            ->paginate($limit)
            ->appends($request->query()); // giữ nguyên query string khi phân trang

        return $this->successResponse($courses, "Đã lấy danh sách khóa học của bạn thành công!");
    }

    // Lấy danh sách hóa đơn
    public function getPaymentsMe(Request $request)
    {
        $limit = $request->input('limit', 10);
        $user  = $request->user();

        // Query chính với filter, sort, user_id
        $paymentsQuery = QueryBuilder::for(Payment::class)
            ->allowedSorts(['created_at'])
            ->allowedFilters([
                AllowedFilter::custom('status', new StatusFilter),
                AllowedFilter::custom('date', new DateFilter),
            ])
            ->where('user_id', $user->id)
            ->orderByDesc('id');

        // Clone query để tính summary
        $summaryQuery = clone $paymentsQuery;

        // Thêm điều kiện status = 'pending' cho summary
        $summaryQuery->where('status', 'pending');

        $summary = [
            'total_pending'       => $summaryQuery->count(),
            'total_price_pending' => (float)$summaryQuery->sum('amount'),
        ];

        return $this->successResponse([
            'payments' => $paymentsQuery->paginate($limit),
            'summary'  => $summary,
        ], 'Lấy danh sách hóa đơn thành công!');
    }

    // Tạo mã 2FA
    public function generate2FA(Request $request)
    {
        $user = $request->user();

        // Generate new 2FA secret and QR code
        $google2fa = GoogleAuthenService::generateSecret2FA($user->email);

        if (!$google2fa || empty($google2fa['secret']) || empty($google2fa['qr_base64'])) {
            return $this->errorResponse(null, "Không thể tạo mã 2FA. Vui lòng thử lại.", 500);
        }
        $user->update([
            'google2fa_secret' => $google2fa['secret'],
        ]);

        // Không lưu secret vào DB ở bước này, chỉ trả về cho user xác thực
        return $this->successResponse([
            'secret'    => $google2fa['secret'],
            'qr_base64' => $google2fa['qr_base64'],
        ], "Tạo mã 2FA thành công. Vui lòng xác thực để hoàn tất.");
    }

    // Xác thực 2FA + Add mã vô DB
    public function toggle2FA(Request $request)
    {
        // Validate otp
        Validator::make($request->all(), [
            'otp'  => 'required|string|size:6',
            'type' => 'required|string|in:active,unactive',
        ])->validate();
        $type = $request->input('type');
        $user = $request->user();
        if ($type === 'active') {
            if ($user->google2fa_enabled) {
                return $this->errorResponse(null, "Tài khoản của bạn đã được bật 2FA.", 400);
            }
        } elseif ($type === 'unactive') {
            if (!$user->google2fa_enabled) {
                return $this->errorResponse(null, "Tài khoản của bạn chưa bật 2FA.", 400);
            }
        } else {
            return $this->errorResponse(null, "Loại yêu cầu không hợp lệ.", 400);
        }

        $secret = $user->google2fa_secret;
        $otp    = $request->input('otp');

        $isValid = GoogleAuthenService::verify2FA($secret, $otp);

        if (!$isValid) {
            return $this->errorResponse(null, "Mã xác thực không chính xác. Vui lòng thử lại.", 400);
        }

        // Nếu đúng thì lưu flag bật 2FA
        $user->update([
            'google2fa_secret'  => $type === 'active' ? $secret : null,
            'google2fa_enabled' => $type === 'active' ? true : false,
        ]);
        $message = $type === 'active' ? "Đã bật 2FA thành công." : "Đã tắt 2FA thành công.";
        return $this->successResponse([], $message);
    }

    // Gửi lại email xác minh

    // Gửi lại email xác minh
    public function resendVerification(Request $request)
    {
        $user = $request->user();
        if ($user->email_verified_at) {
            return $this->errorResponse(null, 'Email đã được xác minh trước đó!', 400);
        }
        // Tạo token mới và gửi email xác minh
        $user->verification_token = bin2hex(random_bytes(50));
        $user->save();
        $user->notify(new VerifyEmailNotification($user->verification_token));
        // Trả về thông báo thành công
        return $this->successResponse(null, 'Đã gửi lại email xác minh!', 200);
    }
}
