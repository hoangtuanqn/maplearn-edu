<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Api\BaseApiController;
use App\Models\Course;
use App\Models\CourseReview;
use App\Models\ExamAttempt;
use App\Models\ExamPaper;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends BaseApiController
{

    public function getDashboardData(Request $request)
    {
        $user = $request->user();
        // Validate start_date và end_date nếu có
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $data = [
            // số khóa học đang giảng dạy
            'total_courses'       => $this->getTotalCourses($user),
            // số học viên đang theo học
            'total_students'      => $this->getTotalStudents($user),

            // số đề thi đã tạo
            'total_exams'         => $this->getTotalExams($user),

            // thu thập tháng này
            'total_in_this_month' => $this->getTotalInThisMonth($startDate, $endDate),

            // top khóa học phổ biến ( nhiều sinh viên đăng ký )
            'top_courses'         => $this->getTopCourses($user),

            // top khóa học ít phổ biến
            'least_popular_courses' => $this->getLeastPopularCourses($user),

            // học sinh mới đăng ký khóa học
            'top_4_new_students'        => $this->getTop4NewStudents($user),

            // 4 feedback mới nhất
            'new_feedbacks'      => $this->getNewFeedbacks($user),

            // Thống kê phân bố học viên theo khóa học
            'students_per_course' => $this->getStudentsPerCourse($user),

            // 4 lượt nộp bài thi gần nhất
            'recent_exam_submissions' => $this->getRecentExamSubmissions($user),

        ];
        return $this->successResponse($data, 'Lấy dữ liệu dashboard thành công');
    }



    private function getTotalCourses(User $user): int
    {
        // Nếu có start_date và end_date thì filter theo khoảng thời gian đó
        return Course::where('user_id', $user->id)->count();
    }

    private function getTotalStudents(User $user): int
    {
        // lọc ra id của các khóa học do teacher này tạo
        $courseIds = Course::where('user_id', $user->id)->pluck('id');

        // lặp qua payment (lịch sử mua đã dc thanh toán)
        return Payment::whereIn('course_id', $courseIds)->where('status', 'paid')->distinct('user_id')->count('user_id');
    }

    private function getTotalExams(User $user): int
    {
        return ExamPaper::where('user_id', $user->id)->count();
    }

    private function getTotalInThisMonth($startDate = null, $endDate = null): int
    {
        // Nếu không truyền start_date và end_date thì filter trong tháng hiện tại
        if (!$startDate || !$endDate) {
            $startOfMonth = now()->startOfMonth();
            $endOfMonth = now()->endOfMonth();
            return Payment::where('status', 'paid')
                ->whereBetween('paid_at', [$startOfMonth, $endOfMonth])
                ->sum('amount');
        }

        // Nếu có start_date và end_date thì filter theo khoảng thời gian đó
        return Payment::where('status', 'paid')
            ->whereBetween('paid_at', [$startDate, $endDate])
            ->sum('amount');
    }

    private function getTopCourses(User $user): array
    {
        $courses = Course::where(['user_id' => $user->id])->withCount('students')
            ->withSum('payments', 'amount')
            ->has('students')
            ->orderBy('students_count', 'desc')

            ->limit(4)
            ->get(['id', 'name'])
            ->map(function ($course) {
                return [
                    'name'           => $course->name,
                    'students_count' => $course->students_count,
                    'slug'           => $course->slug,
                    'revenue'        => (int)$course->payments_sum_amount ?? 0,
                ];
            })
            ->toArray();
        return $courses;
    }

    private function getLeastPopularCourses(User $user): array
    {
        // Lấy ID các khóa học phổ biến nhất (top 4)
        $topCourseIds = $this->getTopCourses($user);
        $topCourseIds = array_column($topCourseIds, 'id');

        // Lấy các khóa học ít phổ biến, loại bỏ các khóa học đã nằm trong top
        $courses = Course::where('user_id', $user->id)
            ->whereNotIn('id', $topCourseIds)
            ->withCount('students')
            ->withSum('payments', 'amount')
            ->orderBy('students_count', 'asc')
            ->limit(4)
            ->get(['id', 'name'])
            ->map(function ($course) {
                return [
                    'name'           => $course->name,
                    'students_count' => $course->students_count,
                    'slug'           => $course->slug,
                    'revenue'        => (int)$course->payments_sum_amount ?? 0,
                ];
            })
            ->toArray();

        return $courses;
    }

    private function getTop4NewStudents(User $user): array
    {
        // Lấy ID các khóa học do giáo viên này tạo
        $courseIds = Course::where('user_id', $user->id)->pluck('id');

        // Lấy 4 học viên mới đăng ký các khóa học này gần đây nhất
        $students = Payment::whereIn('course_id', $courseIds)
            ->where('status', 'paid')
            ->with('user:id,full_name,email,avatar') // Chỉ lấy các trường cần thiết
            ->orderBy('paid_at', 'desc')
            ->distinct('user_id')
            ->limit(4)
            ->get()
            ->map(function ($payment) {
                return [
                    'full_name' => $payment->user->full_name ?? null,
                    'email'     => $payment->user->email ?? null,
                    'avatar'    => $payment->user->avatar ?? null,
                    'paid_at'   => $payment->paid_at,
                ];
            })
            ->toArray();

        return $students;
    }

    private function getNewFeedbacks(User $user): array
    {
        // Lấy ID các khóa học do giáo viên này tạo
        $courseIds = Course::where('user_id', $user->id)->pluck('id');

        // Lấy 4 feedback mới nhất cho các khóa học này
        $feedbacks = CourseReview::whereIn('course_id', $courseIds)
            ->with('user:id,full_name,email,avatar') // Chỉ lấy các trường cần thiết
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($feedback) {
                return [
                    'course_id' => $feedback->course_id,
                    'course_name' => $feedback->course->name ?? null,
                    'full_name' => $feedback->user->full_name ?? null,
                    'email'     => $feedback->user->email ?? null,
                    'avatar'    => $feedback->user->avatar ?? null,
                    'rating'    => $feedback->rating,
                    'comment'   => $feedback->comment,
                    'created_at' => $feedback->created_at,
                ];
            })
            ->toArray();

        return $feedbacks;
    }

    private function getStudentsPerCourse(User $user): array
    {
        // Lấy ID các khóa học do giáo viên này tạo
        $courseIds = Course::where('user_id', $user->id)->pluck('id');

        // Lấy số lượng học viên cho mỗi khóa học
        $studentsPerCourse = Course::whereIn('id', $courseIds)
            ->withCount('students')
            ->get()
            ->map(function ($course) {
                return [
                    'course_name'   => $course->name,
                    'students_count' => $course->students_count,
                ];
            })
            ->toArray();

        return $studentsPerCourse;
    }

    private function getRecentExamSubmissions(User $user): array
    {
        // get tất cả bài thi của teacher
        $examPaperIds = ExamPaper::where('user_id', $user->id)->pluck('id');
        // trong exam attempt lấy 4 bài thi gần nhất
        $recentSubmissions = ExamAttempt::whereIn('exam_paper_id', $examPaperIds)
            ->with(['user:id,full_name,email,avatar', 'paper:id,title'])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($attempt) {
                return [
                    'full_name'   => $attempt->user->full_name ?? null,
                    'email'       => $attempt->user->email ?? null,
                    'avatar'      => $attempt->user->avatar ?? null,
                    'exam_title'  => $attempt->examPaper->title ?? null,
                    'score'       => $attempt->score,
                    'submitted_at' => $attempt->created_at,
                ];
            })
            ->toArray();

        return $recentSubmissions;
    }
}
