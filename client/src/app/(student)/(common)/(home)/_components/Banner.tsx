"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
// Banner có thể bấm vô được hay không
const bannerImages = [
    {
        url: "",
        image: "/assets/images/banner/banner-1.jpg",
    },
    {
        url: "",
        image: "/assets/images/banner/banner-2.jpg",
    },
    // {
    //     url: "",
    //     image: "/assets/images/banner/banner-3.png",
    // },
];
const Banner = () => {
    
    return (
        <div className="mt-4 overflow-hidden rounded-xl xl:mt-6">
            <Swiper
                pagination={true}
                autoplay={{
                    delay: 3000, // 3 giây
                    disableOnInteraction: false, // Không dừng khi người dùng vuốt slide
                }}
                modules={[Pagination, Autoplay]}
                loop={true}
            >
                {bannerImages.map(({ url, image }) => (
                    <SwiperSlide key={image + url}>
                        <Link
                            href={url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (!url) e.preventDefault();
                            }}
                        >
                            <Image
                                src={image}
                                alt="Banner"
                                className="h-[180px] w-full cursor-pointer rounded-xl object-cover sm:h-[200px] md:h-[225px] lg:h-[250px] xl:h-[280px] 2xl:h-[300px]"
                                height={511}
                                width={1536}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
