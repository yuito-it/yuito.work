import TextLink, { TextLinkProps } from "@/components/textLink";

export const dynamic = "force-static";

export default function BannerLinkSection() {
  const links: TextLinkProps[] = [
    {
      name: "彩音のてきとーなさいと",
      url: "https://ayane0857.net/",
      description: "適当なもの作ってます",
    },
    {
      name: "甲斐智丈の個人サイト",
      url: "https://modern-sys.dev/",
    },
  ];
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
