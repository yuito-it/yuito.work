import TextLink, { TextLinkProps } from "@/components/textLink";

export const dynamic = "force-static";

export default function BannerLinkSection() {
  const links: TextLinkProps[] = [];
  return (
    <>
      {links.map((link) => (
        <TextLink
          key={link.name}
          name={link.name}
          url={link.url}
          description={link.description}
        />
      ))}
    </>
  );
}
