import HomeIcon from "../../Icons/HomeIcon";
import GraduationIcon from "../../Icons/GraduationIcon";
import NewsIcon from "../../Icons/NewsIcon";
import FooterMobileLink from "./FooterLink";
import { useAuth } from "~/hooks/useAuth";
import UserIcon from "../../Icons/UserIcon";
const footerLinks = [
    {
        label: "Trang chủ",
        icon: HomeIcon,
        href: "/",
        macher: ["/"],
    },
    {
        label: "Khóa học",
        icon: GraduationIcon,
        href: "/courses",
        macher: ["/courses", "/courses/:slug", "/learning/:slug"],
    },
    {
        label: "Kho đề thi",
        icon: NewsIcon,
        href: "/exams",
        macher: ["/exams", "/exams/:slug"],
    },
    {
        showWhenLoggedOut: true,
        label: "Đăng nhập",
        icon: UserIcon,
        href: "/auth/login",
        macher: ["/auth/login"],
    },
    {
        showWhenLogin: true,
        label: "Cá nhân",
        icon: UserIcon,
        href: "/profile",
        macher: ["/profile"],
    },
];
const FooterMobile = () => {
    const { user } = useAuth();
    return (
        <div className="fixed right-0 bottom-0 left-0 z-20 h-16 w-full bg-white py-2 shadow-2xs md:hidden">
            <ul className="flex h-full list-none flex-row gap-1 px-0.5">
                {footerLinks
                    .filter((link) => {
                        if (link.showWhenLoggedOut && user) return false;
                        if (link.showWhenLogin && !user) return false;
                        return true;
                    })
                    .map((link) => (
                        <FooterMobileLink key={link.href} {...link} />
                    ))}
            </ul>
        </div>
    );
};

export default FooterMobile;
