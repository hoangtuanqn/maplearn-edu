<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'name'   => "Thầy Vũ Ngọc Anh",
                'image'  => "/assets/images/teachers/thay-vu-ngoc-anh.jpg",
                'bio'    => "Giáo viên dạy Toán với 10 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Toán học",
            ],
            [
                'name'   => "Thầy Nguyễn Anh Phong",
                'image'  => "/assets/images/teachers/thay-nguyen-anh-phong.jpg",
                'bio'    => "Giáo viên dạy Lý với 5 năm kinh nghiệm.",
                "degree" => "Cử nhân Vật lý",
            ],
            [
                'name'   => "Thầy Nguyễn Chí Nhân",
                'image'  => "/assets/images/teachers/thay-nguyen-chi-nhan.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Lam Trường",
                'image'  => "/assets/images/teachers/thay-pham-ngoc-lam-truong.jpg",
                'bio'    => "Giáo viên dạy Toán với 10 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Toán học",
            ],
            [
                'name'   => "Thầy Thành Nam",
                'image'  => "/assets/images/teachers/nguyen-thanh-nam.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Nguyễn Phụ Hoàng Lân",
                'image'  => "/assets/images/teachers/thay-nguyen-phu-hoang-lan.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Đinh Hoàng Tùng",
                'image'  => "/assets/images/teachers/thay-dinh-hoang-tung.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Cô Nguyễn Thị Thanh Thủy",
                'image'  => "/assets/images/teachers/co-nguyen-thi-thanh-thuy.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
                "role"   => "admin",
            ],
            [
                'name'   => "Thầy Vũ Trọng Đạt",
                'image'  => "/assets/images/teachers/thay-nguyen-trong-dat.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Phạm Minh Kiên",
                'image'  => "/assets/images/teachers/thay-pham-minh-kien.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Đăng Tiến Nghĩa",
                'image'  => "/assets/images/teachers/thay-dang-tien-nghia.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Thầy Đặng Tấn Hùng",
                'image'  => "/assets/images/teachers/thay-hung.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            [
                'name'   => "Cô Nguyễn Thị Thu Thảo",
                'image'  => "/assets/images/teachers/co-hien.jpg",
                'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
                "degree" => "Thạc sĩ Hóa học",
            ],
            // [
            //     'username' => 'admin_demo',
            //     'name'   => "Thầy Phạm Hoàng Tuấn",
            //     'image'  => "/assets/images/teachers/co-hien.jpg",
            //     'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
            //     "degree" => "Thạc sĩ Hóa học",
            //     "role"  => 'admin',
            // ],
            // [
            //     'username' => 'teacher_demo',
            //     'name'   => "Thầy Lâm Hoàng An",
            //     'image'  => "/assets/images/teachers/co-hien.jpg",
            //     'bio'    => "Giáo viên dạy Hóa với 8 năm kinh nghiệm.",
            //     "degree" => "Thạc sĩ Hóa học",
            //     "role"   => "teacher",
            // ],
        ];

        $now = Carbon::now();

        $insertData = collect($teachers)->map(function ($teacher, $index) use ($now) {
            // Phân tích giới tính + tên đầy đủ (bỏ "Thầy", "Cô")
            $originalName = $teacher['name'];
            $gender       = 'other';
            $fullName     = $originalName;

            if (Str::startsWith($originalName, 'Thầy')) {
                $gender   = 'male';
                $fullName = Str::replaceFirst('Thầy ', '', $originalName);
            } elseif (Str::startsWith($originalName, 'Cô')) {
                $gender   = 'female';
                $fullName = Str::replaceFirst('Cô ', '', $originalName);
            }

            $username = Str::slug($fullName, '_') . '_' . ($index + 1);

            return [
                'username'      => $teacher['username'] ?? $username,
                'email'         => $username . '@example.com',
                'password'      => bcrypt('password'),
                'facebook_link' => 'https://www.facebook.com/thayhintavungocanh',
                'full_name'     => $fullName,
                'gender'        => $gender,
                'role'          => $teacher['role'] ?? "teacher",
                'bio'           => $teacher['bio'],
                'degree'        => $teacher['degree'],
                'avatar'        => $teacher['image'],
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
        })->toArray();

        User::insert($insertData);

        User::factory(5)->create();
    }
}
