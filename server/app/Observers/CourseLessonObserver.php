<?php

namespace App\Observers;

use App\Helpers\CommonHelper;
use App\Models\CourseLesson;

class CourseLessonObserver
{
    public function creating(CourseLesson $course)
    {
        if (empty($course->slug)) {
            $course->slug = CommonHelper::generateSlug($course->title);
        }
    }
}
