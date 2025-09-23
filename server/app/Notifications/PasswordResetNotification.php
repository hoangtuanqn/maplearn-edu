<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /** @var string Mật khẩu tạm thời (plain) */
    public string $temporaryPassword;

    /** @var string URL để người dùng đăng nhập và đổi mật khẩu ngay */
    public string $loginUrl;

    public function __construct(string $temporaryPassword)
    {
        $this->temporaryPassword = $temporaryPassword;
        $this->loginUrl = rtrim(env('APP_URL_FRONT_END', 'http://localhost:3000'), '/') . '/auth/login';
    }

    public function via($notifiable)
    {
        return ['mail']; // có thể thêm 'database' nếu muốn lưu log
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Thông báo mật khẩu mới của tài khoản')
            ->greeting('Chào ' . $notifiable->full_name)
            ->line('Quản trị viên vừa đặt lại mật khẩu cho tài khoản của bạn.')
            ->line('**Mật khẩu tạm thời**: `' . $this->temporaryPassword . '`')
            ->line('Vì lý do bảo mật, hãy đăng nhập và **đổi mật khẩu ngay** sau khi truy cập.')
            ->action('Đăng nhập & đổi mật khẩu', $this->loginUrl)
            ->line('Nếu bạn **không yêu cầu** thay đổi này, vui lòng liên hệ bộ phận hỗ trợ ngay.');
    }
}
