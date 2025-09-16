<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

// Implement JWTSubject để sử dụng các phương thức được cấp
class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'password',
        'full_name',
        'email',
        'phone_number',
        'gender',
        'avatar',
        'birth_year',
        'facebook_link',
        'school',
        'bio',
        'degree',
        'city',
        'role',
        'google_id',
        'facebook_id',
        'discord_id',
        'money',
        'banned',
        'google2fa_secret',
        'google2fa_enabled',
        'email_verified_at',
        'verification_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'google_id',
        'facebook_id',
        'discord_id',
        'google2fa_secret',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'money'             => 'float',
        'password'          => 'hashed',
        'email_verified_at' => 'datetime',
        'current_balance'   => 'float',
        'total_deposit'     => 'float',
        'banned'            => 'boolean',
        'google2fa_enabled' => 'boolean',
        'birth_year'        => 'integer',
    ];

    /**
     *  Trả về dạng boolean: Check quyền admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     *  Trả về dạng boolean: Check quyền teacher
     */
    public function isTeacher(): bool
    {
        return $this->role === 'teacher';
    }

    /**
     *  Trả về dạng boolean: Check quyền student
     */
    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    /**
     * Trả về id của user để đưa vào token
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // thường là id
    }

    /**
     * Các claim (payload) bổ sung (nếu cần)
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    // Cấu hình gửi Email
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    // Lấy danh sách documents người này đã upload
    public function createdPosts()
    {
        return $this->hasMany(Post::class, 'created_by');
    }

    // examAttempts
    public function examAttempts()
    {
        return $this->hasMany(ExamAttempt::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }


    // Lấy danh sách khóa học đã mua
    public function purchasedCourses()
    {
        // Dựa vô bảng payments có chứa user_id, course_id, để get course người dùng đã mua
        return $this->hasManyThrough(Course::class, Payment::class, 'user_id', 'id', 'id', 'course_id')->where('payments.status', 'paid');
    }

    public function courses()
    {
        // Nếu là teacher thì load cái này sẽ có data
        return $this->hasMany(Course::class);
    }
}
