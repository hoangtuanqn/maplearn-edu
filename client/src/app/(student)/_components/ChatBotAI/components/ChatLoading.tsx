import { ThreeDot } from "react-loading-indicators";

const ChatLoading = () => {
    return (
        <div className="mr-auto w-fit max-w-[90%] rounded-lg bg-[#F0F2F5] px-4 py-2 break-words text-black">
            <span>
                <span className="mr-2">Chờ tí nha</span>
                <ThreeDot
                    variant="pulsate"
                    color="#787878"
                    size="small"
                    text=""
                    textColor=""
                    style={{ fontSize: "8px" }}
                />
            </span>
        </div>
    );
};

export default ChatLoading;
