type PreloaderProps = {
  isVisible: boolean;
  progressLabel?: string;
};

export function Preloader({ isVisible, progressLabel = "Loading..." }: PreloaderProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-all duration-700 bg-navy-deep ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <img
          src="/images/logo.jpeg"
          alt="Praharsh Infrastructure"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md animate-pulse mb-8 shadow-2xl"
        />
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
        </div>
        <p className="mt-6 text-white/70 text-sm tracking-widest uppercase font-medium">{progressLabel}</p>
      </div>
    </div>
  );
}
