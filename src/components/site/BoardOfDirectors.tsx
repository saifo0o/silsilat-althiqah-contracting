import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";

// Import images (ensure these exist in your src/assets folder)
import founder1 from "@/assets/founder-1.jpg"; // Yousef Al-Najem
import founder2 from "@/assets/founder-2.jpg"; // Abdulaziz Al-Sardi
import founder3 from "@/assets/founder-3.jpg"; // Yousef Buobaid

export function BoardOfDirectors() {
  const { t } = useTranslation();

  // Helper to map imageId from translations to the actual imported image
  const getImage = (imageId: string) => {
    switch (imageId) {
      case "image2":
        return founder3;
      case "image1":
        return founder1;
      case "image0":
        return founder2;
      default:
        return founder3;
    }
  };

  const members = t("about.board.members", { returnObjects: true }) as Array<{
    name: string;
    title: string;
    phone?: string;
    email: string;
    imageId: string;
  }>;

  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-[#1f4d43] mb-8 text-start">
            {t("about.board.title")}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4">
          {members.map((member, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-[#f8f9fa] rounded-xl p-6 shadow-sm border border-slate-100/50 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 hover:shadow-md transition-shadow duration-300 text-start">
                {/* Contact info side (RTL start) */}
                <div className="flex-1 w-full order-2 sm:order-1 flex flex-col justify-center sm:min-h-[100px]">
                  <h3 className="font-display text-xl font-bold text-[#1f4d43]">
                    {member.name}
                  </h3>
                  <p className="text-gray-700 mt-1.5 text-sm md:text-base leading-relaxed max-w-xl">
                    {member.title}
                  </p>
                  
                  <div className="mt-4 text-sm flex flex-wrap items-center gap-3 text-[#c5a059] font-medium tracking-wide" dir="ltr">
                    {member.phone && (
                      <span className="flex items-center gap-3">
                        {member.phone}
                        <span className="text-[#c5a059]/40 hidden sm:inline-block">|</span>
                      </span>
                    )}
                    <span>{member.email}</span>
                  </div>
                </div>

                {/* Image side (RTL end) */}
                <div className="shrink-0 order-1 sm:order-2">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-[#1f4d43] bg-white shadow-sm">
                    <img
                      src={getImage(member.imageId)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <p className="mt-8 text-center text-gray-500 text-sm leading-relaxed max-w-3xl mx-auto">
            {t("about.board.footer")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
