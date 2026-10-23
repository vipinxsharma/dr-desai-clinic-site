"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/config/site";
import { CheckIcon, CopyIcon } from "./Icons";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / insecure contexts.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

/** Copies the clinic email. Shows "Copied" for 2 seconds; announced politely to screen readers. */
export function CopyEmailButton({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "sm" | "md" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function onClick() {
    if (!(await copyText(EMAIL))) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  const look = tone === "dark" ? "border-white/25 text-white hover:bg-white/10" : "border-teal-800 bg-white text-teal-800 hover:bg-teal-50";
  const dims = size === "sm" ? "min-h-[44px] px-3 text-[14px]" : "min-h-[44px] px-4 text-[16px]";
  return (
    <>
      <button type="button" onClick={onClick} className={`fx-btn inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-bold ${look} ${dims}`} data-copy-email>
        {copied ? <CheckIcon className="fx-check h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" role="status" aria-live="polite" data-copy-status>{copied ? "Email address copied" : ""}</span>
    </>
  );
}
