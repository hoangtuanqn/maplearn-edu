<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::apiResource('teachers', TeacherController::class)->middlewareFor(['store', 'update', 'destroy'], 'auth.jwt');