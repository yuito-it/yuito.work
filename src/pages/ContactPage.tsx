import type { PageProps } from "./types";
import { socials } from "../content";
import { PageTitle } from "../components/PageTitle";
export default function ContactPage({ lang, heading }: PageProps) {
  const t = (ja: string, en: string) => (lang === "ja" ? ja : en);
  return (
    <section className="section inner contact-page">
      <PageTitle
        label={"CONTACT"}
        text={t("お話ししましょう。", "Let’s talk.")}
        heading={heading}
      />
      <p className="intro">
        {t(
          "制作のご相談、コミュニティのこと、ちょっとしたアイデア。",
          "A project, a community, or a small idea.",
        )}
        <br />
        {t(
          "下記のメール、またはSNSからお気軽にご連絡ください。",
          "Feel free to reach out by email or on social media.",
        )}
      </p>
      <a className="email-link" href="mailto:yuito@yuito-it.jp">
        <span>
          <small>EMAIL</small>yuito@yuito-it.jp
        </span>
        <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-socials">
        {socials.map((s) => (
          <a
            href={s.url}
            key={s.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <small>{s.name}</small>
            <span>{s.handle} ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
