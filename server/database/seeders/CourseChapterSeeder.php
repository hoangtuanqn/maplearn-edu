<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseChapter;
use App\Models\CourseLesson;
use Illuminate\Database\Seeder;

class CourseChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'toan' => [
            [
                'chapter' => 'Ứng dụng đạo hàm để khảo sát và vẽ đồ thị',
                'lessons' => [
                'Sự đồng biến, nghịch biến của hàm số',
                'Cực trị của hàm số',
                'Giá trị lớn nhất, nhỏ nhất của hàm số',
                'Tiếp tuyến của đồ thị hàm số',
                'Khảo sát và vẽ đồ thị hàm số',
                ],
            ],
            [
                'chapter' => 'Hàm số mũ và hàm số logarit',
                'lessons' => [
                'Lũy thừa, mũ và logarit',
                'Tính chất logarit',
                'Phương trình mũ',
                'Phương trình logarit',
                'Bất phương trình mũ và logarit',
                ],
            ],
            [
                'chapter' => 'Tích phân và ứng dụng',
                'lessons' => [
                'Khái niệm tích phân',
                'Tính chất tích phân',
                'Ứng dụng tính diện tích',
                'Ứng dụng tính thể tích',
                ],
            ],
            ],
            'ly' => [
            [
                'chapter' => 'Dao động cơ',
                'lessons' => [
                'Con lắc lò xo',
                'Con lắc đơn',
                'Dao động tắt dần, dao động cưỡng bức',
                'Tổng hợp dao động điều hòa',
                ],
            ],
            [
                'chapter' => 'Sóng cơ và sóng âm',
                'lessons' => [
                'Sự truyền sóng cơ',
                'Giao thoa sóng',
                'Sóng dừng',
                'Âm học: âm cơ bản, họa âm, cường độ và độ cao',
                ],
            ],
            [
                'chapter' => 'Điện xoay chiều',
                'lessons' => [
                'Mạch điện xoay chiều',
                'Công suất và hệ số công suất',
                'Biến áp và truyền tải điện năng',
                ],
            ],
            ],
            'hoa' => [
            [
                'chapter' => 'Este – Lipit',
                'lessons' => [
                'Tính chất và điều chế este',
                'Ứng dụng của este',
                'Cấu tạo và tính chất của lipit',
                ],
            ],
            [
                'chapter' => 'Cacbohiđrat',
                'lessons' => [
                'Glucozơ – tính chất và ứng dụng',
                'Saccarozơ',
                'Tinh bột và Xenlulozơ',
                ],
            ],
            [
                'chapter' => 'Amino axit – Protein',
                'lessons' => [
                'Cấu tạo amino axit',
                'Tính chất hóa học của amino axit',
                'Cấu tạo và vai trò của protein',
                ],
            ],
            ],
            'sinh' => [
            [
                'chapter' => 'Cơ chế di truyền và biến dị',
                'lessons' => [
                'Cấu trúc và chức năng ADN, ARN',
                'Nhân đôi ADN',
                'Phiên mã – Dịch mã',
                'Đột biến gen',
                ],
            ],
            [
                'chapter' => 'Quy luật di truyền',
                'lessons' => [
                'Các quy luật Menđen',
                'Tương tác gen',
                'Liên kết gen và hoán vị gen',
                ],
            ],
            [
                'chapter' => 'Di truyền quần thể',
                'lessons' => [
                'Cấu trúc di truyền quần thể',
                'Quy luật Hardy-Weinberg',
                'Di truyền học quần thể người',
                ],
            ],
            ],
            'tieng-anh' => [
            [
                'chapter' => 'Unit 1: Home Life',
                'lessons' => [
                'Reading',
                'Speaking',
                'Listening',
                'Writing',
                'Language Focus',
                ],
            ],
            [
                'chapter' => 'Unit 2: Cultural Diversity',
                'lessons' => [
                'Reading',
                'Speaking',
                'Listening',
                'Writing',
                'Language Focus',
                ],
            ],
            [
                'chapter' => 'Unit 3: Ways of Socializing',
                'lessons' => [
                'Reading',
                'Speaking',
                'Listening',
                'Writing',
                'Language Focus',
                ],
            ],
            ],
            'van' => [
            [
                'chapter' => 'Vợ nhặt – Kim Lân',
                'lessons' => [
                'Tác giả – hoàn cảnh sáng tác',
                'Đọc hiểu văn bản',
                'Phân tích nhân vật Tràng và Thị',
                'Giá trị hiện thực và nhân đạo',
                'Luyện tập – vận dụng',
                ],
            ],
            [
                'chapter' => 'Vợ chồng A Phủ – Tô Hoài',
                'lessons' => [
                'Tác giả – tác phẩm',
                'Hình tượng nhân vật Mị',
                'Hình tượng nhân vật A Phủ',
                'Giá trị nghệ thuật – nội dung',
                'Luyện tập – vận dụng',
                ],
            ],
            [
                'chapter' => 'Chiếc thuyền ngoài xa – Nguyễn Minh Châu',
                'lessons' => [
                'Tác giả – hoàn cảnh sáng tác',
                'Đọc hiểu văn bản',
                'Phân tích nhân vật',
                'Giá trị nghệ thuật',
                'Luyện tập – vận dụng',
                ],
            ],
            ],
        ];
        // Giả sử bạn đã có một số Course trong cơ sở dữ liệu
        $courses = Course::all();
        foreach ($courses as $course) {
            $courseSlug = $course->subject;

            if (isset($data[$courseSlug])) {
                foreach ($data[$courseSlug] as $chapterIndex => $chapterData) {
                    $chapter = CourseChapter::create([
                        'course_id' => $course->id,
                        'title'     => $chapterData['chapter'],
                        'position'  => $chapterIndex + 1,
                    ]);

                    foreach ($chapterData['lessons'] as $lessonIndex => $lessonTitle) {
                        CourseLesson::create([
                            'chapter_id' => $chapter->id,
                            'title'      => $lessonTitle,
                            'content'    => 'Học sinh được làm quen với khái niệm cực đại, cực tiểu của hàm số. Bài học trình bày cách dùng đạo hàm bậc nhất và đạo hàm bậc hai để tìm cực trị, cũng như ý nghĩa hình học của chúng. Đây là phần kiến thức quan trọng thường xuyên xuất hiện trong đề thi, có nhiều ứng dụng trong tối ưu hóa và giải quyết các bài toán thực tế.',
                            'position'   => $lessonIndex + 1,
                            'is_free'    => $lessonIndex === 0 || $lessonIndex === 1 ? true : false,
                            'video_url'  => '/video.mp4',
                            'duration'   => 273,
                        ]);
                    }
                }
            }
        }
    }
}
