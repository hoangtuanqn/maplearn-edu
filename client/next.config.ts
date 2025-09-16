import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.sgp1.digitaloceanspaces.com",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "qr.sepay.vn",
            },
            {
                protocol: "https",
                hostname: "*.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
