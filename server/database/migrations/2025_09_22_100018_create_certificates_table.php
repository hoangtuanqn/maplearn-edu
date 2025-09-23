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
        Schema::create('certificates', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('course_id');

            // Thông tin cốt lõi
            $table->string('full_name');                         // Tên chứng chỉ
            $table->string('code', 64)->unique();           // Mã chứng chỉ duy nhất (ví dụ: CERT-2025-ABC123)

            $table->timestamp('issued_at');     // Ngày/giờ cấp (có thể = now khi tạo)

            $table->timestamps();

            $table->unique(['user_id', 'course_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
