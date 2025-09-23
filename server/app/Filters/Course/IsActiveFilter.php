<?php

namespace App\Filters\Course;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class IsActiveFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {

        if ($value == 'true') {
            $query->where('start_date', '<=', Carbon::now());
        }

        return $query;
    }
}
