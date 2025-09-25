<?php

namespace Database\Seeders;

use App\Models\ExamPaper;

use Illuminate\Database\Seeder;

class ExamPaperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo danh sách tên đề thi mẫu
        $examPapers = [
            'KHẢO SÁT CHẤT LƯỢNG THÁNG 8 - KỲ THI TSA - MÔN TOÁN',
            'Đề khảo sát năng lực khóa hè - Nguyễn Khuyến',
            'Đề khảo sát năng lực tư duy khóa hè - Nguyễn Khuyến',
            'Đề khảo sát năng lực hè lần 3 - Nguyễn Khuyến',
            'ĐỀ KHẢO SÁT CHẤT LƯỢNG THÁNG 7 - KỲ THI ĐGNL HSA & V-ACT',
            'Đề kiểm tra chất lượng đầu năm - THPT Nguyễn Khuyến - Bình Dương',
            'Đề khảo sát năng lực tư duy khóa hè - Lê Thành Tông - HCM',
            'Đề khảo sát năng lực tư duy - Lê Thánh Tông - HCM',
            'ĐỀ KHẢO SÁT CHẤT LƯỢNG ĐẦU NĂM KỲ THI ĐGNL HSA & V-ACT',
            'ĐỀ THI THỬ 01 - CÀN QUÉT KIẾN THỨC TOÁN 10&11 - 2K8 XPS',
            'Thi thử - Kì thi Đánh Giá Tư Duy TSA',
            'Đề minh họa môn Hóa - Đề số 3 (Trích trong Sách 30 đề minh họa Hóa 2025)',
            'Đề minh họa môn Hóa - Đề số 2 (Trích trong Sách 30 đề minh họa Hóa 2025)',
            'Đề minh hoạ môn Hóa - Đề số 1 (Trích trong Sách 30 đề minh hoạ Hóa 2025)',
            'Đề minh hoạ môn Toán - Đề số 3 (Trích trong Sách 30 đề minh hoạ Toán 2025)',
            'Đề minh hoạ môn Toán - Đề số 2 (Trích trong Sách 30 đề minh hoạ Toán 2025)',
            'Đề minh hoạ môn Toán - Đề số 1 (Trích trong Sách 30 đề minh hoạ Toán 2025)',
            'Đề minh hoạ môn Vật Lý - Đề số 3 (Trích trong Sách 30 đề minh hoạ Vật Lý 2025)',
            'Đề minh hoạ môn Vật Lý - Đề số 2 (Trích trong Sách 30 đề minh hoạ Vật Lý 2025)',
            'Đề minh hoạ môn Vật Lý - Đề số 1 (Trích trong Sách 30 đề minh hoạ Vật Lý 2025)',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 10',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 10',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 9',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 9',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 8',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 8',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 7',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 6',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 5',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 7',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 6',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực V-ACT - Lần 5',
            'Đề thi khảo sát chất lượng - Kì thi Đánh Giá Năng Lực HSA - Lần 4',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Sinh học',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Hóa học',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Vật lí',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Tiếng Anh',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Ngữ văn',
            'Đề minh họa thi tốt nghiệp THPT 2025 môn Toán',
        ];

        // Sinh thêm đề thi ngẫu nhiên cho đủ 81 đề
        $subjectsForName = [
            'Toán',
            'Vật Lý',
            'Hóa Học',
            'Sinh Học',
            'Tiếng Anh',
            'Ngữ Văn'
        ];
        $examTypes = [
            'Thi thử',
            'Đề kiểm tra',
            'Đề khảo sát',
            'Đề minh họa',
            'Đề ôn tập',
            'Đề luyện tập'
        ];
        $years = [2023, 2024, 2025];
        $schools = [
            'THPT Nguyễn Khuyến',
            'THPT Lê Quý Đôn',
            'THPT Trần Phú',
            'THPT Chuyên Hà Nội',
            'THPT Quốc Học Huế',
            'THPT Bùi Thị Xuân'
        ];

        $count = count($examPapers);
        $maxCount = 200;
        for ($i = $count + 1; $i <= $maxCount; $i++) {
            $subject = $subjectsForName[array_rand($subjectsForName)];
            $type = $examTypes[array_rand($examTypes)];
            $year = $years[array_rand($years)];
            $school = $schools[array_rand($schools)];
            $examPapers[] = "{$type} {$subject} {$school} năm {$year} - Đề số " . ($i - $count);
        }
        $subjects    = ['toan', 'ly', 'hoa', 'sinh', 'tieng-anh', 'van'];
        $gradeLevels = ['dg-td', 'dg-nl', 'lop-12', 'lop-11', 'lop-10'];
        $categories  = ['dgnl-hsa', 'dgnl-v-act', 'dgtd-tsa', 'tot-nghiep-thpt', 'thi-cuoi-ki-1', 'thi-cuoi-ki-2', 'thi-giua-ki-1', 'thi-giua-ki-2'];
        foreach ($examPapers as $key => $paper) {
            $status = ($maxCount - $key) > 81;

            ExamPaper::create([
                'title'            => $paper,
                'user_id'          => 8,
                'max_score'        => 10,
                'duration_minutes' => 120,
                'exam_category'    => $categories[array_rand($categories)],
                'subject'          => $subjects[array_rand($subjects)],
                'grade_level'      => $gradeLevels[array_rand($gradeLevels)],
                'difficulty'       => collect(['easy', 'normal', 'hard', 'very_hard'])->random(),
                'province'         => collect(['Quảng Ngãi', 'Bình Định', 'Hà Nội', 'TP Hồ Chí Minh'])->random(),
                'exam_type'        => collect(['HSA', 'V-ACT', 'TSA', 'THPT', 'OTHER'])->random(),
                'status'           => $status,
                'start_time'       => now()->subDays(rand(0, 28)),
            ]);
        }
    }
}
