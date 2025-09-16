<?php

namespace App\Filters\PaperExam;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class DifficultiesSlugFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $difficultyIds = is_array($value) ? $value : explode(',', $value);
        $query->whereIn('difficulty', $difficultyIds);
    }
}
