import { useState } from "react";
import { Play } from "lucide-react";

export function PromoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-ink shadow-emil">
      {playing ? (
        <video
          className="h-full w-full object-cover"
          src="/videos/company-promo.mp4"
          poster="/videos/company-promo-poster.jpg"
          controls
          autoPlay
          playsInline
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play company video"
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src="/videos/company-promo-poster.jpg"
            alt="SILSILAT AL-THIQA — company video"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 md:h-8 md:w-8 ms-1" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
