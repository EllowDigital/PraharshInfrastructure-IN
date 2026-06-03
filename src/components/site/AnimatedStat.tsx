import { useCountUp } from "@/hooks/use-count-up";

type AnimatedStatProps = {
  value: string;
  label: string;
};

export function AnimatedStat({ value, label }: AnimatedStatProps) {
  const numericValue = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const { targetRef, value: currentValue } = useCountUp({
    end: Number.isNaN(numericValue) ? 0 : numericValue,
  });

  return (
    <div ref={targetRef}>
      <div className="font-display text-5xl lg:text-6xl text-gold tabular-nums leading-none">
        {currentValue}
        {suffix}
      </div>
      <div className="text-xs text-white/65 mt-3 tracking-widest uppercase">{label}</div>
    </div>
  );
}
