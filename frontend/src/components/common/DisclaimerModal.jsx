import { useEffect, useState } from "react";

export default function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("seenDisclaimer");
    if (!seen) setShow(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem("seenDisclaimer", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-sm w-full mx-4 shadow-sm">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-500" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="8" cy="11.5" r="0.7" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[15px] font-medium text-zinc-900 dark:text-zinc-100">Heads up</span>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          This is an early MVP of{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">TokenMitra</span>. Some
          numbers — like doctor and user counts — are{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">placeholder data</span> to
          demonstrate the product experience.
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed mt-3 mb-6">
          Real data will be reflected as the platform grows.
        </p>

        {/* CTA */}
        <button
          onClick={handleClose}
          className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}