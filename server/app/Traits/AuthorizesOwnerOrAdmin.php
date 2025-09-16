<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Auth\Access\Response;

/**
 * Trait là một tính năng của PHP cho phép bạn tái sử dụng code (methods) trong nhiều class mà không cần kế thừa (extends).
 * Nó giống như một "khối code dùng chung" – có thể import vào bất kỳ class nào để dùng lại method bên trong.
 * Về mặc kỹ thuật:
 * Trait giống như "module chứa method".
 * Khi bạn dùng use TraitName; trong một class, tất cả method trong trait sẽ được nhúng vào class đó.
 */
trait AuthorizesOwnerOrAdmin
{
    /**
     * Kiểm tra xem user có quyền quản lý bản ghi (update, delete, ...)
     *
     * @param  User  $user
     * @param  object  $model  (phải có thuộc tính created_by)
     * @param  string  $action  (vd: 'xóa', 'chỉnh sửa', ...)
     * @return Response
     */
    protected function canManage(User $user, object $model, string $action = "thao tác"): Response
    {

        if ($user->role === 'admin') {
            return Response::allow();
        }

        if ($user->role === 'teacher' || ($model->created_by === $user->id || $model->user_id === $user->id)) {
            return Response::allow();
        }

        return Response::deny("Bạn không có quyền {$action} mục này.");
    }
}
