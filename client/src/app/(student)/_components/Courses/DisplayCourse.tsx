"use client";

import { Star, User, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useRef, useState } from "react";
import { formatter } from "~/libs/format";
import { motion, AnimatePresence } from "framer-motion";
import { CourseType } from "~/schemaValidate/course.schema";

const tooltipOffset = 210;

const DisplayCourse = ({ course }: { course: CourseType }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [position, setPosition] = useState<"left" | "right">("right");
    const [isDesktop, setIsDesktop] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Xác định thiết bị có chuột (PC, laptop)
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDesktop(window.matchMedia("(pointer: fine)").matches);
        }
    }, []);

    // Auto adjust tooltip direction
    useEffect(() => {
        if (showInfo && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceRight = window.innerWidth - rect.right;
            const tooltipWidth = 320;

            setPosition(spaceRight < tooltipWidth ? "left" : "right");
        }
    }, [showInfo]);

    if (!course) return null;

    // Kiểm tra khóa học sắp bắt đầu
    const isUpcoming = course?.start_date && new Date(course.start_date) > new Date();

    // Tính toán số ngày còn lại
    const getDaysUntilStart = () => {
        if (!course.start_date) return 0;
        const now = new Date();
        const startDate = new Date(course.start_date);
        const diffTime = startDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntilStart = getDaysUntilStart();

    // Kiểm tra khóa học đã hoàn thành và nhận chứng chỉ
    const hasCompleted = course.lesson_successed === course.lesson_count; // Kiểm tra đã hoàn thành tất cả bài học
    const hasCertificate = hasCompleted && course.has_certificate; // Kiểm tra nếu đã hoàn thành và có chứng chỉ

    const url =
        course.is_enrolled && course.current_lesson?.slug
            ? `/learn/${course.slug}/lecture/${course.current_lesson?.slug}`
            : `/courses/${course.slug}`;

    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={() => isDesktop && setShowInfo(true)}
            onMouseLeave={() => isDesktop && setShowInfo(false)}
            ref={containerRef}
        >
            {position === "left" ? (
                <div className="absolute top-0 bottom-0 -left-4 z-10 w-4 bg-transparent"></div>
            ) : (
                <div className="absolute top-0 -right-4 bottom-0 z-10 w-4 bg-transparent"></div>
            )}

            <Link href={url} className="text-secondary-typo relative block h-full w-full rounded-xl">
                <div className="relative">
                    <Image
                        width={184}
                        height={184}
                        src={course.thumbnail}
                        alt={course.teacher.full_name}
                        className="aspect-square w-full rounded-xl object-cover"
                    />

                    {/* Badge sắp bắt đầu */}
                    {isUpcoming && (
                        <div className="absolute top-2 left-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                            <div className="flex items-center gap-1">
                                <Clock className="h-2.5 w-2.5" />
                                <span>Sắp bắt đầu</span>
                            </div>
                        </div>
                    )}

                    {course.is_best_seller && !isUpcoming && (
                        <div className="absolute top-2 right-2 rounded bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                            Bán chạy
                        </div>
                    )}

                    {/* Badge đã hoàn thành và nhận chứng chỉ */}
                    {hasCertificate && (
                        <div className="absolute top-2 right-2 rounded bg-gradient-to-r from-green-500 to-green-700 px-2 py-1 text-[10.125px] font-bold text-white shadow-md">
                            Đã hoàn thành
                        </div>
                    )}
                </div>

                <h3 className="mt-4 w-full font-medium lg:line-clamp-2">{course.name}</h3>

                <div className="my-1 flex items-center gap-1 text-xs font-medium">
                    <User style={{ fill: "currentColor" }} />
                    <span className="line-clamp-2">{course.teacher?.full_name}</span>
                </div>

                {/* Hiển thị thông tin sắp bắt đầu */}
                {isUpcoming && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600">
                        <Calendar className="h-3 w-3" />
                        <span>Bắt đầu sau {daysUntilStart} ngày nữa</span>
                    </div>
                )}

                {!course.is_enrolled && course.rating.average_rating > 0 && !isUpcoming && (
                    <div className="flex items-center gap-1 text-xs">
                        <span className="font-bold text-amber-500">{course.rating.average_rating}</span>
                        <Star className="h-3 w-3 flex-shrink-0 fill-amber-500 text-amber-500" />
                    </div>
                )}

                {course.is_enrolled ? (
                    <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                            <span>Tiến độ học tập</span>
                            <span className="font-medium">
                                {Math.floor((course.lesson_successed / course.lesson_count) * 100)}%
                            </span>
                        </div>
                        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
                                style={{ width: `${(course.lesson_successed / course.lesson_count) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-2">
                        {isUpcoming ? (
                            <div className="flex flex-col gap-1">
                                <span
                                    className={` ${course.price === 0 ? "text-green-600" : "text-primary"} text-sm font-bold`}
                                >
                                    {course.price === 0 ? "Miễn phí" : formatter.number(course.price ?? 0) + "đ"}
                                </span>
                            </div>
                        ) : (
                            <span
                                className={` ${course.price === 0 ? "text-green-600" : "text-primary"} text-sm font-bold`}
                            >
                                {course.price === 0 ? "Miễn phí" : formatter.number(course.price ?? 0) + "đ"}
                            </span>
                        )}
                    </div>
                )}
            </Link>

            {/* Tooltip chỉ hiển thị nếu là PC */}
            {isDesktop && (
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-0 z-50 w-[320px]"
                            style={{
                                left: position === "right" ? `${tooltipOffset}px` : "auto",
                                right: position === "left" ? `${tooltipOffset}px` : "auto",
                            }}
                            onMouseEnter={() => setShowInfo(true)}
                            onMouseLeave={() => setShowInfo(false)}
                        >
                            <div className={`absolute top-6 ${position === "left" ? "right-[-1px]" : "left-[-9px]"}`}>
                                {position === "right" ? (
                                    <>
                                        <div className="h-0 w-0 border-y-[9px] border-r-[9px] border-y-transparent border-r-gray-200" />
                                        <div className="absolute top-[-8px] left-[1px] h-0 w-0 border-y-[8px] border-r-[8px] border-y-transparent border-r-white" />
                                    </>
                                ) : (
                                    <>
                                        <div className="h-0 w-0 border-y-[9px] border-l-[9px] border-y-transparent border-l-gray-200" />
                                        <div className="absolute top-[-8px] right-[1px] h-0 w-0 border-y-[8px] border-l-[8px] border-y-transparent border-l-white" />
                                    </>
                                )}
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-lg">
                                <h3 className="text-base leading-snug font-semibold text-gray-900">
                                    <Link href={url} className="hover:text-primary transition-colors duration-200">
                                        {course.name}
                                    </Link>
                                </h3>

                                <div className="mt-2 flex items-center gap-2">
                                    {isUpcoming ? (
                                        <span className="inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                                            <Calendar className="mr-1 inline h-3 w-3" />
                                            Bắt đầu {formatter.date(course.start_date)}
                                        </span>
                                    ) : (
                                        <span className="text-primary inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-medium">
                                            Cập nhật {course.updated_at ? formatter.date(course.updated_at) : "N/A"}
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{course.lesson_count} bài học</span>
                                </div>

                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                    {course.description}
                                </p>

                                {isUpcoming && (
                                    <div className="mt-3 rounded-lg bg-blue-50 p-3">
                                        <div className="flex items-center gap-2 text-blue-700">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm font-medium">Khóa học sắp bắt đầu</span>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                                    {course.rating.average_rating > 0 && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Đánh giá học viên</span>
                                            <div className="flex items-center gap-1.5">
                                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {course.rating.average_rating}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    ({course.rating.total_reviews})
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {!course.is_enrolled && (
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs text-gray-500">
                                                {isUpcoming ? "Giá đăng ký sớm" : "Học phí"}
                                            </span>
                                            <div className="text-right">
                                                <span
                                                    className={` ${course.price === 0 ? "text-green-600" : "text-primary"} text-lg font-bold`}
                                                >
                                                    {course.price === 0
                                                        ? "Miễn phí"
                                                        : formatter.number(course.price ?? 0) + "đ"}
                                                </span>
                                                {course.price > 0 && (
                                                    <div className="text-xs text-gray-400 line-through">
                                                        {formatter.number((course.price ?? 0) * 1.3) + "đ"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default memo(DisplayCourse);
