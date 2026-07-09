"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STRIP_LEN = 10;

function buildStrip(target: string) {
    const strip: string[] = [];
    for (let i = 0; i < STRIP_LEN; i++) {
        strip.push(CHARSET[Math.floor(Math.random() * CHARSET.length)]);
    }
    strip.push(target === " " ? "\u00A0" : target);
    return strip;
}

function ReelChar({
    targetChar,
    triggerKey,
    columnDelay,
    charHeight,
    width,
    baselineOffset,
}: {
    targetChar: string;
    triggerKey: number;
    columnDelay: number;
    charHeight: number;
    width: number;
    baselineOffset: number;
}) {
    const dirRef = useRef<1 | -1>(1);
    const [strip, setStrip] = useState<string[]>([
        targetChar === " " ? "\u00A0" : targetChar,
    ]);
    const [animKey, setAnimKey] = useState(0);
    const [phase, setPhase] = useState<"idle" | "spin">("idle");

    useEffect(() => {
        if (triggerKey === 0) return;
        const t = setTimeout(() => {
            dirRef.current = Math.random() < 0.5 ? 1 : -1;
            const newStrip = buildStrip(targetChar);
            setStrip(dirRef.current === 1 ? newStrip : [...newStrip].reverse());
            setPhase("spin");
            setAnimKey((k) => k + 1);
        }, columnDelay);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerKey]);

    if (!charHeight || !width) {
        return (
            <span
                className="relative inline-block overflow-hidden text-center leading-none"
                style={{ width: `${width || 0}px`, height: "1em" }}
            >
                {targetChar === " " ? "\u00A0" : targetChar}
            </span>
        );
    }

    const dir = dirRef.current;
    const h = Math.round(charHeight);
    const finalIndex = dir === 1 ? strip.length - 1 : 0;
    const finalY = -(finalIndex * h);
    const startY = dir === 1 ? 0 : -((strip.length - 1) * h);
    const overshoot1 = Math.round(finalY - dir * h * 0.15);
    const overshoot2 = Math.round(finalY + dir * h * 0.05);

    return (
        <span
            className="relative inline-block overflow-hidden"
            style={{
                width: `${width}px`,
                height: `${h}px`,
                transform: `translateY(${baselineOffset}px)`,
            }}
        >
            <motion.span
                key={animKey}
                className="absolute left-0 top-0 w-full"
                initial={{ y: startY }}
                animate={
                    phase === "spin"
                        ? { y: [startY, overshoot1, overshoot2, finalY] }
                        : { y: finalY }
                }
                transition={
                    phase === "spin"
                        ? { duration: 2.8, times: [0, 0.8, 0.92, 1], ease: [0.16, 1, 0.3, 1] }
                        : { duration: 0 }
                }
                style={{ willChange: "transform" }}
            >
                {strip.map((c, i) => (
                    <span
                        key={i}
                        style={{
                            display: "block",
                            height: `${h}px`,
                            lineHeight: `${h}px`,
                            textAlign: "center",
                        }}
                    >
                        {c}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

interface SlotWordProps {
    words: string[];
    delay?: number;
    hold?: number;
    className?: string;
}

export function SlotWord({
    words,
    delay = 0.35,
    hold = 3000,
    className,
}: SlotWordProps) {
    const reduced = useReducedMotion();
    const maxLen = Math.max(...words.map((w) => w.length));
    const pad = (w: string) => w.padEnd(maxLen, " ");

    const [wordIdx, setWordIdx] = useState(0);
    const [triggerKey, setTriggerKey] = useState(0);
    const [started, setStarted] = useState(false);
    const [charHeight, setCharHeight] = useState(0);
    const [widths, setWidths] = useState<number[]>([]);
    const [maxWordWidth, setMaxWordWidth] = useState(0);
    const [baselineOffset, setBaselineOffset] = useState(0);

    const heightRef = useRef<HTMLSpanElement>(null);
    const measureWrapRef = useRef<HTMLSpanElement>(null);
    const measureAllRef = useRef<HTMLSpanElement>(null);
    const baselineARef = useRef<HTMLSpanElement>(null);
    const baselineBRef = useRef<HTMLSpanElement>(null);
    const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useLayoutEffect(() => {
        if (heightRef.current) {
            setCharHeight(heightRef.current.getBoundingClientRect().height);
        }
    }, []);

    // measure real per-letter widths of the CURRENT word
    useLayoutEffect(() => {
        if (!measureWrapRef.current) return;
        const spans = measureWrapRef.current.querySelectorAll("span");
        setWidths(Array.from(spans).map((s) => s.getBoundingClientRect().width));
    }, [wordIdx]);

    // measure the widest word across the whole set, once — used to lock container width
    useLayoutEffect(() => {
        if (!measureAllRef.current) return;
        const spans = measureAllRef.current.querySelectorAll("span[data-word]");
        let max = 0;
        spans.forEach((s) => {
            const w = s.getBoundingClientRect().width;
            if (w > max) max = w;
        });
        setMaxWordWidth(max);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.join("|")]);

    // measure the baseline correction: plain text baseline vs. our clipped-box baseline
    useLayoutEffect(() => {
        if (!charHeight || !baselineARef.current || !baselineBRef.current) return;
        const a = baselineARef.current.getBoundingClientRect();
        const b = baselineBRef.current.getBoundingClientRect();
        setBaselineOffset(a.top - b.top);
    }, [charHeight]);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay * 1000 + 700);
        return () => clearTimeout(t);
    }, [delay]);

    const spinTime = (maxLen - 1) * 160 + 2800;

    useEffect(() => {
        if (!started || reduced || words.length < 2 || !charHeight) return;

        function triggerSpin() {
            setWordIdx((i) => (i + 1) % words.length);
            setTriggerKey((k) => k + 1);
            loopTimer.current = setTimeout(triggerSpin, spinTime + hold);
        }

        loopTimer.current = setTimeout(triggerSpin, hold);
        return () => {
            if (loopTimer.current) clearTimeout(loopTimer.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started, reduced, words.length, charHeight]);

    const target = pad(words[wordIdx]).split("");
    const h = Math.round(charHeight);

    return (
        <span
            className={`relative inline-flex items-baseline ${className ?? ""}`}
            style={{ minWidth: maxWordWidth ? `${Math.ceil(maxWordWidth)}px` : undefined }}
        >
            {/* hidden: measures real font line-height in px */}
            <span
                ref={heightRef}
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 inline-block opacity-0"
            >
                M
            </span>
            {/* hidden: measures real per-letter widths of the current word */}
            <span
                ref={measureWrapRef}
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 inline-flex opacity-0"
            >
                {target.map((c, i) => (
                    <span key={i}>{c === " " ? "\u00A0" : c}</span>
                ))}
            </span>
            {/* hidden: measures widest word across the whole set, for fixed container width */}
            <span
                ref={measureAllRef}
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 opacity-0"
            >
                {words.map((w) => (
                    <span key={w} data-word style={{ display: "block", whiteSpace: "nowrap" }}>
                        {w}
                    </span>
                ))}
            </span>
            {/* hidden: measures baseline offset between plain text and a clipped box */}
            <span
                aria-hidden="true"
                style={{ display: "block", height: 0, overflow: "hidden" }}
            >
                <span ref={baselineARef} style={{ display: "inline-block" }}>
                    M
                </span>
                {charHeight > 0 && (
                    <span
                        ref={baselineBRef}
                        style={{ display: "inline-block", overflow: "hidden", height: `${h}px` }}
                    >
                        <span style={{ display: "block", height: `${h}px`, lineHeight: `${h}px` }}>
                            M
                        </span>
                    </span>
                )}
            </span>

            <span className="inline-flex items-baseline" aria-label={words[wordIdx]}>
                {target.map((c, i) => (
                    <ReelChar
                        key={i}
                        targetChar={c}
                        triggerKey={triggerKey}
                        columnDelay={i * 160}
                        charHeight={charHeight}
                        width={widths[i] ?? 0}
                        baselineOffset={baselineOffset}
                    />
                ))}
            </span>
        </span>
    );
}