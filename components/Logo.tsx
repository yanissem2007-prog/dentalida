export default function Logo({ size = 40, ring = true }: { size?: number; ring?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {ring && <circle cx="100" cy="100" r="98" fill="#1e88d8" />}
      <circle cx="100" cy="100" r={ring ? 82 : 98} fill="#ffffff" />
      <path
        d="M100 40 C 82 40, 72 52, 72 68 C 72 76, 76 82, 82 86 L 84 100 L 116 100 L 118 86 C 124 82, 128 76, 128 68 C 128 52, 118 40, 100 40 Z M 92 50 C 88 50, 86 54, 88 58 L 92 66"
        fill="none"
        stroke="#1e88d8"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M50 130 C 70 110, 90 108, 100 116" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 130 C 130 110, 110 108, 100 116" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
      <rect x="92" y="100" width="16" height="48" rx="2" fill="#2a2a2a" />
      <line x1="92" y1="110" x2="108" y2="110" stroke="#ffffff" strokeWidth="2" />
      <line x1="92" y1="118" x2="108" y2="118" stroke="#ffffff" strokeWidth="2" />
      <line x1="92" y1="126" x2="108" y2="126" stroke="#ffffff" strokeWidth="2" />
      <line x1="92" y1="134" x2="108" y2="134" stroke="#ffffff" strokeWidth="2" />
      <line x1="92" y1="142" x2="108" y2="142" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}
