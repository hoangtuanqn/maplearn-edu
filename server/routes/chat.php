<?php

// Chat Bot AI

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::post('/chat-bot-ai', [ChatController::class, 'chat']);
