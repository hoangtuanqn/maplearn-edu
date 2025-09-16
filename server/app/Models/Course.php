<?php

namespace App\Models;

use App\Observers\CourseObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

#[ObservedBy([CourseObserver::class])]
class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'slug',
        'description',
        'thumbnail',
        'intro_video',
        'price',
        'user_id',
        'prerequisite_course_id',
        'grade_level',
        'subject',
        'category',
        'start_date',
        'end_date',
        'status',
        'is_sequential',
    ];
    protected $hidden = [];
    // Nhớ đi qua middleware auth.optional.jwt để lấy được user đang đăng nhập
    protected $appends = ['teacher', 'is_enrolled', 'lesson_count', 'duration', 'is_best_seller', 'enrollments_count', 'current_lesson', 'lesson_successed', 'rating']; // tự động thêm vào JSON
    protected $casts   = [
        'price'         => 'double',
        'is_sequential' => 'boolean',
    ];
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // Lấy số bảng ghi học sinh đã thanh toán khóa học (status = paid)
    public function payments()
    {
        return $this->hasMany(Payment::class)->where('status', 'paid');
    }

    // Danh sách học sinh đã thanh toán (qua bảng pivot: payments)
    public function students()
    {
        // bảng payments chứa course_id, xem ai đã mua và lấy cột created_at, updated_at bên bảng payments
        return $this->belongsToMany(User::class, 'payments', 'course_id', 'user_id')
            ->withPivot(['id', 'status', 'amount'])
            ->wherePivot('status', 'paid');
    }

    // Danh sách chương học, sort theo vị trí
    public function chapters()
    {
        return $this->hasMany(CourseChapter::class, 'course_id')->orderBy('position');
    }

    public function getEnrollmentsCountAttribute(): int
    {
        return $this->students()->count();
    }

    public function getLessonCountAttribute()
    {
        // Lấy tất cả chương có khóa học này
        $chapters = $this->chapters()->with('lessons')->get();

        // Duyệt tất cả chương, gộp lại toàn bộ lesson, rồi tính tổng thời lượng
        return $chapters->flatMap->lessons->count();
    }
    public function getDurationAttribute()
    {
        // Lấy tất cả chương có khóa học này
        $chapters = $this->chapters()->with('lessons')->get();

        // Duyệt tất cả chương, gộp lại toàn bộ lesson, rồi tính tổng thời lượng
        return $chapters->flatMap->lessons->sum('duration');
    }

    // Lấy giá tiền sau khi áp dụng giảm giá (mã giảm giá cao nhất)
    public function getFinalPriceAttribute(): float
    {
        return  $this->price;
    }

    // Liên kết v

    // Đánh dấu sản phẩm có bán chạy hay không (trong vòng 7 ngày mà bàn được >= 100 sản phẩm thì bán chạy)
    public function getIsBestSellerAttribute(): bool
    {
        return $this->students()
            ->where('created_at', '>=', now()->subDays(7))
            ->count() >= 100;
    }

    // lấy thông tin giáo viên dạy
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function teacher()
    {
        return $this->user();
    }

    public function getTeacherAttribute()
    {
        return $this->user()->select('id', 'full_name', 'avatar', 'bio', 'degree')->first();
    }

    // Check khóa học có dc mua bởi người dùng đang gửi request lấy data hay k ?
    public function getIsEnrolledAttribute(): bool
    {
        $user = Auth::user();
        // Nếu chưa đăng nhập, trả về false
        if (!$user) {
            return false;
        }
        return $user->payments()->where('course_id', $this->id)->where('status', 'paid')->exists();
    }


    // current_lesson
    public function getCurrentLessonAttribute()
    {
        $user = Auth::user();

        if ($user && $this->is_enrolled) {
            $currentLessonHistory = LessonViewHistory::where('user_id', $user->id)
                ->whereIn('lesson_id', function ($query) {
                    $query->select('id')
                        ->from('course_lessons')
                        ->whereIn('chapter_id', function ($subQuery) {
                            $subQuery->select('id')
                                ->from('course_chapters')
                                ->where('course_id', $this->id);
                        });
                })
                ->orderByDesc('updated_at')
                ->with('lesson')
                ->first();

            if ($currentLessonHistory) {
                // Nếu có lịch sử học, trả về bài học đó
                return $currentLessonHistory->lesson;
            } else {
                // Nếu không có lịch sử học, trả về bài học đầu tiên
                return CourseLesson::whereIn('chapter_id', function ($query) {
                    $query->select('id')
                        ->from('course_chapters')
                        ->where('course_id', $this->id);
                })
                    ->orderBy('chapter_id')
                    ->orderBy('position')
                    ->first();
            }
        }

        return null;
    }

    // lesson_successed
    public function getLessonSuccessedAttribute()
    {
        $user = Auth::user();
        if ($user && $this->is_enrolled) {
            return LessonViewHistory::where('user_id', $user->id)
                ->whereIn('lesson_id', function ($query) {
                    $query->select('id')
                        ->from('course_lessons')
                        ->whereIn('chapter_id', function ($subQuery) {
                            $subQuery->select('id')
                                ->from('course_chapters')
                                ->where('course_id', $this->id);
                        });
                })
                ->where('is_completed', true)
                ->count();
        }
        return 0;
    }
    // Reviews
    public function reviews()
    {
        return $this->hasMany(CourseReview::class, 'course_id');
    }
    // Tính điểm đánh giá trung bình
    public function getRatingAttribute()
    {
        return [
            'average_rating' => round($this->reviews()->avg('rating'), 1),
            'total_reviews' => $this->reviews()->count(),
        ]; // Làm tròn 1 chữ số sau dấu phẩy
    }
}
