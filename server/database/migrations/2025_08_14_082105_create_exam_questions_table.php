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
        // Các câu hỏi trong đề thi
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('exam_paper_id'); // Liên kết đề thi
            $table->enum('type', ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'DRAG_DROP', 'TRUE_FALSE', 'NUMERIC_INPUT']); // Loại câu hỏi: 1 đáp án, nhiều đáp án, kéo thả, đúng/sai, nhập đáp án
            $table->text('content'); // Nội dung câu hỏi (Mã HTML)
            $table->longText('explanation')->nullable(); // Giải thích đáp án cho câu hỏi (nếu có) HTML giải thích
            $table->json('images')->nullable(); // Danh sách ảnh JSON. VD: ["image1.jpg", "image2.jpg"]
            $table->json('options')->notNull(); // Danh sách các options của câu hỏi
            $table->json('correct')->notNull(); // Đáp án đúng (có thể có nhiều đáp án đúng)
            $table->decimal('marks', 5, 2)->default(1.00); // Điểm khi trả lời đúng câu hỏi này
            $table->timestamps();

            $table->foreign('exam_paper_id')->references('id')->on('exam_papers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_questions');
    }
};
