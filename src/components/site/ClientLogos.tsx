import aramcoSvg from "@/assets/logos/aramco.svg";
import sabicSvg from "@/assets/logos/sabic.svg";
import secSvg from "@/assets/logos/sec.svg";
import maadenSvg from "@/assets/logos/maaden.svg";
import stcSvg from "@/assets/logos/stc.svg";
import mobilySvg from "@/assets/logos/mobily.svg";
import zainSvg from "@/assets/logos/zain.svg";
import saudiaSvg from "@/assets/logos/saudia.svg";
import neomSvg from "@/assets/logos/neom.svg";
import sipchemSvg from "@/assets/logos/sipchem.svg";
import yasrefSvg from "@/assets/logos/yasref.svg";
import redseaSvg from "@/assets/logos/redsea.svg";
import saharaSvg from "@/assets/logos/sahara.svg";
import sioPng from "@/assets/logos/sio.png";

type LogoProps = { className?: string };

const base = "h-full w-full object-contain";

export const AramcoLogo = ({ className }: LogoProps) => (
  <img src={aramcoSvg} className={className ?? base} alt="Saudi Aramco" loading="lazy" />
);

export const SabicLogo = ({ className }: LogoProps) => (
  <img src={sabicSvg} className={className ?? base} alt="SABIC" loading="lazy" />
);

export const SecLogo = ({ className }: LogoProps) => (
  <img src={secSvg} className={className ?? base} alt="Saudi Electricity Company" loading="lazy" />
);

export const MaadenLogo = ({ className }: LogoProps) => (
  <img src={maadenSvg} className={className ?? base} alt="Ma'aden" loading="lazy" />
);

export const StcLogo = ({ className }: LogoProps) => (
  <img src={stcSvg} className={className ?? base} alt="stc" loading="lazy" />
);

export const MobilyLogo = ({ className }: LogoProps) => (
  <img src={mobilySvg} className={className ?? base} alt="Mobily" loading="lazy" />
);

export const ZainLogo = ({ className }: LogoProps) => (
  <img src={zainSvg} className={className ?? base} alt="Zain" loading="lazy" />
);

export const SaudiaLogo = ({ className }: LogoProps) => (
  <img src={saudiaSvg} className={className ?? base} alt="SAUDIA" loading="lazy" />
);

export const NeomLogo = ({ className }: LogoProps) => (
  <img src={neomSvg} className={className ?? base} alt="NEOM" loading="lazy" />
);

export const SipchemLogo = ({ className }: LogoProps) => (
  <img src={sipchemSvg} className={className ?? base} alt="Sipchem" loading="lazy" />
);

export const YasrefLogo = ({ className }: LogoProps) => (
  <img src={yasrefSvg} className={className ?? base} alt="Yasref" loading="lazy" />
);

export const RedSeaLogo = ({ className }: LogoProps) => (
  <img src={redseaSvg} className={className ?? base} alt="Red Sea Global" loading="lazy" />
);

export const SaharaLogo = ({ className }: LogoProps) => (
  <img src={saharaSvg} className={className ?? base} alt="Sahara" loading="lazy" />
);

export const SioLogo = ({ className }: LogoProps) => (
  <img
    src={sioPng}
    className={className ?? base}
    alt="Saudi Irrigation Organization"
    loading="lazy"
  />
);
