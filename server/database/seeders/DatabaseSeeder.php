<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseReview;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PostSeeder::class,

            ExamPaperSeeder::class,
            ExamQuestionSeeder::class,
            CourseSeeder::class,
            CourseReviewSeeder::class,
            CourseChapterSeeder::class,

            PaymentSeeder::class,

        ]);
    }
}
