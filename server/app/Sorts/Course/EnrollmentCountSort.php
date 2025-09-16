<?php

namespace App\Sorts\Course;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class EnrollmentCountSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        // $query->withCount('enrollments')
        //     ->orderBy('enrollments_count', $descending ? 'desc' : 'asc');
    }
}
