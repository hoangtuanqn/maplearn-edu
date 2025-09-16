<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use Illuminate\Console\Command;

class AutoCheckExpiredInvoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:auto-check-expired-invoice';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kiểm tra thời gian hết hạn của hóa đơn';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Invoice::where('status', 'pending')
            ->where('due_date', '<', now())
            ->update(['status' => 'expired', 'note' => 'Hệ thống: Hóa đơn này đã hết hạn.']);
    }
}
