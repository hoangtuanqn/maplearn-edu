"use client";
import React from "react";
import QRCodeComponent from "react-qr-code";

type QRProps = {
    url?: string;
    label?: string;
    className?: string;
    size?: number;
};

export default function QRCodeBadge({
    url = "https://maplearn.vn/verify/demo-0001",
    label = "Scan to verify",
    className = "",
    size = 56,
}: QRProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-1 ${className}`}
        >
            <div className="rounded-lg border-2 border-indigo-500/30 bg-white p-2 shadow-lg transition-transform group-hover:scale-[1.03]">
                <QRCodeComponent
                    value={url}
                    size={size}
                    style={{ width: size, height: size }}
                    bgColor="#ffffff"
                    fgColor="#1e293b"
                />
            </div>
            <span className="text-[11px] font-medium tracking-wide text-slate-600 group-hover:text-indigo-700">
                {label}
            </span>
        </a>
    );
}
