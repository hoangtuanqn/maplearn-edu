<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $realPosts = [
            [
                'title'     => 'Gợi ý đáp án môn Toán tốt nghiệp THPT ',
                'thumbnail' => 'https://mapstudy.sgp1.digitaloceanspaces.com/blog/7a057s902und/7hatq8803p2l-1750848712712.png',
                'subject'   => 'toan',
            ],
            [
                'title'     => 'Gợi ý đáp án môn Hoá Học tốt nghiệp THPT ',
                'thumbnail' => 'https://mapstudy.sgp1.digitaloceanspaces.com/blog/7a0d62t02mdp/7hat6xi0419y-1750848687702.png',
                'subject'   => 'hoa',
            ],
            [
                'title'     => 'Gợi ý đáp án môn Vật Lý tốt nghiệp THPT ',
                'thumbnail' => 'https://mapstudy.sgp1.digitaloceanspaces.com/blog/7a0e2zr02ujf/7hasxl303w2q-1750848675591.png',
                'subject'   => 'ly',
            ],
            [
                'title'     => 'Gợi ý đáp án môn Tiếng Anh tốt nghiệp THPT ',
                'thumbnail' => 'https://mapstudy.sgp1.digitaloceanspaces.com/blog/7a0f2ev02hmv/7hasmqx03xfi-1750848661545.png',
                'subject'   => 'tieng-anh',
            ],
            [
                'title'     => 'Gợi ý đáp án môn Toán tốt nghiệp THPT ',
                'thumbnail' => 'https://mapstudy.sgp1.digitaloceanspaces.com/blog/sn4cz9w00ew1/sse7ts8006kv-1718867802248.jpg',
                'subject'   => 'toan',
            ],
        ];

        $real = $this->faker->randomElement($realPosts);

        $year = rand(2015, 2025);
        return [
            // 'slug' => $this->faker->slug(),
            'title'   => $real['title'] .  $year,
            'content' => collect(range(5, 10))->map(function () {
                return '<p>' . $this->faker->paragraph() . '</p>';
            })->implode("\n"),
            'thumbnail' => $real['thumbnail'],
            // random id trong subject ngẫu nhiên

            'subject' => $real['subject'],
            // random ngẫu nhiên từ năm  $year  đến 2025
            'created_at' => $this->faker->dateTimeBetween($year . '-01-01', now()),
            'views'      => rand(10000, 300000),
            'updated_at' => now(),
            'created_by' => 1,
        ];
    }
}
