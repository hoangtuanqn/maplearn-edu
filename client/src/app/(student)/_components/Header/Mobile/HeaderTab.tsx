const HeaderTab = () => {
    return (
        <div className="sticky top-[54px] flex w-full items-center">
            <div className="shadow-inset-b relative flex flex-1 items-center">
                <div
                    className="bg-primary absolute bottom-0 left-0 h-[2px] w-1/2"
                    style={{ transform: "translate(0px, 0px)" }}
                ></div>
                <button className="t1-flex-center text-primary relative w-1/2 cursor-pointer py-3 font-bold">
                    <p>Trang chủ</p>
                </button>
                <button className="t1-flex-center relative w-1/2 cursor-pointer py-3 font-medium text-[#656C7B]">
                    <p>Cộng đồng</p>
                </button>
            </div>
        </div>
    );
};

export default HeaderTab;
