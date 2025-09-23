<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // chứa mã code trỏ tới invoices. Ví dụ khách hàng muốn thanh toán nhiều hóa đơn 1 lần, thì các invoice đó sẽ có 1 mã code trỏ tới payments. N invoice - 1 payment đó. Chỉ cần thanh toán 1 payment thì các invoice liên quan sẽ được thanh toán
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('course_id'); // khóa học người dùng mua

            $table->string('transaction_code')->unique();
            $table->decimal('amount', 10, 2);

            $table->enum('payment_method', ['transfer', 'vnpay', 'momo', 'zalopay'])->default('transfer'); // Phương thức thanh toán: 'transfer' (chuyển khoản), 'vnpay', 'momo', 'zalopay'
            $table->enum('status', ['pending', 'paid', 'canceled'])->default('pending');

            $table->timestamp('paid_at')->nullable(); // thời điểm thanh toán thành công

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade'); // khóa học người dùng mua
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
