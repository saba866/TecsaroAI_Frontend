// components/ui/icons.tsx

export function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1C7 1 5 4 5 7C5 10 7 13 7 13M7 1C7 1 9 4 9 7C9 10 7 13 7 13M1 7H13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

export function Spinner({ size = 15 }: { size?: number }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
      <path d="M13 7.5a5.5 5.5 0 00-5.5-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ErrorMsg({ msg, onRetry }: { msg: string; onRetry?: () => void }) {
  return (
    <div className="mt-1.5 flex flex-col gap-1.5">
      <p className="flex items-center gap-1.5 text-xs text-red-400">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M5.5 3.5V5.8M5.5 7.5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        {msg}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-red-400/70 underline underline-offset-2 hover:text-red-400 text-left"
        >
          Try again
        </button>
      )}
    </div>
  );
}