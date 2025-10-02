<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use Illuminate\Http\Request;

class GradeLevelController extends BaseApiController
{

    // Lấy danh sách môn trong từng level học (VD: Lớp 12 thì có khóa học nào, lớp 11 thì có khóa học nào)
    // Mỗi danh mục 8 khóa học
    public function getCoursesByGradeLevel(Request $request)
    {
        $user = $request->user();
        $gradeLevels = config('constants.grade_level');
        $response    = [];

        // nếu user đã login (get các khóa học đã mua)
        $purchasedCourseIds = $user ? $user->purchasedCourses()->pluck('courses.id')->toArray() : [];
        // Chỉ lấy các khóa học đang active
        foreach ($gradeLevels as $gradeLevel) {
            $response[] = [
                'slug'    => $gradeLevel,
                'courses' => Course::where('grade_level', $gradeLevel)
                    ->where('status', true)
                    ->whereNotIn('id', $purchasedCourseIds) // Loại bỏ các khóa học đã mua
                    ->select([
                        'id',
                        'name',
                        'description',
                        'slug',
                        'user_id',
                        'thumbnail',
                        'price',
                        'grade_level',
                        'updated_at',
                    ])->orderBy('id', 'desc')->take(8)->get(), // Giới hạn 8 khóa học mỗi khối lớp
            ];
        }

        return $this->successResponse($response, 'Lấy danh sách khóa học theo khối lớp thành công!');
    }
}
