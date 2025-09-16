<?php

namespace App\Http\Requests;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;

class ResendVerificationRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
        ];
    }

    public function authorize()
    {
        return true;
    }

    public function prepareForValidation()
    {
        $email = (string) $this->input('email');

        RateLimiter::for("resend-verification:$email", function () {
            return Limit::perMinute(3)->by($this->input('email'));
        });

        if (RateLimiter::tooManyAttempts("resend-verification:$email", 3)) {
            abort(429, 'Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau vài phút.');
        }

        RateLimiter::hit("resend-verification:$email");
    }
}
