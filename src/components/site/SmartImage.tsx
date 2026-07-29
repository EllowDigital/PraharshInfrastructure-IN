import { useState, ImgHTMLAttributes, CSSProperties } from "react";

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** When true, image is above-the-fold — eager load + high fetch priority. */
  priority?: boolean;
  /** Aspect ratio used to reserve space and prevent CLS (e.g. "16/9", "4/5"). */
  aspect?: string;
  /** Wrapper className (skeleton box). Use `className` for the <img> itself. */
  wrapperClassName?: string;
  /** Skeleton background color while loading. */
  skeletonColor?: string;
};

/**
 * SmartImage — production-ready <img> with:
 * - lazy loading by default, priority hint for above-the-fold
 * - async decode
 * - skeleton placeholder that reserves space (no CLS)
 * - graceful fade-in on load
 */
export function SmartImage({
  priority = false,
  aspect,
  wrapperClassName = "",
  skeletonColor = "rgba(11,31,77,0.08)",
  className = "",
  onLoad,
  onError,
  style,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  const wrapperStyle: CSSProperties = {
    background: loaded ? "transparent" : skeletonColor,
    aspectRatio: aspect,
  };

  return (
    <span
      className={`relative block overflow-hidden ${wrapperClassName}`}
      style={wrapperStyle}
      aria-hidden={rest["aria-hidden"] as boolean | undefined}
    >
      {!loaded && (
        <span
          className="absolute inset-0 animate-pulse"
          style={{ background: skeletonColor }}
          aria-hidden="true"
        />
      )}
      <img
        {...rest}
        loading={priority ? "eager" : rest.loading ?? "lazy"}
        // @ts-expect-error React 18 supports lowercase attribute
        fetchpriority={priority ? "high" : rest.fetchPriority ?? "auto"}
        decoding={priority ? "sync" : "async"}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={style}
      />
    </span>
  );
}

export default SmartImage;
