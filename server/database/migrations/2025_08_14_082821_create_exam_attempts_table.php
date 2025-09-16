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
        // exam_attempts dùng để lưu trữ thông tin về các lần làm bài thi của người dùng
        Schema::create('exam_attempts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('exam_paper_id'); // Khóa ngoại đến bảng exam_papers
            $table->unsignedInteger('user_id'); // Khóa ngoại đến bảng users
            $table->decimal('score', 5, 2)->default(0.00); // Điểm bài thi
            $table->integer('violation_count')->default(0);   // Số lần vi phạm
            $table->integer('time_spent')->default(0); // Thời gian làm bài (tính bằng giây)
            $table->json('details')->nullable(); // Chi tiết bài làm (chuỗi json lưu thông tin nội dung bài làm)
            $table->timestamp('started_at')->nullable(); // Thời điểm bắt đầu làm bài
            $table->timestamp('submitted_at')->nullable(); // Thời điểm nộp bài
            $table->text('note')->nullable(); // Ghi chú về bài làm (ví dụ: lý do hủy bài, ghi chú của giám thị)
            $table->enum('status', ['in_progress', 'submitted', 'detected', 'canceled'])->default('in_progress'); // Trạng thái bài làm (in_progress: đang làm bài, submitted: đã nộp, canceled: hủy bài do gian lận)
            $table->timestamps();

            $table->foreign('exam_paper_id')->references('id')->on('exam_papers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_attempts');
    }
};
