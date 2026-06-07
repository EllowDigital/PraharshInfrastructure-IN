type PreloaderProps = {
  isVisible: boolean;
  progressLabel?: string;
};

export function Preloader({ isVisible, progressLabel = "Preparing experience" }: PreloaderProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-all duration-700 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="absolute inset-0 bg-navy-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.18),transparent_40%)]" />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="eyebrow text-gold mb-5">Praharsh Infrastructure</div>
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border border-gold/25" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-gold border-r-gold animate-spin" />
          <div className="absolute inset-[1.15rem] rounded-full bg-gold/10 shadow-[0_0_30px_rgba(212,160,23,0.18)]" />
        </div>
        <p className="mt-8 text-white/88 text-base sm:text-lg">{progressLabel}</p>
        <div className="mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
          <div className="preloader-bar h-full w-1/2 bg-gold" />
        </div>
      </div>
    </div>
  );
}
