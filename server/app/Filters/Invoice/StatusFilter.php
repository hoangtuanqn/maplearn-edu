<?php

namespace App\Filters\Invoice;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class StatusFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        switch ($value) {
            case "expiring":
                // Lấy các hóa đơn gần hết hạn (còn 1 ngày trước due)
                $query->where('status', 'pending')->where('due_date', '<=', now()->addDay());
                break;
            case "cancelled":
                $query->whereIn('status', ['failed', 'expired']);
                break;
            default:
                $query->where('status', $value);
                break;
        }
    }
}
