<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $model  = env('MODEL_AI', 'gemini-2.0-flash');
        $apiKey = env('GEMINI_API_KEY');

        // Kiểm tra đầu vào hợp lệ (tuỳ bạn có validate không)
        if (!$request->has(['systemInstruction', 'contents'])) {
            return response()->json(['error' => 'Thiếu dữ liệu'], 422);
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post(
            "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}",
            $request->all()
        );
        return response()->json($response->json());
    }
}
