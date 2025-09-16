<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class CommonHelper
{
    // Tạo slug từ title
    public static function generateSlug($string)
    {
        $slugBase     = Str::slug($string);
        $randomSuffix = Str::random(12);
        return $slugBase . '-' . strtolower($randomSuffix);
    }

    public static function someOtherHelper($data)
    {
        // Xử lý gì đó
    }
}
