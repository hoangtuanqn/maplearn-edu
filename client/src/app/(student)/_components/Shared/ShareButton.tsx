"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Copy, Check, Share2, Facebook, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";

export function ShareButton() {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : "";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Đã sao chép liên kết chia sẻ!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    // title,
                    url,
                });
            } catch (err) {
                console.error("Lỗi khi chia sẻ:", err);
            }
        } else {
            alert("Trình duyệt không hỗ trợ Web Share API.");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="primary" className="view_tooltip border" data-tooltip-content={"Chia sẻ"}>
                    <Share2 className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg">
                <DropdownMenuItem onClick={handleCopy}>
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Đã sao chép liên kết" : "Sao chép liên kết"}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => {
                        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                        window.open(fbUrl, "_blank");
                    }}
                >
                    <Facebook className="mr-2 h-4 w-4" />
                    Chia sẻ Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNativeShare}>
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    Khác
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
