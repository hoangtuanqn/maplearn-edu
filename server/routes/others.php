<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GradeLevelController;
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use Illuminate\Support\Facades\Route;

Route::get("/grade-levels/courses", [GradeLevelController::class, 'getCoursesByGradeLevel'])->middleware('auth.optional.jwt');
Route::apiResource('grade-levels', GradeLevelController::class);
Route::get("/admin/dashboard", [DashboardController::class, 'getDashboardData'])->middleware(['auth.jwt', 'check.role:admin,teacher']);
Route::get("/teacher/dashboard", [TeacherDashboardController::class, 'getDashboardData'])->middleware(['auth.jwt', 'check.role:admin,teacher']);
