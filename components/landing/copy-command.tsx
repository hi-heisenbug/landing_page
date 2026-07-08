"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export const CopyCommand = ({ label, command }: { label: string; command: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. non-secure context) — ignore
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-[0_16px_40px_-20px_rgba(70,70,70,0.25)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-xs text-neutral-400">{label}</p>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="text-neutral-400 transition-colors hover:text-white"
        >
          {copied ? <CheckIcon className="size-4 text-[#93cb52]" /> : <CopyIcon className="size-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-neutral-200 sm:text-sm">
        {command}
      </pre>
    </div>
  );
};
