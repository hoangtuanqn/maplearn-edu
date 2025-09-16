"use client";
import { Tooltip } from "react-tooltip";
import { Toaster } from "sonner";
import FooterLaptop from "~/app/(student)/_components/Footer/Laptop";
import FooterMobile from "~/app/(student)/_components/Footer/Mobile";
import ScrollToTopButton from "~/app/(student)/_components/Footer/ScrollToTopButton";

// import ChatBotAI from "../ChatBotAI";
const Footer = () => {
    return (
        <>
            <FooterLaptop />
            <FooterMobile />
            <Tooltip anchorSelect=".view_tooltip" className="z-300" />
            <ScrollToTopButton />

            <Toaster position="top-center" expand={true} richColors duration={5000} />
        </>
    );
};

export default Footer;
