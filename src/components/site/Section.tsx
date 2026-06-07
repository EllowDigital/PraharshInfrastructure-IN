import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  dark = false,
  muted = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  dark?: boolean;
  muted?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const bg = dark ? "bg-navy text-white" : muted ? "bg-secondary" : "bg-background";
  return (
    <section className={`${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 xl:py-32">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-10 sm:mb-14 lg:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <div className={`eyebrow mb-4 ${dark ? "text-gold" : "text-gold"}`}>
                <span className="gold-rule mr-3 align-middle" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className={`text-4xl lg:text-5xl leading-[1.05] ${dark ? "text-white" : "text-navy"}`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-6 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
