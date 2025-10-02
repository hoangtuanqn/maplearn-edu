import { CheckCircle, Play } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export function ConfirmPasswordExam({
    agree,
    onSubmit,
}: {
    agree: boolean;
    onSubmit?: (password: string | null) => void;
}) {
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(password);
    };

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <button
                        disabled={!agree}
                        className={`flex h-14 items-center justify-center gap-3 rounded-full px-8 font-semibold text-white shadow-lg transition-all duration-200 ${
                            agree
                                ? "bg-primary hover:bg-primary/90 transform cursor-pointer hover:scale-105 hover:shadow-xl"
                                : "cursor-not-allowed bg-gray-300"
                        }`}
                    >
                        <Play className="h-5 w-5" />
                        <span className="text-lg">Bắt đầu làm bài</span>
                        {agree && <CheckCircle className="h-5 w-5" />}
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Nhập mật khẩu đề thi</DialogTitle>
                        <DialogDescription>
                            Đề thi này yêu cầu mật khẩu. Vui lòng nhập mật khẩu để bắt đầu làm bài.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="exam-password">Mật khẩu đề thi</Label>
                            <Input
                                id="exam-password"
                                name="exam-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu..."
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="primary" onClick={handleSubmit}>
                            Xác nhận
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
