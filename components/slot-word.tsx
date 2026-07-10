"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CHARSET = "abcdefghijklmnopqrstuvwxyz";
const SCRAMBLE = 9;
const SPIN_DUR = 1.9;
const SPIN_EASE = [0.16, 1, 0.3, 1] as const;

const rChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];
const nbsp = (c: string) => (c === " " ? "\u00A0" : c);
const buildStrip = (cur: string, tgt: string) =>
    [cur, ...Array.from({ length: SCRAMBLE }, rChar), tgt];

function ReelChar({
    targetChar, triggerKey, columnDelay, slotH, width,
}: {
    targetChar: string; triggerKey: number;
    columnDelay: number; slotH: number; width: number;
}) {
    const char = nbsp(targetChar);
    const [strip, setStrip] = useState([char]);
    const [boxWidth, setBoxWidth] = useState(width);
    const y = useMotionValue(0);
    const shown = useRef(char);
    const wRef = useRef(width);
    const anim = useRef<ReturnType<typeof animate> | null>(null);

    wRef.current = width;

    useEffect(() => {
        if (triggerKey === 0) setBoxWidth(width);
    }, [width]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (triggerKey === 0) return;
        const t = setTimeout(() => {
            const h = Math.round(slotH);
            const w = wRef.current;
            if (!h || !w) return;
            const next = nbsp(targetChar);
            const s = buildStrip(shown.current, next);
            anim.current?.stop();
            setStrip(s);
            setBoxWidth(w);
            y.set(0);
            anim.current = animate(y, -((s.length - 1) * h), {
                duration: SPIN_DUR,
                ease: SPIN_EASE,
                onComplete() { shown.current = next; setStrip([next]); y.set(0); },
            });
        }, columnDelay);
        return () => clearTimeout(t);
    }, [triggerKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const h = Math.round(slotH);

    return (
        <span style={{
            display: "inline-block", position: "relative", overflow: "hidden",
            width: `${boxWidth || 0}px`, height: `${h || 0}px`,
            verticalAlign: "bottom", flexShrink: 0,
        }}>
            {h > 0 && boxWidth > 0 && (
                <motion.span style={{
                    y, display: "block", position: "absolute",
                    inset: "0 auto auto 0", width: "100%", willChange: "transform",
                }}>
                    {strip.map((c, i) => (
                        <span key={i} style={{
                            display: "block", height: `${h}px`,
                            lineHeight: `${h}px`, textAlign: "center", overflow: "hidden",
                        }}>{c}</span>
                    ))}
                </motion.span>
            )}
        </span>
    );
}

export interface SlotWordProps {
    words: string[];
    delay?: number;
    hold?: number;
    className?: string;
    /** delta = actualWordWidth - maxWordWidth; snap = true on first call only */
    onWidthDelta?: (delta: number, snap: boolean) => void;
}

export function SlotWord({
    words, delay = 0.35, hold = 3000, className, onWidthDelta,
}: SlotWordProps) {
    const reduced = useReducedMotion();
    const maxLen = Math.max(...words.map((w) => w.length));
    const pad = (w: string) => w.padEnd(maxLen, " ");

    const [wordIdx, setWordIdx] = useState(0);
    const [triggerKey, setTriggerKey] = useState(0);
    const [started, setStarted] = useState(false);
    const [slotH, setSlotH] = useState(0);
    const [widths, setWidths] = useState<number[]>([]);
    const [maxWordWidth, setMaxWordWidth] = useState(0);
    const [actualWordWidths, setActualWordWidths] = useState<number[]>([]);

    const hRef = useRef<HTMLSpanElement>(null);
    const wrapRef = useRef<HTMLSpanElement>(null);
    const allRef = useRef<HTMLDivElement>(null);
    const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dotInit = useRef(false);

    useLayoutEffect(() => {
        if (hRef.current) setSlotH(hRef.current.getBoundingClientRect().height);
    }, []);

    useLayoutEffect(() => {
        if (!wrapRef.current) return;
        setWidths(Array.from(wrapRef.current.querySelectorAll("span"))
            .map((s) => s.getBoundingClientRect().width));
    }, [wordIdx]);

    const measureAll = () => {
        if (!allRef.current) return;
        const rows = Array.from(allRef.current.querySelectorAll<HTMLElement>("[data-word-row]"));
        let max = 0;
        const perWidths = rows.map((row, ri) => {
            const wl = words[ri]?.length ?? 0;
            const spans = Array.from(row.querySelectorAll("span"));
            let actual = 0, total = 0;
            spans.forEach((s, i) => {
                const w = s.getBoundingClientRect().width;
                total += w;
                if (i < wl) actual += w;
            });
            if (total > max) max = total;
            return actual;
        });
        setMaxWordWidth(max);
        setActualWordWidths(perWidths);
    };

    useLayoutEffect(measureAll, [words.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

    // Re-measure on resize so pixel widths stay accurate after orientation changes
    useEffect(() => {
        if (typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(() => {
            if (hRef.current) setSlotH(hRef.current.getBoundingClientRect().height);
            if (wrapRef.current)
                setWidths(Array.from(wrapRef.current.querySelectorAll("span"))
                    .map((s) => s.getBoundingClientRect().width));
            measureAll();
        });
        const el = allRef.current?.parentElement;
        if (el) ro.observe(el);
        return () => ro.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!actualWordWidths.length || !maxWordWidth || !onWidthDelta) return;
        const snap = !dotInit.current;
        if (snap) dotInit.current = true;
        onWidthDelta(actualWordWidths[wordIdx] - maxWordWidth, snap);
    }, [wordIdx, actualWordWidths, maxWordWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay * 1000 + 700);
        return () => clearTimeout(t);
    }, [delay]);

    const spinTime = (maxLen - 1) * 140 + SPIN_DUR * 1000;

    useEffect(() => {
        if (!started || reduced || words.length < 2 || !slotH) return;
        const spin = () => {
            setWordIdx((i) => (i + 1) % words.length);
            setTriggerKey((k) => k + 1);
            loopTimer.current = setTimeout(spin, spinTime + hold);
        };
        loopTimer.current = setTimeout(spin, hold);
        return () => { if (loopTimer.current) clearTimeout(loopTimer.current); };
    }, [started, reduced, words.length, slotH]); // eslint-disable-line react-hooks/exhaustive-deps

    const target = pad(words[wordIdx]).split("");
    const hidden = { position: "absolute" as const, visibility: "hidden" as const, pointerEvents: "none" as const };

    return (
        <span
            className={`relative inline-flex ${className ?? ""}`}
            style={{
                width: maxWordWidth ? `${Math.ceil(maxWordWidth)}px` : undefined,
                verticalAlign: "bottom", alignItems: "flex-end",
                transform: "translateY(0.01em)", overflow: "hidden",
            }}
        >
            {/* Screen-reader text (aria-label is not valid on a plain span) */}
            <span className="sr-only">{words[wordIdx]}</span>
            <span ref={hRef} aria-hidden="true"
                style={{ display: "inline-block", ...hidden }}>Mg</span>

            <span ref={wrapRef} aria-hidden="true"
                style={{ display: "inline-flex", ...hidden }}>
                {target.map((c, i) => (
                    <span key={i} style={{ lineHeight: 1 }}>{c === " " ? "\u00A0" : c}</span>
                ))}
            </span>

            <div ref={allRef} aria-hidden="true" style={hidden}>
                {words.map((w) => (
                    <div key={w} data-word-row style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
                        {pad(w).split("").map((c, i) => (
                            <span key={i} style={{ lineHeight: 1 }}>{c === " " ? "\u00A0" : c}</span>
                        ))}
                    </div>
                ))}
            </div>

            {target.map((c, i) => (
                <ReelChar
                    key={i}
                    targetChar={c}
                    triggerKey={triggerKey}
                    columnDelay={i * 140}
                    slotH={slotH}
                    width={widths[i] ?? 0}
                />
            ))}
        </span>
    );
}
