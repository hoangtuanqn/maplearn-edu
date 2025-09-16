<?php

namespace App\Filters\Course;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class PriceFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {

        switch ($value) {
            case 'free':
                $query->where('price', 0);
                break;

            case 'under-500k':
                $query->where('price', '<', 500000);
                break;

            case '500k-1m':
                $query->where('price', '>=', 500000)
                    ->where('price', '<=', 1000000);
                break;

            case '1m-2m':
                $query->where('price', '>=', 1000000)
                    ->where('price', '<=', 2000000);
                break;

            case 'above-2m':
                $query->where('price', '>', 2000000);
                break;

            case 'asc':
                $query->orderBy('price', 'asc');
                break;

            case 'desc':
                $query->orderBy('price', 'desc');
                break;
        }

        return $query;
    }
}
