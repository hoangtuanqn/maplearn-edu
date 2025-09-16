import { KeyRound } from "lucide-react";

const CourseActive = ({ className = "" }: { className?: string }) => {
    return (
        <div>
            <a
                className={`!rounded-block bg-primary hover:bg-primary-light mt-4 inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-transparent py-4 whitespace-nowrap text-white shadow-sm duration-150 ease-out ${className}`}
                href="/kich-hoat-the"
            >
                <KeyRound />
                <span className="">Kích hoạt thẻ</span>
            </a>
        </div>
    );
};

export default CourseActive;
