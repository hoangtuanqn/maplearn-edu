<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StudentEnrolledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $teacher;
    public $course;
    public $student;

    /**
     * Tạo mới Notification
     */
    public function __construct($teacher, $course, $student)
    {
        $this->teacher = $teacher;
        $this->course  = $course;
        $this->student = $student;
    }

    /**
     * Kênh gửi notification
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Gửi qua email
     */
    public function toMail($notifiable): MailMessage
    {
        $frontendUrl = env('APP_URL_FRONT_END', 'http://localhost:3000');
        $courseUrl   = "{$frontendUrl}/courses/{$this->course->slug}";

        return (new MailMessage)
            ->subject('Có học viên mới đăng ký khóa học: ' . $this->course->name)
            ->greeting('Xin chào Thầy/Cô: ' . ($this->teacher->full_name))
            ->line('Một học viên mới vừa đăng ký khóa học của bạn.')
            ->line('Tên khóa học: ' . $this->course->name)
            ->line('Tên học viên: ' . ($this->student->full_name))
            ->line('Email học viên: ' . $this->student->email)
            ->action('Xem chi tiết khóa học', $courseUrl)
            ->line('Vui lòng kiểm tra và liên hệ học viên khi cần.');
    }

    /**
     * Dữ liệu lưu vào DB (nếu dùng database notifications)
     */
    public function toArray($notifiable): array
    {
        return [
            'course_id'  => $this->course->id,
            'student_id' => $this->student->id,
        ];
    }
}
