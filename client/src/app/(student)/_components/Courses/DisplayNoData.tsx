import Image from "next/image";

const DisplayNoData = ({ title = "Không có dữ liệu để hiển thị" }: { title?: string }) => {
    return (
        <div className="t1-flex-center flex-col">
            <Image
                src="/assets/images/common/study.png"
                alt="Nothing to display"
                className="object-cover"
                width={226}
                height={140}
            />
            <span className="mt-8 text-center text-lg font-semibold text-[#295779]">{title}</span>
        </div>
    );
};

export default DisplayNoData;
