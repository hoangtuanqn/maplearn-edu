<?php

namespace App\Services;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use PragmaRX\Google2FA\Google2FA;

abstract class GoogleAuthenService
{
    // Tạo mã 2FA
    public static function generateSecret2FA($email)
    {
        $google2fa = new Google2FA();

        // 1. Tạo secret
        $secret = $google2fa->generateSecretKey();

        // 2. Tạo otpauth URL
        $companyName = 'MapLearn - ' . $email;
        $otpauthUrl  = $google2fa->getQRCodeUrl(
            $companyName,
            $email,
            $secret
        );

        // 3. Tạo QR code PNG (bản mới không dùng create())
        $qrCode    = new QrCode($otpauthUrl);
        $writer    = new PngWriter();
        $imageData = $writer->write($qrCode)->getString();

        // 4. Trả ảnh PNG trực tiếp
        return [
            'secret'    => $secret,
            'qr_base64' => 'data:image/png;base64,' . base64_encode($imageData),
        ];
    }

    // Xác thực 2fa
    public static function verify2FA($secret, $code): bool
    {
        $google2fa = new Google2FA();

        $isValid = $google2fa->verifyKey(
            $secret,
            (string)$code
        );

        // Kiểm tra mã
        return $isValid;
    }
}
