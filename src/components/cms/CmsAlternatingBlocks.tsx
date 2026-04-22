import CmsImage from "@/components/ui/CmsImage";
import type { PageBlockApi } from "@/types";

interface CmsAlternatingBlocksProps {
  blocks: PageBlockApi[];
}

function imagePositionFor(block: PageBlockApi, index: number): "left" | "right" {
  const meta = block.meta as { imagePosition?: string } | null;
  if (meta?.imagePosition === "left" || meta?.imagePosition === "right") {
    return meta.imagePosition;
  }
  return index % 2 === 0 ? "right" : "left";
}

export default function CmsAlternatingBlocks({ blocks }: CmsAlternatingBlocksProps) {
  return (
    <div className="mx-auto flex max-w-[1354px] flex-col gap-20 px-6 py-16">
      {blocks.map((block, i) => {
        const pos = imagePositionFor(block, i);
        const meta = block.meta as { features?: string[] } | null;
        const features = Array.isArray(meta?.features) ? meta.features : [];

        return (
          <div
            key={block.id}
            className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
              pos === "left" ? "" : "lg:[&>*:first-child]:order-2"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0ede8]">
              {block.image ? (
                <CmsImage
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              ) : null}
            </div>
            <div>
              <h3 className="font-['Inter'] text-[24px] font-medium leading-8 tracking-[0.07px] text-[#2d2d2d]">
                {block.title}
              </h3>
              {block.body ? (
                <div
                  className="mt-3 font-['Inter'] text-[16px] leading-[26px] tracking-[-0.31px] text-[#6b6b6b] [&_a]:text-[#8b7e6a] [&_a]:underline [&_p+p]:mt-3"
                  dangerouslySetInnerHTML={{ __html: block.body }}
                />
              ) : null}
              {features.length > 0 ? (
                <ul className="mt-6 flex flex-col gap-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 font-['Inter'] text-[14px] leading-5 tracking-[-0.15px] text-[#6b6b6b]"
                    >
                      <span className="text-[#c4b5a0]">•</span> {f}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
