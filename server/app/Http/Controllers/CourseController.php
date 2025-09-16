<?php

namespace App\Http\Controllers;

use App\Filters\Course\PriceFilter;
use App\Filters\Course\RatingFilter;
use App\Filters\Course\TeacherFilter;
use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\LessonViewHistory;
use App\Sorts\Course\EnrollmentCountSort;
use App\Traits\AuthorizesOwnerOrAdmin;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Gate;

class CourseController extends BaseApiController
{
    use AuthorizesRequests, AuthorizesOwnerOrAdmin;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
            // ->where('status', true)
            ->orderByDesc('id')
            ->paginate($limit);
        $courses->getCollection()->transform(function ($course) {
            return $course->makeHidden(['duration', 'current_lesson']);
        });


        return $this->successResponse($courses, 'Lấy danh sách khóa học thành công!');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:2',
            'subject' => 'required|string|min:1',
            'category' => 'required|string|min:1',
            'gradeLevel' => 'required|string|min:1',
            'instructor' => 'required|string|min:1',
            'price' => 'required|numeric|min:0',
            'startDate' => 'required|string|min:1',
            'endDate' => 'nullable|string',
            'prerequisiteCourse' => 'nullable|string',
            'coverImage' => 'required|url',
            'introVideo' => 'required|url',
            'description' => 'required|string|min:10',
        ]);

        Gate::authorize('only-admin');
        // Nếu start > now() thì status = 3, ngược lại = 2
        $status = (strtotime($data['startDate']) > time()) ? 2 : 3;
        $course = Course::create([
            'name' => $data['name'],
            'subject' => $data['subject'],
            'category' => $data['category'],
            'grade_level' => $data['gradeLevel'],
            'user_id' => $data['instructor'],
            'price' => $data['price'],
            'start_date' => $data['startDate'],
            'end_date' => $data['endDate'] ?? null,
            'prerequisite_course_id' => $data['prerequisiteCourse'] ?? null,
            'thumbnail' => $data['coverImage'],
            'intro_video' => $data['introVideo'],
            'description' => $data['description'],
            'created_by' => $request->user()->id,
            'status' => $status,
        ]);
        return $this->successResponse($course, 'Tạo khóa học thành công!', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Course $course)
    {
        // Sau đó load các quan hệ khác
        $course->load([
            'teacher:id,full_name,avatar,bio,degree',
        ]);
        $course->prerequisite_course = null;
        if ($course->prerequisite_course_id) {
            $course->prerequisite_course = Course::find($course->prerequisite_course_id);
        }
        $course->makeHidden(['prerequisite_course_id']);

        // Nếu đã mua, thì lấy thông tin video đnagg học hiện tại


        return $this->successResponse($course, 'Lấy thông tin khóa học thành công!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        Gate::authorize('only-admin', $course);

        $data = $request->validate([
            'name' => 'sometimes|required|string|min:2',
            'subject' => 'sometimes|required|string|min:1',
            'category' => 'sometimes|required|string|min:1',
            'grade_level' => 'sometimes|required|string|min:1',
            'user_id' => 'sometimes|required|string|min:1', // giáo viên dạy
            'price' => 'sometimes|required|numeric|min:0',
            'prerequisite_course_id' => 'nullable|integer|exists:courses,id',
            'thumbnail' => 'sometimes|required|url',
            'intro_video' => 'sometimes|required|url',
            'description' => 'sometimes|required|string|min:10',
        ]);


        $course->update($data);

        return $this->successResponse($course, 'Cập nhật khóa học thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        Gate::authorize('only-admin', $course);
        // Check xem có ai đăng ký khóa học chưa
        if ($course->enrollments_count > 0) {
            return $this->errorResponse(null, 'Khóa học đã có học viên đăng ký, không thể xóa!', 403);
        }
        $course->delete();
        return $this->successResponse(null, 'Xóa khóa học thành công!');
    }

    // Lấy 8 khóa học
    public function recommended()
    {
        // $userId = Auth::id();
        // $favCourseIds = CourseUserFavorite::where('user_id', $userId)
        //     ->pluck('course_id');

        // if ($favCourseIds->isNotEmpty()) {
        //     $favoriteCourses = Course::whereIn('id', $favCourseIds)->get();

        //     // Lấy các chủ đề, cấp học,... từ các khóa yêu thích
        //     $subjectIds = $favoriteCourses->pluck('subject_id')->unique();
        //     $gradeLevels = $favoriteCourses->pluck('grade_level_id')->unique();
        //     $categoryIds = $favoriteCourses->pluck('category_id')->unique();

        //     // Lấy danh sách khóa học đã mua (để tránh đề xuất khóa học đã mua)
        //     $purchasedCourseIds = Auth::user()->enrollments()->pluck('course_id');

        //     // Đề xuất các khóa học tương tự nhưng chưa yêu thích (và người dùng chưa mua khóa học đó)
        //     $recommendCourses = Course::whereNotIn('id', $favCourseIds)->whereNotIn('id', $purchasedCourseIds)
        //         ->where('status', true)
        //         ->where(function ($query) use ($subjectIds, $gradeLevels, $categoryIds) {
        //             $query->whereIn('subject_id', $subjectIds)
        //                 ->orWhereIn('grade_level_id', $gradeLevels)
        //                 ->orWhereIn('category_id', $categoryIds);
        //         })
        //         ->inRandomOrder()
        //         ->limit(8)
        //         ->get();
        // } else {
        //     // Nếu chưa có khóa yêu thích → đề xuất ngẫu nhiên
        //     $recommendCourses = Course::where('status', true)
        //         ->inRandomOrder()
        //         ->limit(8)
        //         ->get();
        // }
        $recommendCourses = Course::where('status', true)
            ->inRandomOrder()
            ->limit(8)
            ->get();
        return $this->successResponse($recommendCourses, 'Lấy danh sách khóa học đề xuất thành công!');
    }

    // Data được cắt gọn để gửi cho AI
    public function aiData()
    {
        $courses = QueryBuilder::for(Course::class)

            ->select([
                'id',
                'name',
                'description',
                'price',
                'created_at',
            ])
            ->where('status', true)
            ->orderByDesc('id')
            ->get();

        return $this->successResponse($courses, 'Lấy dữ liệu khóa học thành công!');
    }

    // Trả về dữ liệu khóa học với dữ liệu gửi lên [1,2, ...]
    public function aiDataByIds(Request $request)
    {
        $courseIds = $request->input('ids', []);
        if (empty($courseIds)) {
            return $this->errorResponse(null, 'Không có khóa học nào được chọn!', 400);
        }

        $courses = QueryBuilder::for(Course::class)
            ->whereIn('id', $courseIds)
            ->select([
                'id',
                'name',
                'slug',
                'thumbnail',
                'price',
            ])
            ->where('status', true)
            ->get();

        $courses->transform(function ($course) {
            return $course->makeHidden(['grade_level', 'subject', 'category', 'grade_level', 'is_favorite', 'is_enrolled', 'rating', 'lesson_count', 'duration']);
        });

        return $this->successResponse($courses, 'Lấy dữ liệu khóa học thành công!');
    }


    // Lấy thông tin khóa học sau khi đã mua thành công
    public function detailCourse(Request $request, string $slug)
    {
        $course = Course::where('slug', $slug)->firstOrFail();

        $user = $request->user();
        // Check người dùng đã mua khóa học này chưa
        $hasPurchased = $user->purchasedCourses()->where('courses.id', $course->id)->exists();
        if (!$hasPurchased) {
            return $this->errorResponse(null, 'Bạn chưa mua khóa học này!', 403);
        }
        // Người dùng đã học bao nhiêu bài
        $course->completed_lessons = $course->chapters->sum(function ($chapter) use ($user) {
            return LessonViewHistory::where('user_id', $user->id)
                ->where('is_completed', true)
                ->whereIn('lesson_id', $chapter->lessons->pluck('id'))
                ->count();
        });
        $course->percent_completed = $course->completed_lessons / ($course->lesson_count ?? 1) * 100;

        // Lấy chương khóa học (bên trong mỗi chương sẽ có lesson)
        $course->load('chapters.lessons');

        // Lặp qua từng lesson và check trong DB LessonViewHistory
        $lessonHistories = LessonViewHistory::where('user_id', $user->id)->get()->keyBy('lesson_id');
        foreach ($course->chapters as $chapter) {

            $count_successed = 0;
            $duration = 0;
            // lessons trong mỗi chapter
            foreach ($chapter->lessons as $lesson) {
                $lessonHistory = $lessonHistories->get($lesson->id);
                // Kiểm tra đã hoàn thành chưa
                $lesson->successed = $lessonHistory && $lessonHistory->is_completed;
                if ($lesson->successed) {
                    $count_successed++;
                }
                $duration += $lesson->duration;
                // $lesson->viewed = $lessonHistory !== null;
                // $lesson->progress = $lessonHistory ? $lessonHistory->progress : 0;
            }
            $chapter->completed_lessons = $count_successed;
            $chapter->duration = $duration;
        }

        return $this->successResponse($course, 'Lấy thông tin khóa học thành công!');
    }

    public function getLesson(Request $request, Course $course, CourseLesson $lesson)
    {
        $user = $request->user();

        $hasPurchased = $user->purchasedCourses()->where('courses.id', $course->id)->exists();
        if (!$hasPurchased) {
            return $this->errorResponse(null, 'Bạn chưa mua khóa học này!', 403);
        }
        $lesson->load('chapter');
        // Get next lesson in current chapter
        $nextLessonInChapter = $lesson->chapter->lessons()->where('position', '>', $lesson->position)->first();

        if ($nextLessonInChapter) {
            $lesson->next_video = $nextLessonInChapter;
        } else {
            // If current lesson is last in chapter, get first lesson of next chapter
            $nextChapter = $course->chapters()->where('position', '>', $lesson->chapter->position)->first();
            if ($nextChapter) {
                $lesson->next_video = $nextChapter->lessons()->orderBy('position')->first();
            } else {
                $lesson->next_video = null; // No more lessons in course
            }
        }

        // Get previous lesson in current chapter
        $prevLessonInChapter = $lesson->chapter
            ->lessons()
            ->where('position', '<', $lesson->position)
            ->get()
            ->last();

        if ($prevLessonInChapter) {
            $lesson->prev_video = $prevLessonInChapter;
        } else {
            // If current lesson is first in chapter, get last lesson of previous chapter
            $prevChapter = $course->chapters()->where('position', '<', $lesson->chapter->position)->get()->last();
            if ($prevChapter) {
                $lesson->prev_video = $prevChapter->lessons()->get()->last();
            } else {
                $lesson->prev_video = null; // No previous lessons in course
            }
        }
        $lessonHistories = LessonViewHistory::where('user_id', $user->id)->get();
        $lesson->viewed = $lessonHistories->contains('lesson_id', $lesson->id);
        $currentLessonHistory = $lessonHistories->where('lesson_id', $lesson->id)->first();
        $lesson->progress = $currentLessonHistory->progress ?? 0;

        $lesson->current_time = $currentLessonHistory->progress ?? 0;
        if ($lesson->current_time >= $lesson->duration - 30) {
            $lesson->current_time = 0;
        }
        return $this->successResponse($lesson, 'Lấy thông tin bài học thành công!');
    }

    // Trả thông tin thống kê số học sinh đăng ký trong 7 ngày gần nhất
    public function statsEnrollmentsLast7Days(Course $course)
    {
        // Lấy dữ liệu đăng ký trong 7 ngày gần nhất.

        /**
         * Mô tả logic: Group by trong bảng payments theo status = paid
         * Hiển thị thêm số lượng Cao  thì lớn hơn bao nhiêu đó, thấp thì bao nhiêu, trung bình thì bao nhiêu, ...
         * Hiển thị doanh thu hôm nay, doanh thu so với ngày hôm qua
        */
        $data = $course->payments()
            ->where('status', 'paid')
            ->where('paid_at', '>=', Carbon::now()->subDays(7))
            ->selectRaw('DATE(paid_at) as date, COUNT(*) as student_count')
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        // Format date
        $data->transform(function ($item) {
            $item->date = Carbon::parse($item->date)->format('d-m');
            return $item;
        });

        return $this->successResponse($data, 'Lấy dữ liệu thống kê học viên đăng ký trong 7 ngày gần nhất thành công!');
    }
}
