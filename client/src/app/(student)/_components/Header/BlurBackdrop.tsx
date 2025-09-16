const BlurBackdrop = () => {
    return (
        <div id="BlurBackdrop" className="absolute right-0 left-0 -z-100">
            <div className="absolute inset-x-0 top-0 h-[65rem] overflow-hidden">
                <div className="h-[40rem] w-full bg-gradient-to-b from-[rgba(59,130,246,0.1)] to-[rgba(248,250,252,1)]"></div>
                <div className="mt-[-20rem] h-[40rem] w-full scale-110 bg-[rgba(248,250,252,0.8)] blur-[80px]"></div>
            </div>
        </div>
    );
};

export default BlurBackdrop;
