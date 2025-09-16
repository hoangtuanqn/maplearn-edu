"use client";
import { Tooltip } from "react-tooltip";
import FooterLaptop from "./Laptop";
import FooterMobile from "./Mobile";
import ScrollToTopButton from "./ScrollToTopButton";
import { Toaster } from "~/components/ui/sonner";
import ChatBotAI from "../ChatBotAI";
// import ChatBotAI from "../ChatBotAI";
const Footer = () => {
    return (
        <>
            <FooterLaptop />
            <FooterMobile />
            <Tooltip anchorSelect=".view_tooltip" className="z-300" />
            <ScrollToTopButton />
            <ChatBotAI />
            <Toaster position="top-center" expand={true} richColors duration={5000} />
        </>
    );
};

export default Footer;
