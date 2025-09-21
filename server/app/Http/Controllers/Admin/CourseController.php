<?php

namespace App\Http\Controllers\Admin;

use App\Filters\Course\PriceFilter;
use App\Filters\Course\RatingFilter;
use App\Filters\Course\TeacherFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Sorts\Course\EnrollmentCountSort;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CourseController extends BaseApiController
{
    public function index(Request $request)
    {
        $user = $request->user();
        $limit = (int)($request->limit ?? 20);
        // dd($limit);
        // loại bỏ key lesson_count, duration
        $courses = QueryBuilder::for(Course::class)
            ->select([
                'id',
                'name',
                'description',
                'slug',
                'grade_level',
                'thumbnail',
                'price',
                'subject',
                'category',
                'user_id',
                'status',
                'start_date',
                'end_date',
            ])
            ->allowedSorts(['created_at', 'download_count', AllowedSort::custom('enrollment_count', new EnrollmentCountSort)])
            ->allowedFilters([
                'id',
                'name',
                'name',
                'category',
                'grade_level',
                'subject',
                AllowedFilter::custom('price_range', new PriceFilter),
                AllowedFilter::custom('teachers', new TeacherFilter),
                AllowedFilter::custom('rating', new RatingFilter),
            ])
            // thêm cái where, nếu quyền là teacher thì chỉ lấy khóa học của mình
            ->when($user->role === 'teacher', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            // ->where('status', true)
            ->orderByDesc('id')
            ->paginate($limit);
        $courses->getCollection()->transform(function ($course) {
            return $course->makeHidden(['duration', 'current_lesson']);
        });

        return $this->successResponse($courses, 'Lấy danh sách khóa học thành công!');
    }
}
