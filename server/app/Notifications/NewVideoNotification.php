<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewVideoNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $course;
    public $video;

    /**
     * Create a new notification instance.
     */
    public function __construct($course, $video)
    {
        $this->course = $course;
        $this->video  = $video;
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
        $videoUrl    = "{$frontendUrl}/courses/{$this->course->id}/videos/{$this->video->id}";

        return (new MailMessage)
            ->subject("Khoá học {$this->course->name} có video mới!")
            ->greeting("Xin chào {$notifiable->full_name},")
            ->line("Khoá học bạn đang theo học vừa được thêm video mới: {$this->video->title}.")
            ->action('Xem video', $videoUrl)
            ->line('Chúc bạn học tập hiệu quả!');
    }

    /**
     * Get the array representation of the notification (optional for database).
     */
    public function toArray($notifiable): array
    {
        return [
            'course_id' => $this->course->id,
            'video_id'  => $this->video->id,
            'title'     => $this->video->title,
        ];
    }
}
