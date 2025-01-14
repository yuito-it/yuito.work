import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const data = {
  home: {
    title: "Yuito Akatsuki - Digital Creator",
    description: "This is Akatsuki Yuito's website.",
    name: "Yuito Akatsuki",
    ruby: null,
    jobs: "DigitalCreator / WebDeveloper / InfrastructureEngineer / ProjectManager",
    button: {
      about: "About more...",
      works: "Works(Comming soon)",
      contacts: "Contacts",
    },
  },
  contacts: {
    title: "Contacts",
    description: "My contact information",
    contents: "If you want to contact me, please contact me via these way.",
  },
  common: {
    BackHome: "Back to Home",
  },
  about: {
    title: "About",
    description: "Self-introduction",
    contents: (
      <>
        Yuito Akatsuki is a Digital Creator, Web Developer, Infrastructure
        Engineer, and Project Manager. He was born in 2009 and is currently a
        student at a S High School in Japan. He is also a member of the
        All-Japan Digital Creative Club{" "}
        <Link
          href={"https://uniproject.jp"}
          target="_blank"
          className="hover:underline inline-flex items-baseline"
        >
          &quot;UniProject&quot;
          <FaExternalLinkAlt />
        </Link>{" "}
        and is working on various projects.
      </>
    ),
  },
};

export default data;
