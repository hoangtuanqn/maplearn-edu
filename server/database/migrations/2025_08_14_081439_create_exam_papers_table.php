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
        // Đề thi
        Schema::create('exam_papers', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('exam_category', ['dgnl-hsa', 'dgnl-v-act', 'dgtd-tsa', 'tot-nghiep-thpt', 'thi-cuoi-ki-1', 'thi-cuoi-ki-2', 'thi-giua-ki-1', 'thi-giua-ki-2'])->default('tot-nghiep-thpt'); // Danh mục kỳ thi
            $table->enum('subject', ['toan', 'ly', 'hoa', 'sinh', 'tieng-anh', 'van'])->default('toan'); // Liên kết môn học
            $table->enum('grade_level', ['dg-td', 'dg-nl', 'lop-12', 'lop-11', 'lop-10'])->default('lop-12'); // Lớp 10, 11, 12, ..
            // user_id
            $table->unsignedInteger('user_id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('province')->nullable(); // Tỉnh ra đề (Quảng ngãi, Bình Định, ...)
            $table->enum('difficulty', ['easy', 'normal', 'hard', 'very_hard'])->default('normal'); // Dễ, Bình thường, Khó, Rất khó
            $table->enum('exam_type', ['HSA', 'V-ACT', 'TSA', 'THPT', 'OTHER'])->default('OTHER'); // Loại kì thi -> Đánh dấu để hiển thị ra đẹp hơn
            $table->decimal('max_score', 5, 2)->default(10.00); // Cơ số 10, 100, ...
            $table->decimal('pass_score', 5, 2)->default(5.00); // Điểm đạt
            $table->integer('duration_minutes'); // Thời gian làm bài (phút)
            $table->boolean('anti_cheat_enabled')->default(false); // Bật/tắt chống gian lận
            $table->integer('max_violation_attempts')->default(3);   // Số lần vi phạm tối đa sẽ bị khóa này (nếu anti_cheat_enabled bật)
            $table->integer('max_attempts')->nullable()->default(null); // lượt làm bài tối đa, null nghĩa là không giới hạn
            $table->boolean('status')->default(true); // Có public hay không
            // Ngày bắt đầu kì thi + kết thức kỳ thi
            $table->timestamp('start_time')->default(now());
            $table->timestamp('end_time')->nullable(); // Null là ko giới hạn
            $table->timestamps();

            // Khóa ngoại
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_papers');
    }
};
