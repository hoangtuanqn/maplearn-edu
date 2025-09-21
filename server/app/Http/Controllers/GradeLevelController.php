<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;

class GradeLevelController extends BaseApiController
{

    // Lấy danh sách môn trong từng level học (VD: Lớp 12 thì có khóa học nào, lớp 11 thì có khóa học nào)
    // Mỗi danh mục 8 khóa học
    public function getCoursesByGradeLevel()
    {
        $gradeLevels = config('constants.grade_level');
        $response    = [];
        // Chỉ lấy các khóa học đang active
        foreach ($gradeLevels as $gradeLevel) {
            $response[] = [
                'slug'    => $gradeLevel,
                'courses' => Course::where('grade_level', $gradeLevel)
                    ->where('status', true)
                    ->select([
                        'id',
                        'name',
                        'description',
                        'slug',
                        'user_id',
                        'thumbnail',
                        'price',
                        'grade_level',
                    ])->orderBy('id', 'desc')->take(8)->get(), // Giới hạn 8 khóa học mỗi khối lớp
            ];
        }

        return $this->successResponse($response, 'Lấy danh sách khóa học theo khối lớp thành công!');
    }
}
