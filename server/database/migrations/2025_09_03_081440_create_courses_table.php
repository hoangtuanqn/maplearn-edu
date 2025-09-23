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
        // Người tạo khóa học sẽ là admin
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('intro_video')->nullable(); // Video giới thiệu khóa học
            $table->decimal('price', 10, 2)->default(0.00); // Giá khóa học
            // Có phép bỏ bài hay không, hay phải học tuần tự các bài
            $table->boolean('is_sequential')->default(false); // true: tuần tự, false: có thể nhảy cóc
            // $table->integer('audience_id')->unsigned();
            $table->unsignedInteger('user_id')->unsigned(); // giáo viên dạy
            $table->unsignedInteger('prerequisite_course_id')->nullable();

            // id đề thi, sẽ thi nếu hoàn thành khóa học
            $table->unsignedInteger('exam_paper_id')->nullable();

            $table->enum('grade_level', ['dg-td', 'dg-nl', 'lop-12', 'lop-11', 'lop-10'])->default('lop-12'); // Lớp 10, 11, 12, ..
            $table->enum('subject', ['toan', 'ly', 'hoa', 'sinh', 'tieng-anh', 'van'])->default('toan'); // Liên kết môn học
            $table->enum('category', ['2k8-xuat-phat-som-lop-12', '2k9-xuat-phat-som-lop-11', '2k10-xuat-phat-som-lop-10', 'hoc-tot-sach-giao-khoa', 'khoa-hoc-trung-hoc-co-so'])->default('hoc-tot-sach-giao-khoa'); // Danh mục khóa học
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            // $table->integer('created_by')->unsigned(); // created_by là INT
            $table->tinyInteger('status')->default(1); // 0: khóa, 1: mở
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('prerequisite_course_id')->references('id')->on('courses')->nullOnDelete(); // Nếu khóa gốc bị xóa thì set null
            $table->foreign('exam_paper_id')->references('id')->on('exam_papers')->nullOnDelete(); // Nếu đề thi bị xóa thì set null

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
