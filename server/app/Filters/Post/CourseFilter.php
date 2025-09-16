<?php

namespace App\Filters\Post;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CourseFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // Slug subject
        $courseSlugs = is_array($value) ? $value : explode(',', $value);

        return $query->whereHas('subject', function (Builder $q) use ($courseSlugs) {
            $q->whereIn('slug', $courseSlugs);
        });
    }
}
