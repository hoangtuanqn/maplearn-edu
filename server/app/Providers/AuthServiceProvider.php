<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Đăng ký policy nếu có, ví dụ:
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        // 1. Chỉ admin mới xem được
        Gate::define('only-admin', function (User $user) {
            return $user->role === 'admin';
        });
        // 2. Chỉ người tạo mới có thể thao tác được
        Gate::define('only-owner', function (User $user, $model) {
            return $model->created_by === $user->id || $model->user_id === $user->id;
        });
        // 3. Chỉ admin và teacher mới xem được
        Gate::define('admin-teacher', function (User $user) {
            return $user->role === 'admin' || $user->role === 'teacher';
        });

        // 4. Chỉ admin và người tạo mới xem được
        Gate::define('admin-owner', function (User $user, $model) {
            return $user->role === 'admin' || $model->created_by === $user->id || $model->user_id === $user->id;
        });

        // 5. Chỉ admin, teacher và người tạo mới xem được
        Gate::define('admin-teacher-owner', function (User $user, $model) {
            return $user->role        === 'admin'
                || $user->role        === 'teacher'
                || $model->created_by === $user->id || $model->user_id === $user->id;
        });
    }
}
