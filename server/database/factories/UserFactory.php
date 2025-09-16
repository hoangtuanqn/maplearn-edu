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
            'birth_year'    => fake()->optional()->numberBetween(1970, now()->year - 10),
            'facebook_link' => fake()->optional()->url(),
            'school'        => fake()->optional()->company(),
            'city'          => fake()->optional()->city(),
            // 'role' => fake()->randomElement(['admin', 'student']),
            'role'              => 'student',
            'banned'            => 0,
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
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
