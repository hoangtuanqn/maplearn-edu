<?php

namespace App\Filters\Course;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class TeacherFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // Convert CSV string "1,3,7" → array [1, 3, 7]
        $teacherIds = is_array($value) ? $value : explode(',', $value);

        return $query->whereIn('user_id', $teacherIds);
    }
}
