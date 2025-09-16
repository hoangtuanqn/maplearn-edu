// toast-utils.ts
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";

type PropType = {
    title: string;
    image: string;
    message?: string;
    url?: string;
};

export function ShowCartSonner({ title, image, url = "#", message = "Đã thực hiện thao tác thành công!" }: PropType) {
    toast.custom(
        (id) => (
            <div className="mr-4 ml-auto flex w-full max-w-md items-center gap-4 rounded-xl border bg-white p-4 shadow-lg transition-all duration-300">
                <Image src={image} alt={title} width={40} height={40} className="h-16 w-16 rounded object-cover" />
                <div className="flex-1">
                    <p className="text-sm text-gray-500">{message}</p>
                    <p className="font-medium text-black">{title}</p>
                </div>
                <Link href={url}>
                    <Button
                        className="text-primary text-sm"
                        onClick={() => {
                            toast.dismiss(id);
                        }}
                        variant={"outline"}
                    >
                        {url ? "Xem" : "Đóng"}
                    </Button>
                </Link>
            </div>
        ),
        {
            position: "bottom-right",
            duration: 5000,
        },
    );
}
