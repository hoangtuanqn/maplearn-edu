<?php

namespace App\Models;

use App\Observers\PaymentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(PaymentObserver::class)]
class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;
    public $timestamps = false;
    public function getRouteKeyName()
    {
        return 'transaction_code';
    }

    protected $fillable = [
        'user_id',
        'course_id',
        'amount',
        'payment_method',
        'transaction_code',
        'status',
        'paid_at',
    ];
    protected $casts = [
        'amount'  => 'float',
        'paid_at' => 'datetime',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
