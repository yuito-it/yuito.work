import Image from "next/image";
import Link from "next/link";

export interface BannerLinkProps {
  name: string;
  imageUrl: string;
  url: string;
  size?: "small" | "medium" | "large";
}

export default function BannerLink({ name, imageUrl, url, size = "medium" }: BannerLinkProps) {
  const sizeClasses = {
    small: "lg:col-span-1 col-span-6",
    medium: "lg:col-span-3 col-span-6",
    large: "lg:col-span-5 col-span-6",
  };

  return (
    <Link
      href={url}
      target="_blank"
      className={`block group overflow-hidden hover:opacity-90 transition-opacity ${sizeClasses[size]}`}
    >
      <div className={`relative w-full h-20`}>
        <Image
          src={imageUrl}
          alt={name}
          className="object-contain"
          fill
          unoptimized
        />
      </div>
    </Link>
  );
}
