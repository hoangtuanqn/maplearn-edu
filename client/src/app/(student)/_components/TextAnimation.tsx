import { motion } from "framer-motion";

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.05,
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function TextAnimation({ title, className }: { title: string; className?: string }) {
    return (
        <motion.span variants={sentence} initial="hidden" animate="visible" className={className}>
            {title.split("").map((char, index) => (
                <motion.span key={index} variants={letter}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
