import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface TextLinkProps {
  name: string;
  url: string;
  description?: string;
}

export default function TextLink({ name, url, description }: TextLinkProps) {
  return (
    <div className="group col-span-3">
      <Link
        href={url}
        target="_blank"
        className="flex items-baseline gap-1 text-base hover:text-blue-400 transition-colors"
      >
        <span className="font-medium">{name}</span>
        <FaExternalLinkAlt className="text-xs opacity-70" />
      </Link>
      {description && <p className="text-sm opacity-60 mt-0.5">{description}</p>}
    </div>
  );
}
