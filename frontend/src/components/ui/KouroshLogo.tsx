// Kourosh Panel brand mark: a minimal Faravahar-inspired winged emblem.
interface Props {
  size?: number;
  className?: string;
}

export default function KouroshLogo({ size = 36, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kourosh Panel"
    >
      <defs>
        <linearGradient id="kpGold" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e8c547" />
          <stop offset="0.5" stopColor="#c9a227" />
          <stop offset="1" stopColor="#9a7b1a" />
        </linearGradient>
      </defs>
      {/* ring */}
      <circle cx="32" cy="30" r="9" stroke="url(#kpGold)" strokeWidth="2.6" />
      {/* left wing */}
      <path
        d="M22 30c-6-1-12-4-17-9 4 1 7 1 10 0-3-2-5-4-7-7 4 2 8 3 12 3 1 4 1 9 2 13z"
        fill="url(#kpGold)"
      />
      {/* right wing */}
      <path
        d="M42 30c6-1 12-4 17-9-4 1-7 1-10 0 3-2 5-4 7-7-4 2-8 3-12 3-1 4-1 9-2 13z"
        fill="url(#kpGold)"
      />
      {/* tail feathers */}
      <path
        d="M27 40c1 5 2 8 5 12 3-4 4-7 5-12-1.6 1-3.2 1.5-5 1.5s-3.4-.5-5-1.5z"
        fill="url(#kpGold)"
      />
      {/* crown dot */}
      <circle cx="32" cy="17" r="2.4" fill="url(#kpGold)" />
    </svg>
  );
}
