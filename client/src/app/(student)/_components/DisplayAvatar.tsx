"use client";
import Image from "next/image";
import React from "react";
import { getCharacterName } from "~/libs/hepler";

const DisplayAvatar = ({
    ratio = "24",
    avatar,
    fullName = "Vô Danh",
}: {
    ratio: string;
    avatar?: string | undefined | null;
    fullName: string | undefined | null;
}) => {
    return (
        <>
            {avatar ? (
                <Image
                    src={avatar}
                    alt={fullName || "Avatar"}
                    width={96}
                    height={96}
                    className={`size-${ratio} border-primary aspect-square shrink-0 items-center justify-center rounded-full border-2 object-cover`}
                />
            ) : (
                <div
                    className={`size-${ratio} border-primary aspect-square shrink-0 items-center justify-center rounded-full border-2 object-cover`}
                >
                    {getCharacterName(fullName || "Vô Danh")}
                </div>
            )}
        </>
    );
};

export default DisplayAvatar;
