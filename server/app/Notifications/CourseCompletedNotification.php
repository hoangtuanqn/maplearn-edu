<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseCompletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $course;
    protected $certificateUrl;

    /**
     * @param  \App\Models\Course  $course
     * @param  string              $certificateUrl
     */
    public function __construct($course, string $certificateUrl)
    {
        $this->course = $course;
        $this->certificateUrl = $certificateUrl;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Chúc mừng! Bạn đã hoàn thành và đạt chứng chỉ')
            ->greeting('Xin chào ' . ($notifiable->full_name ?? $notifiable->name ?? 'bạn') . ',')
            ->line('Bạn đã xuất sắc vượt qua bài kiểm tra cuối cùng và chính thức hoàn thành khóa học: **' . $this->course->name . '**.')
            ->line('Thành quả học tập của bạn đã được công nhận. Chứng chỉ đã sẵn sàng để tải về.')
            ->action('Xem & Tải chứng chỉ', $this->certificateUrl)
            ->line('Một lần nữa xin chúc mừng, và chúc bạn tiếp tục thành công trên con đường học tập và sự nghiệp!');
    }

    public function toArray($notifiable)
    {
        return [
            'course_id'       => $this->course->id,
            'certificate_url' => $this->certificateUrl,
            'message'         => 'Đã hoàn thành khóa học và đạt chứng chỉ.',
        ];
    }
}
