import type { PageProps } from "./types";
import { useRef, useState } from "react";
import { categories, pick, works } from "../content";
import type { Category } from "../content";
import { Artwork } from "../components/Artwork";
import { useWorksMotion } from "../motion/usePageMotion";
import { PageTitle } from "../components/PageTitle";
export default function WorksPage({ lang, heading }: PageProps) {
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  const [filter, setFilter] = useState<Category>("all");
  const scope = useRef<HTMLElement>(null);
  useWorksMotion(scope, "works", lang, filter);
  return (
    <section ref={scope} className="section inner">
      <PageTitle
        label={"WORKS / 2023 — 2026"}
        text={t(
          "つくってきたもの。\nつないできたこと。",
          "Things I’ve built.\nConnections I’ve made.",
        )}
        heading={heading}
      />
      <p className="intro">
        {t(
          "制作、挑戦、そしてコミュニティ。その歩みを、新しい順に。",
          "Projects, challenges, and communities. A timeline, from the latest back to the beginning.",
        )}
      </p>
      <div
        className="filters"
        aria-label={t("活動カテゴリ", "Work categories")}
      >
        {(Object.keys(categories) as Category[]).map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {pick(categories[c], lang)}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {works.filter((w) => filter === "all" || w.category === filter).length}{" "}
        {t("件の活動", "activities")}
      </p>
      <div className="timeline">
        {works
          .filter((w) => filter === "all" || w.category === filter)
          .map((w) => (
            <article className="timeline-item" key={w.id} id={w.id}>
              <div className="timeline-date">
                <span className="timeline-dot" />
                <time>{w.date}</time>
              </div>
              <Artwork work={w} />
              <div className="timeline-copy">
                <span className="small-label">
                  {pick(categories[w.category], lang)}
                </span>
                <h2>{pick(w.title, lang)}</h2>
                <p>{pick(w.description, lang)}</p>
                {w.url && (
                  <a
                    className="text-link"
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("プロジェクトサイト", "Project website")} <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
