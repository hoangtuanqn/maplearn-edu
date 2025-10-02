"use client";
import { MessageCircle, ThumbsUp, Reply, Send, X, Heart } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

interface Comment {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
    avatar: string;
    isTeacher?: boolean;
    replies: Reply[];
}

interface Reply {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    avatar: string;
    isTeacher?: boolean;
}

const Discussion = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "Hoàng Minh",
            content:
                "Thầy ơi, em có thể hỏi về điều kiện để con lắc dao động điều hòa không ạ? Em vẫn chưa hiểu rõ lắm về góc nhỏ hơn 5 độ.",
            timestamp: "2 giờ trước",
            likes: 5,
            isLiked: false,
            avatar: "H",
            replies: [
                {
                    id: 11,
                    author: "Giảng viên",
                    content:
                        "Chào em! Điều kiện góc nhỏ hơn 5 độ (0.087 rad) đảm bảo sin(θ) ≈ θ, giúp dao động trở thành điều hòa đơn giản. Em có thể xem lại phần giải thích trong video từ phút 12:30 nhé!",
                    timestamp: "1 giờ trước",
                    avatar: "GV",
                    isTeacher: true,
                },
            ],
        },
        {
            id: 2,
            author: "Linh Nguyen",
            content:
                "Bài học rất hay và dễ hiểu! Em đã nắm được công thức tính chu kỳ T = 2π√(l/g). Cảm ơn thầy nhiều ạ!",
            timestamp: "5 giờ trước",
            likes: 12,
            isLiked: true,
            avatar: "L",
            replies: [],
        },
    ]);

    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [showCommentForm, setShowCommentForm] = useState(false);

    // Thêm bình luận mới
    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now(),
                author: "Bạn", // Trong thực tế sẽ lấy từ user session
                content: newComment.trim(),
                timestamp: "Vừa xong",
                likes: 0,
                isLiked: false,
                avatar: "B",
                replies: [],
            };
            setComments([comment, ...comments]);
            setNewComment("");
            setShowCommentForm(false);
        }
    };

    // Thêm reply
    const handleAddReply = (commentId: number) => {
        if (replyContent.trim()) {
            const reply: Reply = {
                id: Date.now(),
                author: "Bạn",
                content: replyContent.trim(),
                timestamp: "Vừa xong",
                avatar: "B",
            };

            setComments(
                comments.map((comment) =>
                    comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
                ),
            );
            setReplyContent("");
            setReplyTo(null);
        }
    };

    // Like/Unlike comment
    const handleToggleLike = (commentId: number) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                          isLiked: !comment.isLiked,
                      }
                    : comment,
            ),
        );
    };

    // Avatar generator với gradient màu
    const getAvatarColor = (name: string) => {
        const colors = [
            "from-blue-500 to-purple-500",
            "from-emerald-500 to-teal-500",
            "from-pink-500 to-orange-500",
            "from-purple-500 to-indigo-500",
            "from-green-500 to-blue-500",
            "from-red-500 to-pink-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Thảo luận bài học</h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{comments.length} bình luận</span>
                    <Button
                        onClick={() => setShowCommentForm(!showCommentForm)}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Đặt câu hỏi
                    </Button>
                </div>
            </div>

            {/* Add Comment Form */}
            {showCommentForm && (
                <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 font-semibold text-white">
                            B
                        </div>
                        <div className="flex-1">
                            <h4 className="mb-3 font-semibold text-gray-900">Đặt câu hỏi hoặc chia sẻ ý kiến</h4>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Viết câu hỏi hoặc ý kiến của bạn về bài học này..."
                                className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-4 transition-colors outline-none focus:ring-2"
                                rows={3}
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    Hãy thảo luận một cách tôn trọng và xây dựng
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setShowCommentForm(false);
                                            setNewComment("");
                                        }}
                                    >
                                        <X className="mr-1 h-3 w-3" />
                                        Hủy
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleAddComment}
                                        disabled={!newComment.trim()}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Gửi bình luận
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${getAvatarColor(comment.author)} font-semibold text-white`}
                                >
                                    {comment.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-3">
                                        <h4 className="font-semibold text-gray-900">
                                            {comment.author}
                                            {comment.isTeacher && (
                                                <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                    Giảng viên
                                                </span>
                                            )}
                                        </h4>
                                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="mb-3 text-gray-700">{comment.content}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <button
                                            onClick={() => handleToggleLike(comment.id)}
                                            className={`flex items-center gap-1 transition-colors ${
                                                comment.isLiked
                                                    ? "text-red-500 hover:text-red-600"
                                                    : "hover:text-primary"
                                            }`}
                                        >
                                            {comment.isLiked ? (
                                                <Heart className="h-4 w-4 fill-current" />
                                            ) : (
                                                <ThumbsUp className="h-4 w-4" />
                                            )}
                                            {comment.likes} {comment.isLiked ? "đã thích" : "thích"}
                                        </button>
                                        <button
                                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                            className="hover:text-primary flex items-center gap-1"
                                        >
                                            <Reply className="h-4 w-4" />
                                            Trả lời
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Replies */}
                            {comment.replies.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    {comment.replies.map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="ml-14 rounded-lg border border-gray-100 bg-gray-50 p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${
                                                        reply.isTeacher
                                                            ? "from-emerald-500 to-teal-500"
                                                            : getAvatarColor(reply.author)
                                                    } text-sm font-semibold text-white`}
                                                >
                                                    {reply.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center gap-3">
                                                        <h4 className="text-sm font-semibold text-gray-900">
                                                            {reply.author}
                                                            {reply.isTeacher && (
                                                                <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                                    Giảng viên
                                                                </span>
                                                            )}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">{reply.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Reply Form */}
                            {replyTo === comment.id && (
                                <div className="mt-4 ml-14">
                                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-sm font-semibold text-white">
                                                B
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    placeholder={`Trả lời ${comment.author}...`}
                                                    className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2"
                                                    rows={2}
                                                />
                                                <div className="mt-3 flex items-center justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setReplyTo(null);
                                                            setReplyContent("");
                                                        }}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleAddReply(comment.id)}
                                                        disabled={!replyContent.trim()}
                                                        className="bg-primary hover:bg-primary/90 text-white"
                                                    >
                                                        <Send className="mr-1 h-3 w-3" />
                                                        Trả lời
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                    <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">Chưa có bình luận nào. Hãy là người đầu tiên thảo luận!</p>
                </div>
            )}
        </div>
    );
};

export default Discussion;
