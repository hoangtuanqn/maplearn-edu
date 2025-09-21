<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoiceNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $invoice;
    public $type; // 'created' hoặc 'paid'

    /**
     * Create a new notification instance.
     */
    public function __construct($invoice, $type)
    {
        $this->invoice = $invoice;
        $this->type    = $type; // 'created' | 'paid'
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
        $transaction_code = $this->invoice->transaction_code;
        $courseName = $this->invoice->course->name ?? 'Khóa học';
        $invoiceUrl  = "{$frontendUrl}/payments/{$transaction_code}";

        $mail = new MailMessage;

        if ($this->type === 'created') {
            $mail->subject('Hóa đơn mới được tạo cho khóa học ' . $courseName)
                ->greeting('Xin chào ' . $notifiable->full_name)
                ->line('Một hóa đơn mới đã được tạo cho bạn với số tiền: ' . number_format($this->invoice->amount) . ' VNĐ.')
                ->line('Tên khóa học: ' . $courseName)
                ->action('Xem hóa đơn', $invoiceUrl)
                ->line('Vui lòng thanh toán sớm để tránh gián đoạn dịch vụ.');
        } elseif ($this->type === 'paid') {
            $mail->subject('Thanh toán thành công khóa học ' . $courseName)
                ->greeting('Xin chào ' . $notifiable->full_name)
                ->line('Chúng tôi đã nhận được thanh toán cho hóa đơn #' . $transaction_code)
                ->line('Tên khóa học: ' . $courseName)
                ->line('Số tiền: ' . number_format($this->invoice->amount) . ' VNĐ.')
                ->action('Xem chi tiết', $invoiceUrl)
                ->line('Cảm ơn bạn đã thanh toán!');
        }

        return $mail;
    }

    /**
     * Get the array representation of the notification (optional for database).
     */
    public function toArray($notifiable): array
    {
        return [
            'invoice_id' => $this->invoice->id,
            'amount'     => $this->invoice->amount,
            'type'       => $this->type,
        ];
    }
}
