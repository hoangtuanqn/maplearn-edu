<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\CourseChapter;
use App\Traits\AuthorizesOwnerOrAdmin;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CourseChapterController extends BaseApiController
{
    use AuthorizesRequests, AuthorizesOwnerOrAdmin;
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_slug' => 'required|string|exists:courses,slug',
        ]);
        $course = Course::where('slug', $data['course_slug'])->firstOrFail();

        Gate::authorize('admin-teacher');
        // Thêm chương mới
        $data = $request->validate([
            'title'    => 'required|string|max:255',
            'position' => 'required|integer|min:1',
        ]);
        $chapter = CourseChapter::create([
            'course_id' => $course->id,
            'title'     => $data['title'],
            'position'  => $data['position'],
        ]);
        return $this->successResponse($chapter, 'Thêm chương cho khóa học thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $slug)
    {
        // Lấy slug của chương học từ route
        // Eager load lessons qua quan hệ
        $course = Course::with(['chapters' => function ($query) {
            $query->orderBy('position', 'desc')->orderBy('created_at', 'desc');
        }, 'chapters.lessons'])->where('slug', $slug)->firstOrFail();

        $course->chapters->each(function ($chapter) {
            $chapter->lessons->each(function ($lesson) {
                if ($lesson->is_free) {
                    $lesson->makeHidden(['content', 'created_at', 'updated_at']);
                } else {
                    $lesson->makeHidden(['video_url', 'content', 'created_at', 'updated_at']);
                }
            });
        });

        return $this->successResponse($course->chapters, 'Lấy danh sách chương thành công');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CourseChapter $courseChapter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseChapter $chapter)
    {
        Gate::authorize('admin-teacher');

        $chapter->delete();

        return $this->successResponse(null, 'Xóa chương học thành công!', 200);
    }
}
