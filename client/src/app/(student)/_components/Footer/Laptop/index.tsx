import { APP_CONFIG } from "~/config/app.config";
import NewsletterForm from "./NewsletterForm";
import Image from "next/image";
import Link from "next/link";
import { formatPhoneNumber } from "~/libs/format";

const FooterLaptop = () => {
    return (
        <footer className="bg-primary hidden text-white xl:block">
            <div className="mx-auto max-w-7xl rounded-xl">
                <div className="mb-5 flex flex-row justify-between gap-3 p-8 [&>div]:w-fit">
                    <div className="">
                        <h3 className="mb-5 text-lg font-semibold uppercase">LIÊN HỆ</h3>
                        <ul className="flex flex-col gap-4 [&>li]:flex [&>li]:items-center [&>li]:gap-4">
                            <li>
                                <Image src="/assets/images/footer/logo.png" alt="" width={32} height={32} />
                                <span>{APP_CONFIG.APP_NAME}</span>
                            </li>
                            <li>
                                <Image src="/assets/images/footer/location.png" alt="" width={32} height={32} />
                                <span>Phường Thủ Đức, TP. Hồ Chí Minh</span>
                            </li>
                            <li>
                                <Image src="/assets/images/footer/cube.png" alt="" width={32} height={32} />
                                <span>Chịu trách nhiệm nội dung: Phạm Hoàng Tuấn</span>
                            </li>
                            <li>
                                <Image src="/assets/images/footer/mail.png" alt="" width={32} height={32} />
                                <a href="mailto:maplearn@fpt.edu.vn">maplearn@fpt.edu.vn</a>
                            </li>
                            <li>
                                <Image src="/assets/images/footer/call.png" alt="" width={32} height={32} />
                                <a href="tel:0812665001">{formatPhoneNumber("0812665001")}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="mb-5 text-lg font-semibold uppercase">THÔNG TIN</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="#">Giới Thiệu</a>
                            </li>
                            <li>
                                <a href="#">Câu Hỏi Thường Gặp</a>
                            </li>

                            <li>
                                <a href="#">Điều Khoản Dịch Vụ</a>
                            </li>
                            <li>
                                <a href="#">Chính Sách Bảo Mật</a>
                            </li>
                            <li>
                                <div className="relative -left-2 flex items-center gap-1">
                                    <a href="#">
                                        <Image
                                            src="/assets/images/social/facebook-circle.png"
                                            alt="Facebook icon"
                                            width={64}
                                            height={64}
                                        />
                                    </a>
                                    <a href="#">
                                        <Image
                                            src="/assets/images/social/messenger-circle.png"
                                            alt="Messenger icon"
                                            width={64}
                                            height={64}
                                        />
                                    </a>
                                    <a href="#">
                                        <Image
                                            src="/assets/images/social/tiktok-circle.png"
                                            alt="TikTok icon"
                                            width={64}
                                            height={64}
                                        />
                                    </a>
                                    <a href="#">
                                        <Image
                                            src="/assets/images/social/youtube-circle.png"
                                            alt="YouTube icon"
                                            width={64}
                                            height={64}
                                        />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="mb-5 text-lg font-semibold uppercase">ĐIỀU KHOẢN</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="#">Hướng Dẫn Thanh Toán</a>
                            </li>
                            <li>
                                <a href="#">Kích Hoạt Khóa Học</a>
                            </li>
                            <li>
                                <a href="#">Cộng Tác Viên</a>
                            </li>
                            <li className="mt-4 text-lg uppercase">Đăng ký nhận bản tin</li>
                            <li>
                                <NewsletterForm />
                            </li>
                        </ul>
                    </div>
                </div>
                <address className="border-t-2 border-t-white p-8 text-center">
                    &copy; Bản quyền thuộc về{" "}
                    <Link href="/" className="font-bold">
                        MapLearn
                    </Link>
                </address>
            </div>
        </footer>
    );
};

export default FooterLaptop;
