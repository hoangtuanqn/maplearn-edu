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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('password', 255);
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone_number', 15)->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->default('other');
            $table->string('avatar')->nullable();
            $table->integer('birth_year')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('school')->nullable();
            $table->string('bio')->nullable();
            $table->string('degree')->nullable();
            $table->string('city')->nullable();
            $table->enum('role', ['admin', 'teacher', 'student'])->default('student');
            $table->boolean('banned')->default(0);
            // lưu mã 2fa, và trạng thái
            $table->string('google2fa_secret')->nullable();
            $table->boolean('google2fa_enabled')->default(false);
            $table->string('google_id')->nullable();
            $table->string('facebook_id')->nullable();
            $table->string('discord_id')->nullable();
            $table->timestamp('email_verified_at')->nullable(); // Thời gian xác thực email
            $table->string('verification_token')->nullable()->unique(); // Mã token xác thực email
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
    }
};
