<?php

namespace App\Filters\Course;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\Filters\Filter;

class RatingFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        switch ($value) {
            case 'most-reviewed':
                // SELECT course_id, COUNT(course_id) FROM course_reviews GROUP BY `course_id` ORDER BY COUNT(course_id)
                $courseIds = DB::table('course_reviews')
                    ->select('course_id')
                    ->groupBy('course_id')
                    ->orderByRaw('COUNT(course_id) DESC')
                    ->pluck('course_id');
                return $query->whereIn('id', $courseIds);
            default:
                $value     = (float) $value;
                $courseIds = DB::table('course_reviews')
                    ->select('course_id')
                    ->groupBy('course_id')
                    ->havingRaw('AVG(rating) >= ?', [$value])
                    ->pluck('course_id');

                return $query->whereIn('id', $courseIds);
        }
    }
}
