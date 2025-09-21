<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseCompletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $course;
    public $certificateUrl;

    /**
     * Create a new notification instance.
     */
    public function __construct($course, $certificateUrl)
    {
        $this->course = $course;
        $this->certificateUrl = $certificateUrl;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        return ['mail']; // có thể thêm 'database', 'broadcast' nếu cần
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Chúc mừng! Bạn đã hoàn thành khóa học')
            ->greeting('Chào ' . $notifiable->full_name)
            ->line('Bạn vừa hoàn thành khóa học: **' . $this->course->name . '**.')
            ->line('Hãy nhấn vào nút bên dưới để xem và tải chứng chỉ của bạn.')
            ->action('Xem chứng chỉ', $this->certificateUrl)
            ->line('Chúc mừng bạn đã đạt được thành tích này!');
    }
}
