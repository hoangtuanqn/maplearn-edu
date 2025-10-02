"use client";
import { Clock, PenTool, Trash2, Edit3, Check, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

interface Note {
    id: number;
    content: string;
    timestamp: string;
    timeInVideo: string;
    createdAt: Date;
}

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            content: "Công thức chu kỳ: T = 2π√(l/g) - chỉ áp dụng khi góc dao động nhỏ (< 5°)",
            timestamp: "Hôm qua",
            timeInVideo: "08:30",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
            id: 2,
            content: "Cần nhớ: Chu kỳ không phụ thuộc vào khối lượng và biên độ dao động",
            timestamp: "Hôm qua",
            timeInVideo: "15:20",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
    ]);
    const [newNote, setNewNote] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    // Thêm ghi chú mới
    const handleAddNote = () => {
        if (newNote.trim()) {
            const note: Note = {
                id: Date.now(),
                content: newNote.trim(),
                timestamp: "Vừa xong",
                timeInVideo: "00:00", // Có thể lấy từ video player
                createdAt: new Date(),
            };
            setNotes([note, ...notes]);
            setNewNote("");
        }
    };

    // Xóa ghi chú
    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    // Bắt đầu chỉnh sửa
    const handleStartEdit = (note: Note) => {
        setEditingId(note.id);
        setEditContent(note.content);
    };

    // Lưu chỉnh sửa
    const handleSaveEdit = () => {
        if (editContent.trim()) {
            setNotes(notes.map((note) => (note.id === editingId ? { ...note, content: editContent.trim() } : note)));
        }
        setEditingId(null);
        setEditContent("");
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditContent("");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Ghi chú cá nhân</h3>
                <div className="text-sm text-gray-500">{notes.length} ghi chú</div>
            </div>

            {/* Add New Note */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                        <PenTool className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="mb-3 font-semibold text-gray-900">Thêm ghi chú mới</h4>
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Viết ghi chú của bạn về bài học này..."
                            className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-4 transition-colors outline-none focus:ring-2"
                            rows={3}
                        />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                Ghi chú sẽ được lưu ngay lập tức
                            </div>
                            <Button
                                size="sm"
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="bg-primary hover:bg-primary/90 text-white"
                            >
                                <PenTool className="mr-2 h-4 w-4" />
                                Lưu ghi chú
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Notes */}
            {notes.length > 0 ? (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Ghi chú đã lưu ({notes.length})</h4>

                    {notes.map((note, index) => (
                        <div
                            key={note.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex-shrink-0 rounded-lg p-2 ${
                                        index % 3 === 0
                                            ? "bg-yellow-100"
                                            : index % 3 === 1
                                              ? "bg-green-100"
                                              : "bg-purple-100"
                                    }`}
                                >
                                    <PenTool
                                        className={`h-5 w-5 ${
                                            index % 3 === 0
                                                ? "text-yellow-600"
                                                : index % 3 === 1
                                                  ? "text-green-600"
                                                  : "text-purple-600"
                                        }`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-900">
                                            Phút {note.timeInVideo}
                                        </span>
                                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                                    </div>

                                    {editingId === note.id ? (
                                        <div className="space-y-3">
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2"
                                                rows={3}
                                            />
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={handleSaveEdit}
                                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                                >
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Lưu
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                                    <X className="mr-1 h-3 w-3" />
                                                    Hủy
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700">{note.content}</p>
                                    )}
                                </div>

                                {editingId !== note.id && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleStartEdit(note)}
                                            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                            title="Xóa"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                    <PenTool className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên của bạn!</p>
                </div>
            )}
        </div>
    );
};

export default Notes;
