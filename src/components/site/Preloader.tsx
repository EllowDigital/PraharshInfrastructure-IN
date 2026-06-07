import { useEffect, useState } from "react";

type PreloaderProps = {
  isVisible: boolean;
  progressLabel?: string;
};

export function Preloader({ isVisible }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="w-full max-w-[180px] sm:max-w-[200px] flex flex-col items-center gap-8">
        <img
          src="/images/logo.jpeg"
          alt="Praharsh Infrastructure"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md shadow-2xl animate-in fade-in zoom-in duration-700"
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
