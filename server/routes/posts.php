<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::apiResource('posts', PostController::class)->middlewareFor(['store', 'update', 'destroy'], 'auth.jwt');
Route::post('/posts/{post}/view', [PostController::class, 'increaseView']);
Route::post('/posts/search/ai', [PostController::class, 'showDataAI']);
