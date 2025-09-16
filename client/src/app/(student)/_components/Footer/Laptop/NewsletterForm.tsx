"use client";
import Image from "next/image";
import { FormEvent } from "react";
import { toast } from "sonner";
import { useInput } from "~/hooks/useInput";

const NewsletterForm = () => {
    const { value, reset, onChange } = useInput("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Đang giả lập
        if (!value) {
            toast.error("Vui lòng nhập email");
            return;
        }
        toast.info("Tính năng này đang được phát triển");
        reset();
    };
    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="flex h-12 w-full items-center rounded-md border-2 border-white">
                <input
                    placeholder="Nhập email"
                    onChange={onChange}
                    value={value}
                    className="h-full grow border-none bg-transparent pl-3 text-white outline-none placeholder:text-white"
                />
                <button type="submit" className="shrink-0 cursor-pointer px-2">
                    <Image src="/assets/images/footer/send.png" alt="Gửi" className="h-8 w-8" width={64} height={64} />
                </button>
            </div>
        </form>
    );
};

export default NewsletterForm;
