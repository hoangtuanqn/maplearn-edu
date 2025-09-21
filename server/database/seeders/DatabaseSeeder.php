<?php

namespace Database\Seeders;

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
