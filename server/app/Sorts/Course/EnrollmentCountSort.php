<?php

namespace App\Sorts\Course;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class EnrollmentCountSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $query->withCount('students')
            ->orderBy('students_count', $descending ? 'desc' : 'asc');
    }
}
