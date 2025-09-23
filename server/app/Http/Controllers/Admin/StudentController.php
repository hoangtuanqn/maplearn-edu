<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\User;
use App\Notifications\PasswordResetNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\QueryBuilder\QueryBuilder;

class StudentController extends BaseApiController
{
    public function index(Request $request)
    {
        // Đã check quyền admin ở middleware
        $limit = (int)($request->limit ?? 10);

        $students = QueryBuilder::for(User::class)
            ->where('role', 'student')
            ->orderBy('id', "desc")
            ->paginate($limit);
        return $this->successResponse($students, "Lấy danh sách học sinh thành công!");
    }

    // Lấy thông tin 1 student
    public function show(Request $request, $id)
    {
        $student = QueryBuilder::for(User::class)

            ->findOrFail($id);
        return $this->successResponse($student, "Lấy thông tin học sinh thành công!");
    }

    // update thông tin
    public function update(Request $request, User $student)
    {
        $student->update($request->validate([
            'avatar'        => 'sometimes|url|max:2048',
            'full_name'     => 'required|string|max:255',
            'phone_number'  => 'sometimes|string|max:20',
            'gender'        => 'sometimes|string|in:male,female,other',
            'birth_year'    => 'sometimes|nullable',
            'school'        => 'sometimes|string|max:255',
            'city'          => 'sometimes|string|max:255',
            'banned'        => 'sometimes|boolean',
            'facebook_link' => 'sometimes|string|max:255',
        ]));

        return $this->successResponse($student, "Cập nhật thông tin thành công!");
    }

    public function resetPassword(Request $request, User $student)
    {
        // reset password mới từ admin
        $data = $request->validate([
            'password' => 'required|string|min:6|max:255',
        ]);

        $student->update([
            'password' => $data['password'],
        ]);

        // Gửi email thông báo cho học sinh về việc đổi mật khẩu (nếu cần)
        $student->notify(new PasswordResetNotification($data['password']));
        return $this->successResponse($student, "Đặt lại mật khẩu thành công!");
    }

    // Get lịch sử hoạt động
    public function activityHistory(Request $request, User $student)
    {
        $limit      = (int)($request->limit ?? 10);
        $activities = $student->activities()->orderBy('id', 'DESC')->paginate($limit);
        return $this->successResponse($activities, "Lấy lịch sử hoạt động thành công!");
    }

    // Import học sinh hàng loạt => truyền lên 1 mảng nhiều học sinh
    public function imports(Request $request)
    {
        $data = $request->validate([
            "error_handling"       => "required|in:strict,partial",
            'data'                 => 'required|array|min:1',
            'data.*.username'      => 'required|string|max:255',
            'data.*.email'         => 'required|email|max:255',
            'data.*.password'      => 'sometimes|min:6|max:255',
            'data.*.full_name'     => 'required|string|max:255',
            'data.*.phone_number'  => 'sometimes|string|max:20',
            'data.*.gender'        => 'sometimes|string|in:male,female,other',
            'data.*.birth_year'    => 'sometimes|nullable',
            'data.*.school'        => 'sometimes|string|max:255',
            'data.*.city'          => 'sometimes|string|max:255',
            'data.*.facebook_link' => 'sometimes|string|max:255',
        ]);

        $errors  = [];
        $success = [];

        if ($data['error_handling'] === 'strict') {
            // Duyệt qua tất cả email hoặc username, xem cái nào đã tồn tại thì dồn vào errors
            // Kiểm tra email đã tồn tại
            $existingEmails = User::whereIn('email', array_column($data['data'], 'email'))->pluck('email')->toArray();
            if ($existingEmails) {
                return $this->errorResponse($existingEmails, "Phát hiện " . count($existingEmails) . " email đã tồn tại", 400);
            }

            // Kiểm tra username đã tồn tại
            $existingUsernames = User::whereIn('username', array_column($data['data'], 'username'))->pluck('username')->toArray();
            if ($existingUsernames) {
                return $this->errorResponse($existingUsernames, "Phát hiện " . count($existingUsernames) . " username đã tồn tại", 400);
            }

            // Strict mode: Tất cả phải thành công hoặc không import gì cả
            DB::beginTransaction();
            try {
                foreach ($data['data'] as $studentData) {
                    // Nếu mật khẩu để trống thì xài mk mặc định: FPTAptech@MapLearn@Edu
                    $studentData['password'] = $studentData['password'] ?? env("PASSWORD_DEFAULT_IMPORT", "FPTAptech@MapLearn@Edu");
                    $student                 = User::create([
                        'username'      => $studentData['username'],
                        'full_name'     => $studentData['full_name'],
                        'email'         => $studentData['email'],
                        'password'      => Hash::make($studentData['password']),
                        'avatar'        => $studentData['avatar']        ?? null,
                        'phone_number'  => $studentData['phone_number']  ?? null,
                        'gender'        => $studentData['gender']        ?? null,
                        'birth_year'    => $studentData['birth_year']    ?? null,
                        'school'        => $studentData['school']        ?? null,
                        'city'          => $studentData['city']          ?? null,
                        'facebook_link' => $studentData['facebook_link'] ?? null,
                        'role'          => 'student',
                    ]);
                    $success[] = [
                        'data'  => $student,
                        'error' => "",
                    ];
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                return $this->errorResponse(null, "Import thất bại: Dữ liệu không hợp lệ hoặc có lỗi trong quá trình thêm mới!");
            }
        } else {
            // Partial mode: Import từng cái, cái nào lỗi thì bỏ qua
            foreach ($data['data'] as $studentData) {
                try {
                    // Nếu mật khẩu để trống thì xài mk mặc định: FPTAptech@MapLearn@Edu
                    $studentData['password'] = $studentData['password'] ?? 'FPTAptech@MapLearn@Edu';
                    $student                 = User::create([
                        'username'      => $studentData['username'],
                        'full_name'     => $studentData['full_name'],
                        'email'         => $studentData['email'],
                        'password'      => Hash::make($studentData['password']),
                        'avatar'        => $studentData['avatar']        ?? null,
                        'phone_number'  => $studentData['phone_number']  ?? null,
                        'gender'        => $studentData['gender']        ?? null,
                        'birth_year'    => $studentData['birth_year']    ?? null,
                        'school'        => $studentData['school']        ?? null,
                        'city'          => $studentData['city']          ?? null,
                        'facebook_link' => $studentData['facebook_link'] ?? null,
                        'role'          => 'student',
                    ]);
                    $success[] = [
                        'data'  => $student,
                        'error' => "",
                    ];
                } catch (\Exception $e) {
                    $errors[] = [
                        'data'  => $studentData,
                        'error' => 'Email hoặc Username đã tồn tại trong hệ thống',
                    ];
                }
            }
        }
        $message = count($success) > 0 ? "Đã thêm " . count($success) . " học sinh vào hệ thống thành công" : "Không có học sinh nào được thêm vào hệ thống";
        return $this->successResponse([
            'success' => $success,
            'errors'  => $errors,
        ], $message);
    }
}
