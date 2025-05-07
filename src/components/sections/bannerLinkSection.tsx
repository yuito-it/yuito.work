import BannerLink from "../bannerLink";

export const dynamic = "force-static";

export default function BannerLinkSection() {
  const links = [
    {
      name: "荒音の夜",
      url: "https://arane.uniproject.jp",
      imageUrl: "/img/banner/aranenoyoru.png",
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
        />
      ))}
    </>
  );
}
