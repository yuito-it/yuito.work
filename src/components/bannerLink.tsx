import Image from "next/image";
import Link from "next/link";

interface BannerLinkProps {
  name: string;
  imageUrl: string;
  url: string;
  size?: "small" | "medium" | "large";
}

export default function BannerLink({ name, imageUrl, url, size = "medium" }: BannerLinkProps) {
  const sizeClasses = {
    small: "h-12",
    medium: "h-16",
    large: "h-20",
  };

  return (
    <Link
      href={url}
      target="_blank"
      className="block group rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
    >
      <div className={`relative w-full ${sizeClasses[size]}`}>
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
