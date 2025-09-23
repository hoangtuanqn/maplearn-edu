<?php

namespace App\Notifications;

use App\Models\Course;
use App\Models\ExamPaper;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseCompletionExamRequiredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $course;
    protected $exam;

    /**
     * @param  \App\Models\Course  $course
     * @param  \App\Models\Exam    $exam
     */
    public function __construct(User $user, Course $course, ExamPaper $exam)
    {
        $this->user = $user;
        $this->course = $course;
        $this->exam   = $exam;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Chúc mừng bạn đã đi đến chặng cuối của khóa học!')
            ->greeting('Xin chào ' . ($this->user->full_name ?? 'bạn') . ',')
            ->line('Bạn vừa hoàn thành toàn bộ nội dung của **' . $this->course->name . '** – một hành trình thật sự đáng tự hào.')
            ->line('Để chính thức nhận chứng chỉ, bạn cần vượt qua thử thách cuối cùng: **' . $this->exam->title . '**.')
            ->line('**Thông tin bài kiểm tra:**')
            ->line('- Điểm cần đạt: **' . $this->exam->pass_score . '/' . $this->exam->max_score . '**')
            ->line('- Số câu hỏi: **' . $this->exam->question_count . '**')
            ->line('- Thời gian làm bài: **' . $this->exam->duration_minutes . ' phút**')
            ->action('Bắt đầu bài kiểm tra', env('APP_URL_FRONT_END') . '/exams/' . $this->exam->slug . '/start')
            ->line('Hãy coi đây là bước kiểm chứng cho những gì bạn đã học được. Chúc bạn thật tự tin và đạt kết quả xuất sắc!');
    }

    public function toArray($notifiable)
    {
        return [
            'course_id' => $this->course->id,
            'exam_id'   => $this->exam->id,
            'exam_url'  => route('exams.start', $this->exam->slug),
        ];
    }
}
