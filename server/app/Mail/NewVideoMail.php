<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewVideoMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $course;
    public $video;

    /**
     * Create a new message instance.
     */
    public function __construct($course, $video)
    {
        $this->course = $course;
        $this->video  = $video;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $frontendUrl = env('APP_URL_FRONT_END', 'http://localhost:3000');
        $videoUrl    = "{$frontendUrl}/learn/{$this->course->slug}/lecture/{$this->video->slug}";

        return $this->subject("Khóa học {$this->course->name} có video mới!")
            ->view('emails.new_video') // tạo view blade ở resources/views/emails/new_video.blade.php
            ->with([
                'course'   => $this->course,
                'video'    => $this->video,
                'videoUrl' => $videoUrl,
            ]);
    }
}
