import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const data = {
  home: {
    title: "Yuito Akatsuki - Digital Creator",
    description: "This is Akatsuki Yuito's website.",
    name: "Yuito Akatsuki",
    ruby: null,
    jobs: "Digital Creator / Web Developer / Infrastructure Engineer / Project Manager",
    button: {
      about: "About more...",
      works: "Works",
      contacts: "Contacts",
    },
  },
  contacts: {
    title: "Contacts",
    description: "My contact information",
    contents: "If you want to contact me, please contact me via these ways.",
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
  works: {
    title: "Works",
    description:
      "Here is a list of the things I have created and been involved in so far.",
    contents: (
      <div className="space-y-4 p-5">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-grow justify-center items-center">
            <Image
              src="/img/UniPro_Logo.webp"
              alt="UniProject"
              height={150}
              width={150}
            />
          </div>
          <div className="md:w-3/5">
            <h2 className="text-2xl">
              <Link
                href={"https://uniproject.jp"}
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                UniProject
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              UniProject is an online circle created to provide a place for
              digital creators to exchange information and interact casually. We
              are working on various projects such as website, application, and
              video production.
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/5">
            <h2 className="text-2xl">
              <Link
                href={"https://linkle.nnn.uniproject.jp"}
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                Club Portal Linkle
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              Club Portal Linkle is a website operated by UniProject that
              aggregates information about clubs within N/S/R High School. It
              has convenient features for finding club information.
            </p>
          </div>
          <div className="flex flex-grow justify-center items-center">
            <Image
              src="/img/Linkle.png"
              alt="Linkle"
              height={150}
              width={300}
            />
          </div>
        </section>
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-grow justify-center items-center">
            <Image
              src="/img/UniProGitTool.webp"
              alt="UniPro Git Tool"
              height={150}
              width={350}
            />
          </div>
          <div className="md:w-3/5">
            <h2 className="text-2xl">
              <Link
                href={"https://github.com/UniPro-tech/UniPro-Git-Tool"}
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                UniPro Git Tool
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              UniPro Git Tool is a tool to make Git commit messages more
              pleasant. It allows you to add emojis to commit messages based on
              templates and prefixes.
            </p>
          </div>
        </section>
      </div>
    ),
  },
};

export default data;
