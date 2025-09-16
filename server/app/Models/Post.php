<?php

namespace App\Models;

use App\Observers\PostObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([PostObserver::class])]
class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'thumbnail',
        'content',
        'views',
        'subject',
        'created_by',
        'status',
    ];

    protected $appends = [ 'creator']; // tự động thêm vào JSON

    // Không hiển thị các cột này khi in ra danh sách
    protected $hidden = [
        'created_by',
        'deleted_at',
    ];

    protected $casts = [
        'views'  => 'integer',
        'status' => 'boolean',
    ];
    // getRouteKeyName là phương thức để xác định trường nào sẽ được sử dụng làm khóa định tuyến
    // Mặc định Laravel sẽ dùng 'id', nhưng nếu bạn muốn dùng 'slug'
    // thì bạn cần định nghĩa lại phương thức này trong model của bạn.
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('H:i - d/m/Y');
    }
    public function getCreatorAttribute()
    {
        return $this->creator()->select('id', 'full_name')->get();
    }
}
