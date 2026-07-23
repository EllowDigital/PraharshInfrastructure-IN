import { useEffect, useState } from "react";

type PreloaderProps = {
  isVisible: boolean;
  progressLabel?: string;
};

export function Preloader({ isVisible }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      return;
    }
    const t = window.setTimeout(() => setShouldRender(false), 500);
    return () => window.clearTimeout(t);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + Math.random() * 15));
    }, 150);
    return () => window.clearInterval(timer);
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isVisible}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-[180px] sm:max-w-[200px] flex flex-col items-center gap-8">
        <img
          src="/images/logo.jpeg"
          alt="Praharsh Infrastructure"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md shadow-2xl"
        />
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
