export const TerminalCard = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#2b2b2b] shadow-[0_24px_60px_-24px_rgba(70,70,70,0.5)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-neutral-400">
          goodmanctl — alerts tail
        </span>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
        <p className="text-neutral-400">$ goodmanctl alerts tail</p>
        <p className="mt-3">
          <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-semibold text-red-400">
            CRITICAL
          </span>
          <span className="text-neutral-200"> dependency behavior drift</span>
        </p>
        <p className="mt-2 text-neutral-200">
          service <span className="text-neutral-500">·</span> demo-workload
        </p>
        <p className="text-neutral-200">
          package <span className="text-neutral-500">·</span>{" "}
          <span className="font-semibold text-white">good-pkg 1.0.0 → 1.0.1</span>
        </p>
        <p className="mt-2 text-[#febc2e]">+ NEW READ /run/secrets/credentials</p>
        <p className="text-[#febc2e]">+ NEW CONNECT 127.0.0.1:9999</p>
        <p className="mt-2 text-neutral-400">
          baseline learned over live traffic · 0 prior anomalies
        </p>
        <p className="mt-3 text-[#93cb52]">
          → attributed to good-pkg in &lt;3s. the package.json diff had no suspicious strings.
        </p>
      </div>
    </div>
  );
};
