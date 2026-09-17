import { socials } from "../content";
export function SocialLinks() {
  return (
    <div className="socials">
      {socials.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
          {s.name} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
