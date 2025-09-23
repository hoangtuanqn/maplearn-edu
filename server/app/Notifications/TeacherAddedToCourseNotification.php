<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeacherAddedToCourseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $course;

    /**
     * Create a new notification instance.
     */
    public function __construct($course)
    {
        $this->course = $course;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Build the mail message.
     */
    public function toMail($notifiable): MailMessage
    {
        $frontendUrl = env('APP_URL_FRONT_END', 'http://localhost:3000');
        $courseUrl   = "{$frontendUrl}/courses/{$this->course->slug}";

        return (new MailMessage)
            ->subject("Bạn đã được thêm vào khóa học {$this->course->name}")
            ->greeting("Xin chào {$notifiable->full_name},")
            ->line("Bạn vừa được thêm vào khóa học: **{$this->course->name}**!")
            ->line("Với quyền hạn giáo viên, bạn có thể chỉnh sửa, thêm hoặc xóa nội dung bài học, nhưng không thể chỉnh sửa thông tin khóa học.")
            ->action('Truy cập khóa học', $courseUrl)
            ->line('Chúc bạn giảng dạy thành công!');
    }

    /**
     * Get the array representation of the notification (optional for database).
     */
    public function toArray($notifiable): array
    {
        return [
            'course_id' => $this->course->id,
            'course_name' => $this->course->name,
        ];
    }
}
