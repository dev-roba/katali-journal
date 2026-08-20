import { useState } from "react";
import { categoryMeta, coverFor } from "../data/posts";

const PALETTES = {
  engineering: ["#0e1f26", "#123038", "#2f6e6b", "#7fc4bd"],
  design: ["#1d1626", "#2b1c38", "#7a4d9e", "#c9a9e8"],
  culture: ["#241a0e", "#331f0a", "#a06a22", "#e5a94b"],
  travel: ["#101c12", "#1a2b18", "#4f7a4a", "#9db08d"],
  product: ["#251318", "#361a22", "#8c3d55", "#e89ab0"],
  practice: ["#17130e", "#241e16", "#75684f", "#a89d8a"],
};

const MOTIFS = ["rings", "arcs", "stripe", "dots", "grid", "tri"];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function SvgCover({ slug, category, title, className = "", width = 800, height = 600 }) {
  const palette = PALETTES[category] ?? PALETTES.practice;
  const seed = hash(slug);
  const motif = MOTIFS[seed % MOTIFS.length];
  const [c0, c1, c2, c3] = palette;
  const ang = (seed % 360) * 1;
  const ringCount = 3 + (seed % 4);

  const motifEl =
    motif === "rings" ? (
      <g fill="none" stroke={c3} strokeOpacity="0.28" strokeWidth="2">
        {Array.from({ length: ringCount }).map((_, i) => (
          <circle key={i} cx={820 - i * 130} cy={120 + i * 90} r={90 + i * 95} />
        ))}
      </g>
    ) : motif === "arcs" ? (
      <g fill="none" stroke={c3} strokeOpacity="0.3" strokeWidth="14" strokeLinecap="round">
        <path d="M -40 620 A 420 420 0 0 1 620 -40" />
        <path d="M 80 720 A 420 420 0 0 1 720 -40" strokeWidth="5" strokeOpacity="0.5" />
        <path d="M 180 760 A 360 360 0 0 1 760 -40" strokeWidth="9" strokeOpacity="0.22" />
      </g>
    ) : motif === "stripe" ? (
      <g fill={c3} opacity="0.14">
        <rect x="-80" y="460" width="900" height="34" transform="rotate(-14 420 300)" />
        <rect x="-40" y="520" width="1000" height="18" transform="rotate(-14 420 300)" />
        <rect x="140" y="40" width="700" height="60" transform="rotate(-14 420 300)" opacity="0.5" />
      </g>
    ) : motif === "dots" ? (
      <g fill={c2}>
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={110 + (i % 3) * 150 + (seed % 40)} cy={150 + Math.floor(i / 3) * 150} r={4 + (seed % (i + 2))} opacity="0.35" />
        ))}
      </g>
    ) : motif === "grid" ? (
      <g stroke={c3} strokeOpacity="0.16" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={-100 + i * 130} y1="620" x2={900 - i * 60 + i * 130} y2="-60" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="-40" y1={-80 + i * 150} x2="860" y2={20 + i * 150} />
        ))}
      </g>
    ) : (
      <g fill={c3} opacity="0.22">
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 120 + i * 95;
          const y = 520 - i * 52;
          return <polygon key={i} points={`${x},${y} ${x + 44},${y + 76} ${x + 88},${y}`} />;
        })}
      </g>
    );

  const initial = String(title.trim()[0] ?? "").toUpperCase();

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Cover artwork for ${title}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id={`g-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c0} />
          <stop offset="55%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`h-${slug}`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`n-${slug}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#g-${slug})`} />
      <rect width="100%" height="100%" fill={`url(#h-${slug})`} />
      <g transform={`rotate(${ang} 400 300)`} opacity="0.9">
        {motifEl}
      </g>
      <rect width="100%" height="100%" filter={`url(#n-${slug})`} opacity="0.05" style={{ mixBlendMode: "overlay" }} />
      <text x={width} y={height - 28} fontFamily="Fraunces, Georgia, serif" fontSize={height / 3} fontWeight="600" fill="#000000" opacity="0.12" textAnchor="end">
        {initial}
      </text>
    </svg>
  );
}

export default function Cover({ slug, category, title, className = "", width = 800, height = 600, eager = false, photo }) {
  const [failed, setFailed] = useState(false);
  const src = photo === undefined ? coverFor(slug) : photo;

  if (src && !failed) {
    return (
      <img
        src={`/${src.replace(/^\//, "")}`}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <SvgCover
      slug={slug}
      category={category}
      title={title}
      width={width}
      height={height}
      className={`absolute inset-0 ${className}`}
    />
  );
}