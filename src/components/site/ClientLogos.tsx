// Stylized text-mark "logos" for major Saudi industrial operators.
// Rendered as SVG so they scale crisply on dark backgrounds without copyright risk.

type LogoProps = { className?: string };

const base = "h-full w-full";

export const SabicLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className ?? base} fill="none" aria-label="SABIC">
    <text x="0" y="42" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="40" fill="currentColor" letterSpacing="-1">sabic</text>
    <circle cx="195" cy="20" r="10" fill="currentColor" opacity="0.85" />
  </svg>
);

export const AramcoLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 60" className={className ?? base} fill="none" aria-label="Saudi Aramco">
    <text x="0" y="22" fontFamily="Sora, sans-serif" fontWeight="600" fontSize="13" fill="currentColor" opacity="0.7" letterSpacing="2">العربية السعودية</text>
    <text x="0" y="50" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="26" fill="currentColor" letterSpacing="-0.5">saudi aramco</text>
  </svg>
);

export const MaadenLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className ?? base} fill="none" aria-label="Ma'aden">
    <path d="M10 32 L20 12 L30 32 L20 52 Z" fill="currentColor" opacity="0.9" />
    <text x="42" y="42" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="32" fill="currentColor" letterSpacing="2">MA'ADEN</text>
  </svg>
);

export const SipchemLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className ?? base} fill="none" aria-label="Sipchem">
    <circle cx="22" cy="30" r="14" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="22" cy="30" r="5" fill="currentColor" />
    <text x="48" y="26" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="20" fill="currentColor">Sipchem</text>
    <text x="48" y="48" fontFamily="Sora, sans-serif" fontWeight="500" fontSize="11" fill="currentColor" opacity="0.7" letterSpacing="1">PETROCHEMICALS</text>
  </svg>
);

export const YasrefLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className ?? base} fill="none" aria-label="Yasref">
    <path d="M12 12 L28 30 L12 48 M22 12 L38 30 L22 48" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    <text x="52" y="42" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" letterSpacing="-0.5">Yasref</text>
  </svg>
);

export const SecLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 60" className={className ?? base} fill="none" aria-label="Saudi Electricity">
    <path d="M14 8 L8 32 L18 32 L14 52 L26 24 L16 24 Z" fill="currentColor" />
    <text x="36" y="28" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="14" fill="currentColor">SAUDI</text>
    <text x="36" y="46" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="14" fill="currentColor">ELECTRICITY</text>
  </svg>
);
