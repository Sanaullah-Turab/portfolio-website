"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/nav-links";

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
              >
                {/* Header Section */}
                <div className="relative flex items-center justify-between px-6 py-4">
                  <a
                    href="#top"
                    onClick={() => setOpen(false)}
                    className="font-mono text-sm tracking-tight"
                  >
                    ST<span className="text-primary">.</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>

                  {/* Animated Underline */}
                  <motion.div
                    initial={reduced ? { opacity: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={reduced ? { opacity: 0 } : { scaleX: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.6,
                      delay: reduced ? 0 : 0.2, // Waits slightly for the menu fade-in to begin
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ 
                      originX: 0,
                      boxShadow: '0 0 4px 1px oklch(0.78 0.155 70 / 0.7), 0 0 10px 2px oklch(0.78 0.155 70 / 0.35)',
                    }}
                    className="absolute bottom-0 left-0 h-px w-full bg-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Navigation Section */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-1 items-center px-6"
                >
                  <ul className="flex w-full flex-col gap-2">
                    {links.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={
                          reduced ? { opacity: 1 } : { opacity: 0, y: 20 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.5,
                          delay: reduced ? 0 : i * 0.07 + 0.1, // Added a slight offset to sync well with the underline
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline gap-4 py-3 text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
                        >
                          <span
                            className="font-mono text-xs text-primary transition-colors"
                            style={{
                              textShadow: '0 0 0.6em oklch(0.78 0.155 70 / 0.9), 0 0 1.8em oklch(0.78 0.155 70 / 0.5)',
                            }}
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span style={{
                            textShadow: '0 0 0.8em oklch(0.78 0.155 70 / 0.45), 0 0 2.4em oklch(0.78 0.155 70 / 0.2)',
                          }}>
                            {link.label}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer Section */}
                <motion.div
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.5,
                    delay: reduced ? 0 : 0.4,
                  }}
                  className="px-6 pb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Fullstack → AI/ML Engineer
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
