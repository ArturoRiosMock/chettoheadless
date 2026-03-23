import Image, { type ImageProps } from "next/image";

type CmsImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export default function CmsImage({ src, alt, ...props }: CmsImageProps) {
  if (!src) return null;

  const isLocalhost = src.includes("localhost") || src.includes("127.0.0.1");

  if (isLocalhost) {
    /* eslint-disable @next/next/no-img-element */
    return (
      <img
        src={src}
        alt={alt}
        className={typeof props.className === "string" ? props.className : undefined}
        style={props.fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}
      />
    );
  }

  return <Image src={src} alt={alt} {...props} />;
}
