<?php

namespace App\Filters\Invoice;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class DateFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        // $value sẽ có dạng ['27/7/2025', '29/7/2025']
        // Chuyển 27/7/2025 sang '2025-07-27'
        // dd($value);
        if (is_array($value) && count($value) === 2) {
            // parse ngày theo định dạng d/m/Y
            $start = Carbon::createFromFormat('d/m/Y', trim($value[0]))->startOfDay();
            $end   = Carbon::createFromFormat('d/m/Y', trim($value[1]))->endOfDay();

            // lọc theo cột created_at (datetime)
            $query->whereBetween('created_at', [$start, $end]);
        }
    }
}
