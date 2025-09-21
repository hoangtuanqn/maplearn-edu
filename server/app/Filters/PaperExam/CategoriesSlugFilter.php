<?php

namespace App\Filters\PaperExam;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CategoriesSlugFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $categoryIds = is_array($value) ? $value : explode(',', $value);
        $query->whereIn('exam_category', $categoryIds);
    }
}
