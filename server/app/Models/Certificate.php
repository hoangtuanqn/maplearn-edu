<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    /** @use HasFactory<\Database\Factories\CertificateFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'course_id',
        'full_name',
        'code',
        'issued_at',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function getRouteKeyName()
    {
        return 'code';
    }
    protected $casts = [
        'issued_at' => 'datetime',
    ];
    // tricker khi creating sẽ tự tạo code
    protected static function booted()
    {
        static::creating(function ($certificate) {
            if (empty($certificate->code)) {
                // Tạo mã chứng chỉ duy nhất
                do {
                    $code = 'CERT-' . date('Y') . '-' . strtoupper(bin2hex(random_bytes(3)));
                } while (self::where('code', $code)->exists());
                $certificate->code = $code;
            }
            if (empty($certificate->issued_at)) {
                $certificate->issued_at = now();
            }
        });
    }
}
