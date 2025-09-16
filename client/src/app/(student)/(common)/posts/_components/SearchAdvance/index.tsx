import { Brain } from "lucide-react";
import React from "react";
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
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
const SearchAdvanceModal = () => {
    const handleSubmit = () => {};
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="view_tooltip bg-white"
                        data-tooltip-content={"Tìm kiếm theo nhu cầu"}
                    >
                        <Brain />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm thông minh</DialogTitle>
                        <DialogDescription>Tìm kiếm thông tin bằng AI dựa trên nhu cầu của bạn.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Nhu cầu của bạn</Label>
                            <Textarea id="username-1" name="username" placeholder="Nhập nhu cầu của bạn" />
                        </div>
                        <p>Lưu ý: Có thể mất 1 khoảng thời gian để tìm kiếm</p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Hủy</Button>
                        </DialogClose>
                        <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                            Tìm kiếm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default SearchAdvanceModal;
