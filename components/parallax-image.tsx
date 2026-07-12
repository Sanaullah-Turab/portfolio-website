"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    range?: [string, string];
};

export function ParallaxImage({
    src,
    alt,
    width,
    height,
    className,
    range = ["-6%", "6%"],
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], range);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden rounded-md border border-border ${className ?? ""}`}
        >
            <motion.div style={{ y }} className="scale-110">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full object-cover"
                />
            </motion.div>
        </div>
    );
}