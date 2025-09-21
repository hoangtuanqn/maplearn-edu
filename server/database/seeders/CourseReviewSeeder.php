<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseReview;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comments = [
            'Môn Toán giải thích rất dễ hiểu, từ cơ bản đến nâng cao',
            'Thầy cô giảng Vật lý rất hay, công thức được giải thích kỹ lưỡng',
            'Khóa học Hóa học giúp em hiểu rõ các phản ứng và cân bằng',
            'Môn Sinh học được trình bày sinh động, dễ nhớ',
            'Lớp ôn thi THPT Quốc gia rất bổ ích và hiệu quả',
            'Giáo viên nhiệt tình, giải đáp thắc mắc rất tận tình',
            'Điểm số của em đã cải thiện đáng kể sau khi học',
            'Phương pháp giảng dạy phù hợp với học sinh trung bình',
            'Các bài tập được chọn lọc kỹ, từ dễ đến khó',
            'Em đã tự tin hơn khi làm đề thi Toán',
            'Môn Văn được giảng dạy rất cảm hứng và sáng tạo',
            'Lịch sử và Địa lý được trình bày một cách logic',
            'Tiếng Anh giao tiếp và ngữ pháp đều được chú trọng',
            'Thầy cô rất kiên nhẫn với những em học chậm',
            'Tài liệu học tập đầy đủ và chất lượng cao',
            'Phòng học được trang bị đầy đủ thiết bị hiện đại',
            'Giờ học luôn sôi nổi và không bao giờ buồn chán',
            'Em đã vượt qua được nỗi sợ môn Hóa học',
            'Các thí nghiệm Vật lý rất thú vị và dễ hiểu',
            'Phương pháp học tập hiệu quả được chia sẻ rất hữu ích',
            'Đề cương ôn tập được cung cấp đầy đủ và chi tiết',
            'Môi trường học tập tích cực và thân thiện',
            'Em đã đạt được mục tiêu điểm số đề ra',
            'Khóa học giúp em chuẩn bị tốt cho kỳ thi đại học',
            'Rất hài lòng với chất lượng giảng dạy tại đây',
        ];
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 200; $i++) {
            CourseReview::create([
                'course_id' => Course::inRandomOrder()->first()->id,
                'user_id'   => User::where('role', 'student')->inRandomOrder()->first()->id,
                'rating'    => rand(2, 5),
                'comment'   => $faker->randomElement($comments),
            ]);
        }
    }
}
