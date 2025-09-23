<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Course::factory(200)->create();
        // Subject
        // 1. Toán
        // 2. Lý
        // 3. Sinh
        // 4. Anh
        // 5. Hóa
        // 6. Văn

        // Course Categories
        // 1. 2K8 - Xuất phát sớm lớp 12
        // 2. 2K9 - Xuất phát sớm lớp 11
        // 3. 2K10 - Xuất phát sớm lớp 10
        // 4. Học tốt sách giáo khoa
        // 5. Khóa học Trung học cơ sở

        // Grade Levels
        // 1. DGTD
        // 2. DGNL
        // 3. Lớp 12
        // 4. Lớp 11
        // 5. Lớp 10
        $data = [
            // Toán | DGNL
            [
                'name'        => 'SÁCH 10 ĐỀ THỰC CHIẾN KỲ THI ĐÁNH GIÁ NĂNG LỰC HSA 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/zz66z6w012wn/10-de-thuc-chien-ky-thi-danh-gia-nang-luc-hsa-2025-1734515065256.png',
                'grade_level' => 2, // DGNL
                'subject'     => 1, // Toán
                'category_id' => 1, // 2K8 - Xuất phát sớm lớp 12
                'user_id'     => 1, // Tổ toán
            ],
            [
                'name'        => 'SÁCH 10 ĐỀ THỰC CHIẾN KỲ THI ĐÁNH GIÁ NĂNG LỰC V-ACT 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/0qgd7fh055o7/sach-10-de-thuc-chien-ky-thi-danh-gia-nang-luc-vact-2025-1736164738781.png',
                'grade_level' => 2,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ LUYỆN THI ĐÁNH GIÁ NĂNG LỰC ĐHQG TP.HCM (V-ACT) - 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymgc0vg014yj/khoa-luyen-thi-danh-gia-nang-luc-dhqg-tphcm-v-act---2026-1751535757073.png',
                'grade_level' => 2,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ LUYỆN THI ĐÁNH GIÁ NĂNG LỰC ĐHQG HÀ NỘI (HSA) - 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymgck3e0150c/khoa-luyen-thi-danh-gia-nang-luc-dhqg-ha-noi-hsa---2026-1751535748754.png',
                'grade_level' => 2,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ LUYỆN THI ĐÁNH GIÁ TƯ DUY BÁCH KHOA (TSA) - 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymrbg9b01f36/khoa-luyen-thi-danh-gia-tu-duy-bach-khoa-tsa---2026-1751535739974.png',
                'grade_level' => 2,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],

            // Toán | Lớp 12 | 2K8
            [
                'name'        => 'TỔNG ÔN TOÀN DIỆN 360 ĐỘ - TOÁN 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png',
                'grade_level' => 3, // Lớp 12
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH 30 ĐỀ MINH HOẠ MÔN TOÁN 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3witkvc00r9d/sach-30-de-minh-hoa-mon-toan-2025-1743062005992.png',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ NGUYÊN HÀM TÍCH PHÂN - TOÁN 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82nnoy700900/sach-phong-toa-nguyen-ham-tich-phan-1752140055823.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ HÀM SỐ - TOÁN 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82nmvoq0092l/sach-phong-toa-ham-so-toan-12-1752140017898.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN TOÁN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5u6fl00qqf/khoa-i---chuyen-de-co-ban-mon-toan-nam-2026-1731491326169.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ M - VẬN DỤNG VÀ VẬN DỤNG CAO MÔN TOÁN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5telu00qod/khoa-m---van-dung-va-van-dung-cao-mon-toan-nam-2026-1731491338912.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ O - THỰC CHIẾN LUYỆN ĐỀ MÔN TOÁN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5skv600qm1/khoa-o---thuc-chien-luyen-de-mon-toan-nam-2026-1731491349464.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],
            [
                'name'        => 'KHOÁ E - TỔNG ÔN TRỌNG ĐIỂM MÔN TOÁN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/yl5s2oh00qjv/khoa-e---tong-on-trong-diem-mon-toan-nam-2026-1731491360228.jpg',
                'grade_level' => 3,
                'subject'     => 1,
                'category_id' => 1,
                'user_id'     => 1,
            ],

            // Lý | Lớp 12 | 2K8
            [
                'name'        => 'SÁCH 100 ĐỀ VẬT LÝ CÁC TRƯỜNG SỞ 2025 - BẮC TRUNG NAM - TẬP 3',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/5j2modv005f9/sach-100-de-vat-li-cac-truong-so-2025---bac-trung-nam---tap-3-1746602314483.png',
                'grade_level' => 3,
                'subject'     => 2, // Lý
                'category_id' => 1,
                'user_id'     => 3, // Tổ Vật lý
            ],
            [
                'name'        => 'SÁCH 100 ĐỀ VẬT LÝ CÁC TRƯỜNG SỞ 2025 - BẮC TRUNG NAM - TẬP 2',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/43wa31d00stj/sach-100-de-vat-li-cac-truong-so-2025---bac-trung-nam---tap-2-1743507874273.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH 30 ĐỀ MINH HOẠ MÔN VẬT LÝ 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3vcy3yf00k4r/30-de-minh-hoa-mon-vat-ly-2025-1742991673479.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'CÀY LÍ THUYẾT 360 ĐỘ - VẬT LÝ 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/2o7q0yd00ifw/cay-li-thuyet-360-vat-li-lop-12-1740382852693.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH 100 ĐỀ VẬT LÝ CÁC TRƯỜNG SỞ 2025 - BẮC TRUNG NAM - TẬP 1',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/0vzzjqu07w3u/sach-100-de-vat-li-cac-truong-so-2025---bac-trung-nam---tap-1-1736500024758.jpg',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH 45 MÔ HÌNH VẬT LÝ THỰC TẾ',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/05zaxmn02ocl/sach-45-mo-hinh-vat-li-thuc-te-1734927508836.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY TỪ TRƯỜNG VÀ HẠT NHÂN',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/wohur3e041cp/lap-trinh-tu-duy-tu-truong-va-hat-nhan-1727339175338.jpg',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY KHÍ LÍ TƯỞNG',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/v5wh8gz04978/lap-trinh-tu-duy-khi-li-tuong-1724040997418.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY VẬT LÝ NHIỆT',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/v5wfzy604955/lap-trinh-tu-duy-vat-ly-nhiet-1724041015676.png',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'Chinh phục đồ thị dao động cơ - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/tdx7jp400awu/chinh-phuc-do-thi-dao-dong-co---2025-1720169491576.jpg',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => '369 BÀI TOÁN DAO ĐỘNG CƠ KINH ĐIỂN - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/szh8xx800tse/369-bai-toan-dao-dong-co-kinh-dien---2025-1719296156348.jpg',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH NHẬP MÔN NHIỆT HỌC - VẬT LÝ 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/rlx8t4608n4b/sach-nhap-mon-nhiet-hoc---vat-ly-12-1716299715174.jpg',
                'grade_level' => 3,
                'subject'     => 2,
                'category_id' => 1,
                'user_id'     => 3,
            ],

            // Sinh | Lớp 12 | 2K8
            [
                'name'        => 'SÁCH 30 ĐỀ MINH HOẠ MÔN SINH 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/4848mr3015na/sach-30-de-minh-hoa-mon-sinh-2025-1743763108143.png',
                'grade_level' => 3,
                'subject'     => 3, // Sinh
                'category_id' => 1,
                'user_id'     => 5, // Tổ Sinh
            ],
            [
                'name'        => 'KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN SINH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg77fe014oy/khoa-i---chuyen-de-co-ban-mon-sinh-nam-2026-1731569029466.png',
                'grade_level' => 3,
                'subject'     => 3,
                'category_id' => 1,
                'user_id'     => 5,
            ],
            [
                'name'        => 'KHOÁ M - VẬN DỤNG VÀ VẬN DỤNG CAO MÔN SINH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg6u7o014ly/khoa-m---van-dung-va-van-dung-cao-mon-sinh-nam-2026-1731569012340.png',
                'grade_level' => 3,
                'subject'     => 3,
                'category_id' => 1,
                'user_id'     => 5,
            ],
            [
                'name'        => 'KHOÁ O - THỰC CHIẾN LUYỆN ĐỀ MÔN SINH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg64qw014ia/khoa-o---thuc-chien-luyen-de-mon-sinh-nam-2026-1731568979336.png',
                'grade_level' => 3,
                'subject'     => 3,
                'category_id' => 1,
                'user_id'     => 5,
            ],
            [
                'name'        => 'KHOÁ E - TỔNG ÔN TRỌNG ĐIỂM MÔN SINH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg5moz014ge/khoa-e---tong-on-trong-diem-mon-sinh-nam-2026-1731568955939.png',
                'grade_level' => 3,
                'subject'     => 3,
                'category_id' => 1,
                'user_id'     => 5,
            ],

            // Ngoại ngữ (Anh) | Lớp 12 | 2K8
            [
                'name'        => 'SÁCH 30 ĐỀ MINH HOẠ MÔN TIẾNG ANH 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/48499of0151c/sach-30-de-minh-hoa-mon-tieng-anh-2025-1743763137856.png',
                'grade_level' => 3,
                'subject'     => 4, // Anh
                'category_id' => 1,
                'user_id'     => 9, // Tổ ngoại ngữ
            ],
            [
                'name'        => 'CHINH PHỤC NGỮ PHÁP TIẾNG ANH - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx2cx740072s/chinh-phuc-ngu-phap-tieng-anh---2025-1719150215441.png',
                'grade_level' => 3,
                'subject'     => 4,
                'category_id' => 1,
                'user_id'     => 9,
            ],
            [
                'name'        => 'KHOÁ I - NGỮ PHÁP ỨNG DỤNG MÔN TIẾNG ANH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg9b4v014wa/khoa-i---chuyen-de-co-ban-mon-tieng-anh-nam-2026-1731569127583.png',
                'grade_level' => 3,
                'subject'     => 4,
                'category_id' => 1,
                'user_id'     => 9,
            ],
            [
                'name'        => 'KHOÁ M - VẬN DỤNG VÀ VẬN DỤNG CAO MÔN TIẾNG ANH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg8rfl014uw/khoa-m---van-dung-va-van-dung-cao-mon-tieng-anh-nam-2026-1731569102049.png',
                'grade_level' => 3,
                'subject'     => 4,
                'category_id' => 1,
                'user_id'     => 9,
            ],
            [
                'name'        => 'KHOÁ O - THỰC CHIẾN LUYỆN ĐỀ MÔN TIẾNG ANH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg88k4014sk/khoa-o---thuc-chien-luyen-de-mon-tieng-anh-nam-2026-1731569077588.png',
                'grade_level' => 3,
                'subject'     => 4,
                'category_id' => 1,
                'user_id'     => 9,
            ],
            [
                'name'        => 'KHOÁ E - TỔNG ÔN TRỌNG ĐIỂM MÔN TIẾNG ANH NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ymg7s0z014qo/khoa-e---tong-on-trong-diem-mon-tieng-anh-nam-2026-1731569056163.png',
                'grade_level' => 3,
                'subject'     => 4,
                'category_id' => 1,
                'user_id'     => 9,
            ],

            // Hóa | Lớp 12 | 2K8
            [
                'name'        => 'CÀY LÍ THUYẾT 360 ĐỘ - HÓA HỌC 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/4kw4b1z028im/cay-li-thuyet-360-do-hoa-hoc-lop-12-1744535529719.png',
                'grade_level' => 3,
                'subject'     => 5, // Hóa
                'category_id' => 1,
                'user_id'     => 4, // Tổ hóa
            ],
            [
                'name'        => 'SÁCH 30 ĐỀ MINH HOẠ MÔN HOÁ - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/132wxlx0d8qf/sach-30-de-minh-hoa-mon-hoa-1736928204837.png',
                'grade_level' => 3,
                'subject'     => 5,
                'category_id' => 1,
                'user_id'     => 4,
            ],

            // Văn | Lớp 12 | 2K8
            [
                'name'        => 'KHOÁ I - CHUYÊN ĐỀ CƠ BẢN NGỮ VĂN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7g0619103gre/khoa-i---chuyen-de-co-ban-ngu-van-nam-2026-1750770344917.jpg',
                'grade_level' => 3,
                'subject'     => 6, // Văn
                'category_id' => 1,
                'user_id'     => 2, // Tổ văn
            ],
            [
                'name'        => 'KHOÁ M - VẬN DỤNG VÀ VẬN DỤNG CAO NGỮ VĂN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7g059u003j53/khoa-m---van-dung-va-van-dung-cao-ngu-van-nam-2026-1750770309384.jpg',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 1,
                'user_id'     => 2,
            ],
            [
                'name'        => 'KHOÁ O - THỰC CHIẾN LUYỆN ĐỀ MÔN NGỮ VĂN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7g047un03j38/khoa-o---thuc-chien-luyen-de-mon-ngu-van-nam-2026-1750770260160.jpg',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 1,
                'user_id'     => 2,
            ],
            [
                'name'        => 'KHOÁ E - TỔNG ÔN TRỌNG ĐIỂM NGỮ VĂN NĂM 2026',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7g02v3203go0/khoa-e---tong-on-trong-diem-ngu-van-nam-2026-1750770196958.jpg',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 1,
                'user_id'     => 2,
            ],

            // Toán | Lớp 11 | 2K9
            [
                'name'        => 'LẬP TRÌNH TƯ DUY TOÁN HỌC 11 - TẬP 2 - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx39bn00095s/lap-trinh-tu-duy-toan-hoc-11---tap-2---2025-1719151727149.jpg',
                'grade_level' => 4,
                'subject'     => 1,
                'category_id' => 2,
                'user_id'     => 1,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY TOÁN HỌC 11 - TẬP 1 - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx37k000092o/lap-trinh-tu-duy-toan-hoc-11---tap-1---2025-1724141697498.jpg',
                'grade_level' => 4,
                'subject'     => 1,
                'category_id' => 2,
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ TOÁN HỌC 11 - TẬP 1 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82np384009jo/sach-phong-toa-toan-hoc-11---tap-1-1752140372881.jpg',
                'grade_level' => 4, // Lớp 11
                'subject'     => 1,
                'category_id' => 2, // 2K9 - Xuất phát sớm lớp 11
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ TOÁN HỌC 11 - TẬP 2 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82nolao009bc/sach-phong-toa-toan-hoc-11---tap-2-1752140360846.jpg',
                'grade_level' => 4,
                'subject'     => 1,
                'category_id' => 2,
                'user_id'     => 1,
            ],
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN TOÁN - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3sdbeif008ax/2k9-xuat-phat-som-mon-toan---lop-11-1751951377677.png',
                'grade_level' => 4,
                'subject'     => 1,
                'category_id' => 2,
                'user_id'     => 1,
            ],

            // Lý | Lớp 11 | 2K9
            [
                'name'        => 'SÁCH PHONG TOẢ VẬT LÝ 11 - TẬP 1 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82ntawk009k7/sach-phong-toa-vat-li-11---tap-1-nam-hoc-2025-2026-1752140317556.png',
                'grade_level' => 4,
                'subject'     => 2,
                'category_id' => 2,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ VẬT LÝ 11 - TẬP 2 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82nsnz000934/sach-phong-toa-vat-li-11---tap-2-nam-hoc-2025-2026-1752140287836.png',
                'grade_level' => 4,
                'subject'     => 2,
                'category_id' => 2,
                'user_id'     => 3,
            ],
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN VẬT LÝ - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3od8kft00rtd/2k9-xuat-phat-som-mon-vat-ly---lop-11-1751535797754.png',
                'grade_level' => 4,
                'subject'     => 2,
                'category_id' => 2,
                'user_id'     => 3,
            ],

            // Sinh | Lớp 11 | 2K9
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN SINH HỌC - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3sddgc2007we/2k9-xuat-phat-som-mon-sinh-hoc---lop-11-1751535820575.png',
                'grade_level' => 4,
                'subject'     => 3,
                'category_id' => 2,
                'user_id'     => 5,
            ],

            // Anh | Lớp 11 | 2K9
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN TIẾNG ANH - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3sddw0g008b0/2k9-xuat-phat-som-mon-tieng-anh---lop-11-1751535827405.png',
                'grade_level' => 4,
                'subject'     => 4,
                'category_id' => 2,
                'user_id'     => 9,
            ],

            // Hóa | Lớp 11 | 2K9
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN HOÁ HỌC - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3sdcrl900894/2k9-xuat-phat-som-mon-hoa-hoc---lop-11-1751535814056.png',
                'grade_level' => 4,
                'subject'     => 5,
                'category_id' => 2,
                'user_id'     => 4,
            ],

            // Văn | Lớp 11 | 2K9
            [
                'name'        => '2K9 XUẤT PHÁT SỚM MÔN NGỮ VĂN - LỚP 11',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/3sdeiab007e2/2k9-xuat-phat-som-mon-ngu-van---lop-11-1751535835274.png',
                'grade_level' => 4,
                'subject'     => 6,
                'category_id' => 2,
                'user_id'     => 2,
            ],

            // Toán | Lớp 10 | 2K10
            [
                'name'        => 'LẬP TRÌNH TƯ DUY TOÁN HỌC 10 - HÌNH HỌC - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx33ew6008w9/lap-trinh-tu-duy-toan-hoc-10---hinh-hoc---2025-1719151451430.png',
                'grade_level' => 5,
                'subject'     => 1,
                'category_id' => 3,
                'user_id'     => 1,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY TOÁN HỌC 10 - ĐẠI SỐ - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx32ogp008vk/lap-trinh-tu-duy-toan-hoc-10---dai-so---2025-1719151417177.png',
                'grade_level' => 5,
                'subject'     => 1,
                'category_id' => 3,
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ TOÁN HỌC 10 - TẬP 1 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82okns000a4u/sach-phong-toa-toan-hoc-10---tap-1-nam-hoc-2025-2026-1753269100466.jpg',
                'grade_level' => 5, // Lớp 10
                'subject'     => 1,
                'category_id' => 3, // 2K10 - Xuất phát sớm lớp 10
                'user_id'     => 1,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ TOÁN HỌC 10 - TẬP 2 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/82ok833009es/sach-phong-toa-toan-hoc-10---tap-2-nam-hoc-2025-2026-1753269113535.jpg',
                'grade_level' => 5,
                'subject'     => 1,
                'category_id' => 3,
                'user_id'     => 1,
            ],
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN TOÁN - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7or22u204ys7/2k10-xuat-phat-som-mon-toan---lop-10-1751951448854.png',
                'grade_level' => 5,
                'subject'     => 1,
                'category_id' => 3,
                'user_id'     => 1,
            ],
            [
                'name'        => 'Học tốt Toán 9 - Từ cơ bản đến nâng cao',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/tcmcwe8001g7/tu-co-ban-toi-nang-cao-toan-9-1720090799360.jpg',
                'grade_level' => 5,
                'subject'     => 1,
                'category_id' => 5, // Khóa học Trung học cơ sở
                'user_id'     => 1,
            ],

            // Lý | Lớp 10 | 2K10
            [
                'name'        => 'PHONG TOẢ VẬT LÝ LỚP 10 - TẬP 2',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ypcofc200npk/phong-toa-vat-ly-lop-10---tap-2-1731744512930.jpg',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => 'PHONG TOẢ VẬT LÝ LỚP 10 - TẬP 1',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ypcnybq00nnh/phong-toa-vat-ly-lop-10---tap-1-1731744490886.jpg',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY VẬT LÝ 10 - TẬP 2 - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx0zpy80053i/lap-trinh-tu-duy-vat-ly-10---tap-2---2025-1719147919904.png',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => 'LẬP TRÌNH TƯ DUY VẬT LÝ 10 - TẬP 1 - 2025',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/sx0z8v50052c/lap-trinh-tu-duy-vat-ly-10---tap-1---2025-1719147897761.png',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ VẬT LÝ 10 - TẬP 1 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/8lbukgf00c1e/sach-phong-toa-vat-li-10---tap-1-nam-hoc-2025-2026-1753269567496.jpg',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => 'SÁCH PHONG TOẢ VẬT LÝ 10 - TẬP 2 (NĂM HỌC 2025-2026)',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/8lbu1ui018vl/sach-phong-toa-vat-li-10---tap-2-nam-hoc-2025-2026-1753269578162.jpg',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN VẬT LÝ - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7or2ool04jes/2k10-xuat-phat-som-mon-vat-ly---lop-10-1751951434135.png',
                'grade_level' => 5,
                'subject'     => 2,
                'category_id' => 3,
                'user_id'     => 3,
            ],

            // Sinh | Lớp 10 | 2K10
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN SINH HỌC - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7or14dv04ot5/2k10-xuat-phat-som-mon-sinh-hoc---lop-10-1751951414719.png',
                'grade_level' => 5,
                'subject'     => 3,
                'category_id' => 3,
                'user_id'     => 5,
            ],

            // Anh | Lớp 10 | 2K10
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN TIẾNG ANH - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7or0dqp04yha/2k10-xuat-phat-som-mon-tieng-anh---lop-10-1751951394590.png',
                'grade_level' => 5,
                'subject'     => 4,
                'category_id' => 3,
                'user_id'     => 9,
            ],

            // Hóa | Lớp 10 | 2K10
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN HOÁ HỌC - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7or1kwn04td7/2k10-xuat-phat-som-mon-hoa-hoc---lop-10-1751951423857.png',
                'grade_level' => 5,
                'subject'     => 5,
                'category_id' => 3,
                'user_id'     => 4,
            ],

            // Văn | Lớp 10 | 2K10
            [
                'name'        => '2K10 XUẤT PHÁT SỚM MÔN NGỮ VĂN - LỚP 10',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7oqzfhw04tbh/2k10-xuat-phat-som-mon-ngu-van---lop-10-1751951405246.png',
                'grade_level' => 5,
                'subject'     => 6,
                'category_id' => 3,
                'user_id'     => 2,
            ],

            // Học tốt sách giáo khoa | Toán | Lớp 12
            [
                'name'        => 'Học tốt Sách Giáo Khoa Ngữ Văn 12',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/8v5js7e006pb/hoc-sgk-ngu-van-12-1753863159434.jpg',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 4, // Học tốt sách giáo khoa
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 12 - Sách Giáo Khoa Kết Nối Tri Thức',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ov9rhj000luh/hoc-tot-ngu-van-12---sach-giao-khoa-ket-noi-tri-thuc-1750670403890.png',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 12 - Sách Giáo Khoa Cánh Diều',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ov9ubyn00lw2/hoc-tot-ngu-van-12---sach-giao-khoa-canh-dieu-1750670423458.png',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 12 - Sách Giáo Khoa Chân Trời Sáng Tạo',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/ov9ssrk00lvh/hoc-tot-ngu-van-12---sach-giao-khoa-chan-troi-sang-tao-1750670435737.png',
                'grade_level' => 3,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 11 - Sách Giáo Khoa Kết Nối Tri Thức',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/qnbrv4t00wa2/hoc-tot-ngu-van-11---sach-giao-khoa-ket-noi-tri-thuc-1750670502723.png',
                'grade_level' => 4,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 11 - Sách Giáo Khoa Cánh Diều',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/qnbu37m00wce/hoc-tot-ngu-van-11---sach-giao-khoa-canh-dieu-1750670524083.png',
                'grade_level' => 4,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 11 - Sách Giáo Khoa Chân Trời Sáng Tạo',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7eckx1j03g50/hoc-tot-ngu-van-11---sach-giao-khoa-chan-troi-sang-tao-1750670262343.png',
                'grade_level' => 4,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 10 - Sách Giáo Khoa Kết Nối Tri Thức',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/qrz38nw02asn/hoc-tot-ngu-van-10---sach-giao-khoa-ket-noi-tri-thuc-1750670557379.png',
                'grade_level' => 5,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 10 - Sách Giáo Khoa Cánh Diều',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7e0ysoa032ms/hoc-tot-ngu-van-10---sach-giao-khoa-canh-dieu-1750670572555.png',
                'grade_level' => 5,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
            [
                'name'        => 'Học tốt Ngữ Văn 10 - Sách Giáo Khoa Chân Trời Sáng Tạo',
                'thumbnail'   => 'https://mapstudy.sgp1.digitaloceanspaces.com/course/7bgdv5302u02/hoc-tot-ngu-van-10---sach-giao-khoa-chan-troi-sang-tao-1750670586913.png',
                'grade_level' => 5,
                'subject'     => 6,
                'category_id' => 4,
                'user_id'     => 2,
            ],
        ];
        $faker      = \Faker\Factory::create();
        $subjects   = ['toan', 'ly',  'sinh', 'tieng-anh', 'hoa', 'van'];
        $gradeLevel = ['dg-td', 'dg-nl', 'lop-12', 'lop-11', 'lop-10'];
        $categories = ['2k8-xuat-phat-som-lop-12', '2k9-xuat-phat-som-lop-11', '2k10-xuat-phat-som-lop-10', 'hoc-tot-sach-giao-khoa', 'khoa-hoc-trung-hoc-co-so'];
        foreach ($data as $item) {
            Course::create([
                'name'        => $item['name'],
                'thumbnail'   => $item['thumbnail'],
                'grade_level' => $gradeLevel[$item['grade_level'] - 1],
                'subject'     => $subjects[$item['subject'] - 1],
                'category'    => $categories[$item['category_id'] - 1],
                'user_id'     => $item['user_id'],
                'price'       => $faker->numberBetween(100, 400) * 1000,
                'description' => 'Khóa học được thiết kế nhằm cung cấp cho học sinh nền tảng kiến thức vững chắc, hệ thống hóa toàn bộ nội dung trọng tâm theo chương trình chuẩn, kết hợp với phương pháp học hiệu quả giúp rèn luyện tư duy, nâng cao kỹ năng làm bài và tự tin chinh phục các kỳ thi quan trọng như thi học kỳ, thi chuyển cấp hay kỳ thi THPT Quốc gia.',
                'intro_video' => '/video.mp4',
                'start_date'  => $faker->dateTimeBetween('-1 month', '+1 month'),
                'end_date'    => $faker->dateTimeBetween('+2 months', '+6 months'),
                'status'      => 1,
                'exam_paper_id' => 39
            ]);
        }
    }
}
