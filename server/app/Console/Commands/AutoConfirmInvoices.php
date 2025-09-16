<?php

namespace App\Console\Commands;

use App\Events\PusherEvent;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class AutoConfirmInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:auto-confirm-invoices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Xác nhận hóa đơn khi có người dùng chuyển tiền vào tài khoản';

    /**
     * Execute the console command.
     */

    // Cách dùng: Artisan::call('app:auto-confirm-invoices');
    public function handle()
    {

        // Gửi request đến API lấy dữ liệu
        // Gọi lại 3 lần mỗi lần cách nhau 2 giây nếu không thành công
        $this->info('Đang xác nhận hóa đơn...');
        $res = Http::retry(3, 2000)->withHeaders([
            "Authorization" => "Bearer " . env("SEPAY_TOKEN"),
            "Content-Type"  => "application/json",
        ])->get("https://my.sepay.vn/userapi/transactions/list?account_number=" . env("SEPAY_ACCOUNT") . "&limit=10");
        $data = $res->json();
        if ($res->failed()) {
            $this->error('Lỗi khi lấy dữ liệu từ API: ' . $res->status());
            return;
        } else {
            $count = 0;
            foreach ($data['transactions'] as $transaction) {

                // Thời gian hết hạn > now() và trạng thái là 'pending'
                $invoices = Invoice::where('payment_method', 'transfer')->where('status', 'pending')->where('due_date', '>', now())->get();
                foreach ($invoices as $invoice) {
                    // $this->info("Kiểm tra hóa đơn {$invoice->id} với mã giao dịch {$invoice->transaction_code}...");
                    // Kiểm tra mã giao dịch
                    if (str_contains($transaction['transaction_content'], $invoice->transaction_code) && $transaction['amount_in'] >= $invoice->total_price) {
                        $count++;
                        // Cập nhật trạng thái hóa đơn
                        $invoice->status         = 'paid';
                        $invoice->payment_method = 'transfer';
                        $invoice->save();

                        broadcast(new PusherEvent([
                            'message' => 'Hóa đơn #' . $invoice->transaction_code . ' đã được xác nhận.',
                        ], $invoice->user()->email));
                        $this->info("Hóa đơn #{$invoice->transaction_code} đã được xác nhận.");
                    }
                }

                $payments = Payment::where('payment_method', 'transfer')->where('status', 'pending')->get();
                foreach ($payments as $payment) {
                    if (!$payment->isValid()) continue;
                    // Kiểm tra mã giao dịch
                    if (str_contains($transaction['transaction_content'], $payment->transaction_code) && $transaction['amount_in'] >= $payment->invoices()->sum('total_price')) {
                        $count++;
                        // Cập nhật trạng thái thanh toán
                        $payment->status         = 'paid';
                        $payment->payment_method = 'transfer';
                        $payment->save();
                        $user = $payment->users()->first();
                        broadcast(new PusherEvent([
                            'message' => 'Thanh toán #' . $payment->transaction_code . ' đã được xác nhận.',
                        ], $user?->email));

                        $this->info("Thanh toán #{$payment->transaction_code} đã được xác nhận.");
                    }
                }
            }
            if ($count > 0) {
                $this->info("Đã xác nhận {$count} hóa đơn.");
            } else {
                $this->info("Không có hóa đơn nào cần xác nhận.");
            }
        }
        // return $data;
        // $this->line(print_r($data, true));
    }
}
