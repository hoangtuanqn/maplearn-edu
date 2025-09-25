<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username'      => fake()->unique()->userName(),
            'password'      => static::$password ??= Hash::make('password'),
            'full_name'     => fake()->name(),
            'email'         => fake()->unique()->safeEmail(),
            'phone_number'  => fake()->unique()->numerify('0##########'),
            'gender'        => fake()->randomElement(['male', 'female', 'other']),
            'avatar'        => 'https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755729796/avatars/ccrlg1hkjtc6dyeervsv.jpg',
            'birth_year'    => fake()->optional()->numberBetween(1995, 2013),
            'facebook_link' => fake()->optional()->url(),
            'school'        => fake()->optional()->company(),
            'city' => fake()->randomElement([
                "An Giang",
                "Bắc Ninh",
                "Cao Bằng",
                "Cà Mau",
                "Gia Lai",
                "Hà Tĩnh",
                "Hưng Yên",
                "Khánh Hòa",
                "Lai Châu",
                "Lào Cai",
                "Lâm Đồng",
                "Lạng Sơn",
                "Nghệ An",
                "Ninh Bình",
                "Phú Thọ",
                "Quảng Ngãi",
                "Quảng Ninh",
                "Quảng Trị",
                "Sơn La",
                "Thanh Hóa",
                "Thành phố Cần Thơ",
                "Thành phố Huế",
                "Thành phố Hà Nội",
                "Thành phố Hải Phòng",
                "Thành phố Hồ Chí Minh",
                "Thành phố Đà Nẵng",
                "Thái Nguyên",
                "Tuyên Quang",
                "Tây Ninh",
                "Vĩnh Long",
                "Điện Biên",
                "Đắk Lắk",
                "Đồng Nai",
                "Đồng Tháp",
            ]),
            // 'role' => fake()->randomElement(['admin', 'student']),
            'role'              => 'student',
            'banned'            => 0,
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
            'created_at'        => now()->subDays(rand(0, 60)),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
