import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { FileText } from "lucide-react";
import Image from "next/image";

export function ShowPasswordPaper({ imageBase64 }: { imageBase64: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Xem mật khẩu đề thi
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-blue-800">
                        <FileText className="h-5 w-5 text-blue-600" /> Mã QR bảo vệ đề thi
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-2">
                    <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300 p-3 shadow-lg">
                        <Image
                            src={imageBase64 ?? ""}
                            width={200}
                            height={200}
                            alt="QR Code"
                            className="rounded-xl object-contain"
                        />
                    </div>
                    <span className="text-center text-sm font-medium text-blue-700">
                        Quét mã QR để lấy mật khẩu truy cập đề thi
                    </span>

                    <span className="mt-1 text-center text-xs text-gray-400">
                        Bảo mật truy cập đề thi bằng mã QR, chỉ chia sẻ cho người được phép.
                    </span>
                </div>
                <DialogClose asChild>
                    <Button variant="outline" className="mt-2 w-full">
                        Đóng
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
