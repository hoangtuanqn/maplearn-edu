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
        Schema::create('course_lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('chapter_id');
            $table->string('title'); // Tên bài học
            $table->string('slug')->unique(); // Đường dẫn thân thiện với SEO
            $table->text('content')->nullable(); // Nội dung bài học (HTML, video URL, link, ...)
            $table->string('video_url')->nullable(); // video nếu có
            $table->integer('position')->default(0); // Thứ tự trong chương
            $table->integer('duration')->default(0); // Thời lượng video (tính bằng giây)
            $table->boolean('is_free')->default(false); // Cho học thử
            $table->timestamps();

            $table->foreign('chapter_id')->references('id')->on('course_chapters')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_lessons');
    }
};
