<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use App\Traits\AuthorizesOwnerOrAdmin;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    use AuthorizesOwnerOrAdmin;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Post $post): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return in_array($user->role, ['admin', 'teacher'])
            ? Response::allow()
            : Response::deny('Bạn không có quyền đăng bài.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Post $post): Response
    {
        // Admin toàn quyền hoặc nếu là teacher thì ai đăng người dó được phép sửa
        return $this->canManage($user, $post, 'cập nhật');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Post $post): Response
    {
        return $this->canManage($user, $post, 'xóa');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $post): Response
    {
        return $this->canManage($user, $post, 'khôi phục');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $post): Response
    {
        return $this->canManage($user, $post, 'xóa vĩnh viễn');
    }
}
