<?php

namespace App\Mail;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoicePaidMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $invoice;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }
    public function build()
    {
        $path = resource_path('emails/invoice/paid.html');

        $html = file_exists($path)
            ? file_get_contents($path)
            : '<p>Email template not found. Please build Maizzle template.</p>';

        // Danh sách sản phẩm (ITEM_LIST)
        $itemRows = '';
        foreach ($this->invoice->items as $item) {
            $itemRows .= '
            <tr>
              <td style="padding:12px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center;">
                <img src="' . e($item->course->thumbnail) . '" alt="" width="40" style="margin-right:10px; border-radius:4px;">
                <span>' . e($item->course->name) . '</span>
              </td>
              <td align="right" style="padding:12px; border-bottom:1px solid #e5e7eb;">' . number_format($item->price_snapshot, 0, ',', '.') . ' đ</td>
            </tr>';
        }

        if ($this->invoice->status === 'paid') {
            $status = '<span style="background-color:#dcfce7; color:#166534; font-size:12px; font-weight:bold; padding:4px 8px; border-radius:4px; margin-left:8px;">Đã thanh toán</span>';
        } elseif ($this->invoice->status === 'failed') {
            $status = '<span style="background-color:#fee2e2; color:#b91c1c; font-size:12px; font-weight:bold; padding:4px 8px; border-radius:4px; margin-left:8px;">Đã hủy</span>';
        } else {
            $status = '<span style="background-color:#fef9c3; color:#b45309; font-size:12px; font-weight:bold; padding:4px 8px; border-radius:4px; margin-left:8px;">Chờ thanh toán</span>';
        }
        // Map token → giá trị
        $replace = [
            '__STATUS_INVOICE__'     => $status,
            '__INVOICE_DETAIL_URL__' => env("APP_URL_FRONT_END") . '/invoices/' . $this->invoice->transaction_code,
            '__INVOICE_ID__'         => $this->invoice->transaction_code,
            '__INVOICE_DATE__'       => $this->invoice->created_at->format('d/m/Y'),
            '__DUE_DATE__'           => $this->invoice->due_date?->format('d/m/Y') ?? '',
            '__COMPANY_NAME__'       => 'Công ty cổ phần MapLearn',
            '__COMPANY_ADDRESS__'    => 'Địa chỉ: Quận Thủ Đức, TP HCM.',
            '__COMPANY_PHONE__'      => '0812 665 001',
            '__COMPANY_EMAIL__'      => 'maplearn@fpt.edu.vn',
            '__COMPANY_SUPPORT__'    => '0812 665 001',
            '__COMPANY_TAX__'        => '0812 665 001',
            '__CUSTOMER_NAME__'      => $this->invoice->user->full_name,
            '__CUSTOMER_EMAIL__'     => $this->invoice->user->email,
            '__CUSTOMER_COUNTRY__'   => $this->invoice->user->city . ' Việt Nam',
            '__CUSTOMER_TYPE__'      => 'Cá nhân',
            '__ITEM_LIST__'          => $itemRows,
            '__SUBTOTAL__'           => number_format($this->invoice->total_price, 0, ',', '.') . ' đ',
            '__VAT__'                => number_format(0, 0, ',', '.') . ' đ',
            '__TOTAL__'              => number_format($this->invoice->total_price, 0, ',', '.') . ' đ',
        ];

        // Thay token
        $html = str_replace(array_keys($replace), array_values($replace), $html);
        if ($this->invoice->status === 'paid') {
            return $this->subject('Hóa đơn #' . $this->invoice->transaction_code . ' đã thanh toán thành công qua ' . strtoupper($this->invoice->payment_method))
                ->html($html);
        } else {
            return $this->subject('Hóa đơn #' . $this->invoice->transaction_code . ' đã được tạo thành công!')
                ->html($html);
        }
    }
}
