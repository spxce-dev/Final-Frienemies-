import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (shadcn/ui standard).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * True if running inside an iframe.
 * Guarded for environments where `window` is unavailable.
 */
export const isIframe =
  typeof window !== "undefined" && window.self !== window.top;
