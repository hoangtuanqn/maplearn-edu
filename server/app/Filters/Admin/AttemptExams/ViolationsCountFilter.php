<?php

namespace App\Filters\Admin\AttemptExams;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ViolationsCountFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // value là 0, 1-2, 3+
        switch ($value) {
            case '0':
                $query->where('violation_count', 0);
                break;
            case '1-2':
                $query->whereBetween('violation_count', [1, 2]);
                break;
            case '3+':
                $query->where('violation_count', '>=', 3);
                break;
            default:
                // Nếu giá trị không hợp lệ, không áp dụng bộ lọc
                break;
        }

        return $query;
    }
}
