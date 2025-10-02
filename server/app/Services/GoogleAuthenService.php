<?php

namespace App\Services;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use PragmaRX\Google2FA\Google2FA;

abstract class GoogleAuthenService
{

    // Tạo mã 2FA
    public static function generateSecret2FA($companyName)
    {
        $google2fa = new Google2FA();

        // 1. Tạo secret
        $secret = $google2fa->generateSecretKey();

        // 2. Tạo otpauth URL
        $otpauthUrl = $google2fa->getQRCodeUrl(
            $companyName,
            '', // Không truyền email, chỉ truyền companyName
            $secret
        );

        // 3. Tạo QR code PNG
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

    // hiển thị base64 của QR code (chỉ truyền vô mã 2fa + name)
    public static function getQRCodeBase64($companyName, $secret)
    {
        $google2fa = new Google2FA();

        // Tạo otpauth URL
        $otpauthUrl = $google2fa->getQRCodeUrl(
            $companyName,
            '', // Không truyền email, chỉ truyền companyName
            $secret
        );

        // Tạo QR code PNG
        $qrCode    = new QrCode($otpauthUrl);
        $writer    = new PngWriter();
        $imageData = $writer->write($qrCode)->getString();

        // Trả ảnh PNG trực tiếp
        return 'data:image/png;base64,' . base64_encode($imageData);
    }
}
