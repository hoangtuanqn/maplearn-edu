<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Auth\Access\Response;

trait AuthorizesAdminOnly
{
    /**
     * Chỉ cho phép Admin thực hiện hành động
     */
    protected function canManage(User $user, string $action = 'thao tác'): Response
    {
        return $user->role === 'admin'
            ? Response::allow()
            : Response::deny("Chỉ admin mới được {$action}.");
    }
}
