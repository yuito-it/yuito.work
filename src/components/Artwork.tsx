import type { Work } from "../content";
import cilium from "../assets/img/works/cilium.png";
import linkle from "../assets/img/works/Linkle.png";
import awardPhoto from "../assets/img/works/seccamp_forum_award_unique.JPG?url";
import uniLogo from "../assets/img/works/UniPro_black.png";
export function Artwork({
  work,
  decorative = false,
}: {
  work: Work;
  decorative?: boolean;
}) {
  return (
    <div
      className={`art art-${work.art}`}
      aria-hidden={decorative || undefined}
    >
      {work.art === "award" ? (
        <img
          className="photo"
          src={awardPhoto}
          alt={decorative ? "" : "UniQUE / Security Camp Forum 2026"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "uniproject" ? (
        <img
          src={uniLogo}
          alt={decorative ? "" : "UniProject"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "cilium" ? (
        <img
          src={cilium}
          alt={decorative ? "" : "Cilium"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : work.art === "linkle" ? (
        <img
          src={linkle}
          alt={decorative ? "" : "Linkle"}
          loading={decorative ? "eager" : "lazy"}
        />
      ) : (
        <>
          <div className="art-orbit" />
          <span className="art-word">
            {
              {
                unique: "UniQUE",
                uniproject: "UniProject",
                community: "Connect.",
                security: "CVE",
                charity: "For good.",
                award: "Together.",
                camp: "Explore.",
                web: "Create.",
                school: "Next.",
              }[work.art]
            }
          </span>
          <span className="art-caption">
            {work.art === "unique"
              ? "ONE ID. ONE COMMUNITY."
              : work.date.slice(0, 4) + " / " + work.category.toUpperCase()}
          </span>
        </>
      )}
    </div>
  );
}
