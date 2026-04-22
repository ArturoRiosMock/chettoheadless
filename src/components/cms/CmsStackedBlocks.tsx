import CmsImage from "@/components/ui/CmsImage";
import type { PageBlockApi } from "@/types";

interface CmsStackedBlocksProps {
  blocks: PageBlockApi[];
}

export default function CmsStackedBlocks({ blocks }: CmsStackedBlocksProps) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block) => (
        <article
          key={block.id}
          className="rounded-2xl border border-[rgba(196,181,160,0.2)] bg-white/80 px-6 py-8 md:px-10"
        >
          {block.image ? (
            <div className="relative mb-6 aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-xl bg-[#f0ede8]">
              <CmsImage
                src={block.image}
                alt={block.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                unoptimized
              />
            </div>
          ) : null}
          <h2 className="font-['Inter'] text-[22px] font-medium leading-8 text-[#2d2d2d]">
            {block.title}
          </h2>
          {block.body ? (
            <div
              className="mt-4 font-['Inter'] text-[16px] leading-[26px] text-[#6b6b6b] [&_a]:text-[#8b7e6a] [&_a]:underline [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: block.body }}
            />
          ) : null}
        </article>
      ))}
    </div>
  );
}
