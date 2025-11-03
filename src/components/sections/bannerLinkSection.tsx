import BannerLink, { BannerLinkProps } from "../bannerLink";

export const dynamic = "force-static";

export default function BannerLinkSection() {
  const links: BannerLinkProps[] = [
    {
      name: "荒音の夜",
      url: "https://arane.uniproject.jp",
      imageUrl: "/img/banner/aranenoyoru.png",
    },
    {
      name: "Ysmservice デジタル創作サークル - 創作と技術の交差点",
      url: "https://group.ysmserv.com/",
      imageUrl: "/img/banner/ysmservice.png",
      size: "small",
    },
    {
      name: "しひろのポートフォリオサイト",
      url: "https://shihiro.com",
      imageUrl: "/img/banner/shihiro-banner.png",
    },
    {
      name: "やーはり",
      url: "https://ya-hari.skyia.jp",
      imageUrl: "/img/banner/yahari.png",
    },
    {
      name: "デジタル創作サークルUniProject",
      url: "https://uniproject.jp",
      imageUrl: "/img/banner/powered_by_unipro_ol.webp",
    },
  ];
  return (
    <>
      {links.map((link) => (
        <BannerLink
          key={link.name}
          name={link.name}
          url={link.url}
          imageUrl={link.imageUrl}
          size={link.size || "medium"}
        />
      ))}
    </>
  );
}
