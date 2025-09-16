"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkBreaks from "remark-breaks";

const RenderLatex = ({ content }: { content: string }) => {
    if (!content) return null;
    const cleanedContent = content.replace(/\\\\/g, "\\");
    const markdownContent = cleanedContent
        .replace(/\\\((.*?)\\\)/gs, (_, math) => {
            const fixedMath = math.replace(/\\\\/g, "\\");
            return `$${fixedMath}$`;
        })
        .replace(/\\\[(.*?)\\\]/gs, (_, math) => {
            const fixedMath = math.replace(/\\\\/g, "\\");
            return `$$${fixedMath}$$`;
        });

    // 3️⃣ Nếu muốn xuống dòng theo Markdown, thêm 2 space trước newline
    const finalContent = markdownContent.replace(/\\n/g, "  \n").replaceAll("\\$\\$", "");

    return (
        <ReactMarkdown remarkPlugins={[remarkMath, remarkBreaks]} rehypePlugins={[rehypeKatex]}>
            {finalContent}
        </ReactMarkdown>
    );
};
export default RenderLatex;
