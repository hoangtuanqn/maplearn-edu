import z from "zod";

// Cập nhật schema để hỗ trợ kiểu File
export const formSchema = z
    .object({
        name: z
            .string()
            .min(15, { message: "Tên khóa học phải có ít nhất 15 ký tự." })
            .max(255, { message: "Tên khóa học không được vượt quá 255 ký tự." }),
        subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
        category: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
        gradeLevel: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
        instructor: z.string().min(1, { message: "Vui lòng chọn giáo viên giảng dạy." }),
        price: z
            .number()
            .min(0, { message: "Giá khóa học phải lớn hơn hoặc bằng 0." })
            .max(5000000, { message: "Giá khóa học phải nhỏ hơn hoặc bằng 5.000.000." }),
        startDate: z.string().min(1, { message: "Vui lòng chọn ngày bắt đầu." }),
        endDate: z.string().optional(),
        prerequisiteCourse: z.string().optional(),
        coverImage: z.instanceof(File).optional(), // Bắt buộc upload file nếu không có URL
        introVideo: z.instanceof(File).optional(), // Bắt buộc upload file nếu không có URL
        description: z
            .string()
            .min(10, { message: "Mô tả khóa học phải có ít nhất 10 ký tự." })
            .max(5000, { message: "Mô tả khóa học không được vượt quá 5000 ký tự." }),
        coverImageUrl: z.string().optional(), // URL của ảnh bìa
        introVideoUrl: z.string().optional(), // URL của video giới thiệu
    })
    .superRefine((data, ctx) => {
        // Kiểm tra nếu không có URL thì yêu cầu upload file cho ảnh bìa
        if (!data.coverImageUrl && !data.coverImage) {
            ctx.addIssue({
                path: ["coverImage"],
                message: "Vui lòng upload ảnh bìa.",
                code: "custom", // Mã lỗi là custom
            });
        }

        // Kiểm tra nếu không có URL thì yêu cầu upload file cho video giới thiệu
        if (!data.introVideoUrl && !data.introVideo) {
            ctx.addIssue({
                path: ["introVideo"],
                message: "Vui lòng upload video giới thiệu.",
                code: "custom", // Mã lỗi là custom
            });
        }
    })
    .refine(
        (data) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(data.startDate);
            return startDate >= today;
        },
        {
            message: "Ngày bắt đầu không được nhỏ hơn ngày hiện tại.",
            path: ["startDate"],
        },
    )
    .refine(
        (data) => {
            const startDate = new Date(data.startDate);
            return startDate.getFullYear() <= 2027;
        },
        {
            message: "Ngày bắt đầu không được lớn hơn năm 2027.",
            path: ["startDate"],
        },
    );
