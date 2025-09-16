import { Badge } from "~/components/ui/badge";

export function getStatusBadge(type: string, status: string) {
    switch (type) {
        case "payment":
            switch (status) {
                case "paid":
                    return <Badge variant="success">Đã thanh toán</Badge>;
                case "canceled":
                    return <Badge variant="danger">Đã hủy hóa đơn</Badge>;
                default:
                    return <Badge variant="warning">Chưa thanh toán</Badge>;
            }
        case "exam":
            // 'in_progress', 'submitted', 'detected', 'canceled'
            switch (status) {
                case "in_progress":
                    return <Badge variant="warning">Đang làm bài</Badge>;
                case "submitted":
                    return <Badge variant="success">Đã nộp bài</Badge>;
                case "detected":
                    return <Badge variant="danger">Vi phạm quy chế</Badge>;
                case "canceled":
                    return <Badge variant="danger">Đã hủy</Badge>;
                default:
                    return <Badge variant="secondary">Không xác định</Badge>;
            }
        case "exam_result":
            switch (status) {
                case "pass":
                    return <Badge variant="success">Đạt</Badge>;
                case "not_pass":
                    return <Badge variant="danger">Không đạt</Badge>;
                default:
                    return <Badge variant="secondary">Không xác định</Badge>;
            }
        case "activity_status":
            switch (+status) {
                case 3:
                    return <Badge variant="secondary">Chưa có video</Badge>;
                case 2:
                    return <Badge variant="secondary">Chưa bắt đầu</Badge>;
                case 1:
                    return <Badge variant="success">Hoạt động</Badge>;
                case 0:
                    return <Badge variant="warning">Tạm ngưng</Badge>;
                default:
                    return <Badge variant="secondary">Không xác định</Badge>;
            }
        // dạng 1: active, inactive
        case "active_inactive":
            switch (status) {
                case "1":
                    return <Badge variant="success">Hoạt động</Badge>;
                case "0":
                    return <Badge variant="warning">Tạm ngưng</Badge>;
            }
        default:
            return <Badge variant="secondary">Không xác định</Badge>;
    }
}
