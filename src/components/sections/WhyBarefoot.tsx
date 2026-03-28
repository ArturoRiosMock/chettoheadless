import CmsImage from "@/components/ui/CmsImage";
import type { WhyBarefootCard, ContentBlock } from "@/types";

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="#C4B5A0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.66667 16H25.3333"
        stroke="#C4B5A0"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 6.66667L25.3333 16L16 25.3333"
        stroke="#C4B5A0"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface WhyBarefootProps {
  cards: WhyBarefootCard[];
  features: ContentBlock[];
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaText: string;
  ctaLink: string;
}

export default function WhyBarefoot({
  cards,
  features,
  badge,
  title,
  titleHighlight = "movimiento natural",
  description,
  image,
  ctaTitle,
  ctaDescription,
  ctaText,
  ctaLink,
}: WhyBarefootProps) {
  const titleParts = title.split(titleHighlight);
  const hasHighlight = titleParts.length > 1;

  return (
    <section className="bg-white pt-[80px] pb-[80px]">
      <div className="mx-auto max-w-[1354px] px-6">
        {/* Hero: Image + Text + Features */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-[621/400] w-full overflow-hidden rounded-3xl">
              {image ? (
                <CmsImage
                  src={image}
                  alt={title || "¿Por qué Barefoot?"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 621px"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200" />
              )}
            </div>
            <div
              className="absolute -bottom-6 -right-2 h-24 w-24 rounded-full bg-[#c4b5a0]"
              aria-hidden="true"
            />
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-block rounded-full bg-[#f7f6f4] px-4 py-2 font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#6b6b6b]">
              {badge}
            </span>

            <h2 className="mt-6 font-['Inter'] text-[36px] font-medium leading-[45px] tracking-[0.37px] text-[#2d2d2d]">
              {hasHighlight ? (
                <>
                  {titleParts[0]}
                  <span className="text-[#c4b5a0]">{titleHighlight}</span>
                  {titleParts[1]}
                </>
              ) : (
                title
              )}
            </h2>

            <p className="mt-6 max-w-[572px] font-['Inter'] text-[18px] font-normal leading-[29.25px] tracking-[-0.44px] text-[#6b6b6b]">
              {description}
            </p>

            <ul className="mt-8 flex flex-col gap-4 pt-4">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f7f6f4]">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="font-['Inter'] text-[18px] font-medium leading-[27px] tracking-[-0.44px] text-[#2d2d2d]">
                      {feature.title}
                    </h3>
                    <p className="font-['Inter'] text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#6b6b6b]">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Benefits Cards Grid */}
        <div className="mt-[80px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center rounded-2xl bg-[#f7f6f4] px-8 pb-8 pt-8 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <ArrowRightIcon />
              </div>
              <h3 className="mt-4 font-['Inter'] text-[18px] font-medium leading-7 tracking-[-0.44px] text-[#2d2d2d]">
                {card.title}
              </h3>
              <p className="mt-3 font-['Inter'] text-[14px] font-normal leading-[22.75px] tracking-[-0.15px] text-[#6b6b6b]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-[64px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#c4b5a0] to-[#a89584] px-12 py-12 text-center">
          <h3 className="font-['Inter'] text-[30px] font-medium leading-9 tracking-[0.4px] text-white">
            {ctaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-[672px] font-['Inter'] text-[16px] font-normal leading-6 tracking-[-0.31px] text-white/90">
            {ctaDescription}
          </p>
          <a
            href={ctaLink}
            className="mt-6 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-['Inter'] text-[16px] font-medium leading-6 tracking-[-0.31px] text-[#2d2d2d] transition-opacity hover:opacity-90"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
