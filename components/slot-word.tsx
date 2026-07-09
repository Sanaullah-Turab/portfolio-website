"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// ─── constants ────────────────────────────────────────────────────────────────
const CHARSET = "abcdefghijklmnopqrstuvwxyz";
const SCRAMBLE_COUNT = 9; // random chars between current and target

function randomChar() {
    return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

// Build: [current, rand×SCRAMBLE_COUNT, target]
// Starting at y=0 shows `current` → no pre-animation flash
function buildStrip(current: string, target: string): string[] {
    return [
        current,
        ...Array.from({ length: SCRAMBLE_COUNT }, randomChar),
        target,
    ];
}

// ─── ReelChar ─────────────────────────────────────────────────────────────────
function ReelChar({
    targetChar,
    triggerKey,
    columnDelay,
    slotH,
    width,
}: {
    targetChar: string;
    triggerKey: number;
    columnDelay: number;
    slotH: number;
    width: number;
}) {
    const ch = (c: string) => (c === " " ? "\u00A0" : c);

    // Single-item strip while idle → no ghost chars in DOM
    const [strip, setStrip] = useState<string[]>([ch(targetChar)]);
    const [boxWidth, setBoxWidth] = useState(width);

    // Imperative y — avoids key-remount flash
    const y = useMotionValue(0);

    // Always-fresh refs so async callbacks never capture stale closure values
    const shownRef = useRef(ch(targetChar)); // what is visible right now
    const widthRef = useRef(width);          // latest column width
    const animRef = useRef<ReturnType<typeof animate> | null>(null);

    // Keep widthRef up-to-date every render
    widthRef.current = width;

    // Sync boxWidth before any trigger fires
    useEffect(() => {
        if (triggerKey === 0) setBoxWidth(width);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    useEffect(() => {
        if (triggerKey === 0) return;

        const timer = setTimeout(() => {
            const h = Math.round(slotH);
            const w = widthRef.current; // always the latest width
            if (!h || !w) return;

            const newTarget = ch(targetChar);
            const newStrip = buildStrip(shownRef.current, newTarget);
            const finalY = -((newStrip.length - 1) * h);

            // Cancel any in-progress animation
            animRef.current?.stop();

            // Update strip & width; snap y to 0 → shows shownRef.current
            setStrip(newStrip);
            setBoxWidth(w);
            y.set(0);

            // Scroll down to the new target
            animRef.current = animate(y, finalY, {
                duration: 1.9,
                ease: [0.16, 1, 0.3, 1],
                onComplete() {
                    // Collapse strip back to a single item → zero ghost chars
                    shownRef.current = newTarget;
                    setStrip([newTarget]);
                    y.set(0);
                },
            });
        }, columnDelay);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerKey]);

    const h = Math.round(slotH);

    // Before measurements are ready, render invisible placeholder
    if (!h || !boxWidth) {
        return (
            <span
                style={{
                    display: "inline-block",
                    width: `${boxWidth || 0}px`,
                    height: `${h || 0}px`,
                    verticalAlign: "bottom",
                }}
            />
        );
    }

    return (
        <span
            style={{
                display: "inline-block",
                position: "relative",
                overflow: "hidden",
                width: `${boxWidth}px`,
                height: `${h}px`,
                verticalAlign: "bottom",
                flexShrink: 0,
            }}
        >
            <motion.span
                style={{
                    y,
                    display: "block",
                    position: "absolute",
                    inset: "0 auto auto 0",
                    width: "100%",
                    willChange: "transform",
                }}
            >
                {strip.map((c, i) => (
                    <span
                        key={i}
                        style={{
                            display: "block",
                            height: `${h}px`,
                            lineHeight: `${h}px`,
                            textAlign: "center",
                            overflow: "hidden",
                        }}
                    >
                        {c}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

// ─── SlotWord ─────────────────────────────────────────────────────────────────
interface SlotWordProps {
    words: string[];
    delay?: number;
    hold?: number;
    className?: string;
    /** Called with (actualWidth - maxWidth) whenever the displayed word changes.
     *  Negative = current word is narrower than the widest word. */
    onWidthDelta?: (delta: number, snap: boolean) => void;
}

export function SlotWord({
    words,
    delay = 0.35,
    hold = 3000,
    className,
    onWidthDelta,
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

    const heightRef = useRef<HTMLSpanElement>(null);
    const measureWrapRef = useRef<HTMLSpanElement>(null);
    const measureAllRef = useRef<HTMLDivElement>(null);
    const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dotInitRef = useRef(false);

    // Measure slot height with line-height:1 so it isn't squashed by the h1's
    // leading-[0.95] — characters with descenders won't be clipped.
    useLayoutEffect(() => {
        if (heightRef.current) {
            setSlotH(heightRef.current.getBoundingClientRect().height);
        }
    }, []);

    // Per-letter widths of the CURRENT word
    useLayoutEffect(() => {
        if (!measureWrapRef.current) return;
        const spans = measureWrapRef.current.querySelectorAll("span");
        setWidths(Array.from(spans).map((s) => s.getBoundingClientRect().width));
    }, [wordIdx]);

    // Max total width across all padded words + actual per-word widths
    useLayoutEffect(() => {
        if (!measureAllRef.current) return;
        const rows = Array.from(measureAllRef.current.querySelectorAll("[data-word-row]"));
        let max = 0;
        const perWordWidths: number[] = [];
        rows.forEach((row, rowIdx) => {
            const wordLen = words[rowIdx]?.length ?? 0;
            const spans = Array.from(row.querySelectorAll("span"));
            let actual = 0;
            let total = 0;
            spans.forEach((s, i) => {
                const w = s.getBoundingClientRect().width;
                total += w;
                if (i < wordLen) actual += w;
            });
            perWordWidths.push(actual);
            if (total > max) max = total;
        });
        setMaxWordWidth(max);
        setActualWordWidths(perWordWidths);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.join("|")]);

    // Report actual width delta to parent whenever word or measurements change
    useEffect(() => {
        if (actualWordWidths.length === 0 || maxWordWidth === 0 || !onWidthDelta) return;
        const delta = actualWordWidths[wordIdx] - maxWordWidth;
        const snap = !dotInitRef.current;
        if (snap) dotInitRef.current = true;
        onWidthDelta(delta, snap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordIdx, actualWordWidths, maxWordWidth]);

    // Start cycling after the page-load reveal animation finishes
    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay * 1000 + 700);
        return () => clearTimeout(t);
    }, [delay]);

    const spinTime = (maxLen - 1) * 140 + 1900;

    useEffect(() => {
        if (!started || reduced || words.length < 2 || !slotH) return;

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
    }, [started, reduced, words.length, slotH]);

    const target = pad(words[wordIdx]).split("");

    return (
        <span
            className={`relative inline-flex ${className ?? ""}`}
            style={{
                // Fixed width — never changes → the Dot never shifts horizontally
                width: maxWordWidth ? `${Math.ceil(maxWordWidth)}px` : undefined,
                verticalAlign: "bottom",
                alignItems: "flex-end",
                transform: "translateY(0.01em)",
                // Clip staggered column-width overflows so they never bleed into the Dot
                overflow: "hidden",
            }}
            aria-label={words[wordIdx]}
        >
            {/* ── hidden measurement spans ─────────────────────────────── */}

            {/* Slot height: inherit line-height from h1 so slot matches the actual line box */}
            <span
                ref={heightRef}
                aria-hidden="true"
                style={{
                    display: "inline-block",
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                Mg
            </span>

            {/* Current word per-letter widths */}
            <span
                ref={measureWrapRef}
                aria-hidden="true"
                style={{
                    display: "inline-flex",
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                {target.map((c, i) => (
                    <span key={i} style={{ lineHeight: 1 }}>
                        {c === " " ? "\u00A0" : c}
                    </span>
                ))}
            </span>

            {/* All padded words — find widest total */}
            <div
                ref={measureAllRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                {words.map((w) => (
                    <div
                        key={w}
                        data-word-row
                        style={{ display: "inline-flex", whiteSpace: "nowrap" }}
                    >
                        {pad(w)
                            .split("")
                            .map((c, i) => (
                                <span key={i} style={{ lineHeight: 1 }}>
                                    {c === " " ? "\u00A0" : c}
                                </span>
                            ))}
                    </div>
                ))}
            </div>

            {/* ── visible reel columns ─────────────────────────────────── */}
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