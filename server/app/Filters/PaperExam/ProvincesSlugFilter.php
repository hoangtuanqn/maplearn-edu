<?php

namespace App\Filters\PaperExam;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ProvincesSlugFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $provinceIds = is_array($value) ? $value : explode(',', $value);

        $query->whereIn('province', $provinceIds);
    }
}
