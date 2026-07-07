"use client";

import { motion } from "framer-motion";

export function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{ verticalAlign: "baseline" }}
      className="relative inline-block ml-[0.08em] h-[0.18em] w-[0.18em] shrink-0 z-[60]"
    >
      <motion.span
        className="absolute left-1/2 top-1/2 block h-full w-full rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
        style={{
          boxShadow:
            "0 0 0.3em 0.12em oklch(0.78 0.155 70 / 0.6), 0 0 0.7em 0.25em oklch(0.78 0.155 70 / 0.25)",
        }}
        initial={{ scale: 220 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.005, 1.176, 0.314, 0.94],
        }}
      />
    </span>
  );
}


