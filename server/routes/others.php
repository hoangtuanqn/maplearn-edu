<?php

use App\Http\Controllers\GradeLevelController;
use Illuminate\Support\Facades\Route;

Route::get("/grade-levels/courses", [GradeLevelController::class, 'getCoursesByGradeLevel'])->middleware('auth.optional.jwt');
Route::apiResource('grade-levels', GradeLevelController::class);
