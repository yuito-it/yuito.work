import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const data = {
  home: {
    title: "Yuito Akatsuki - Digital Creator",
    description: "This is Akatsuki Yuito's website.",
    name: "Yuito Akatsuki",
    ruby: null,
    jobs: "Founder of UniProject / Digital Creator / Web Developer / Infrastructure Engineer / Project Manager",
    button: {
      about: "Learn more...",
      works: "Works",
      contacts: "Contacts",
    },
  },
  contacts: {
    title: "Contacts",
    description: "Contact information",
    contents: "Please contact me using the methods below. Replace [at] with @.",
  },
  common: {
    title: "Yuito Akatsuki",
    BackHome: "Back to Home",
  },
  about: {
    title: "About",
    description: "Introduction",
    contents: (
      <>
        Yuito Akatsuki is a Digital Creator, Web Developer, Infrastructure
        Engineer, and Project Manager. Born in 2009, he is currently a student
        at S High School in Japan. He is also the founder of the All-Japan
        Digital Circle{" "}
        <Link
          href={"https://uniproject.jp"}
          target="_blank"
          className="hover:underline inline-flex items-baseline"
        >
          &quot;UniProject&quot;
          <FaExternalLinkAlt />
        </Link>{" "}
        and actively participates in various projects.
      </>
    ),
  },
  works: {
    title: "Works",
    description: "A list of projects I have created or been involved in.",
    contents: (
      <div className="space-y-4 p-5">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-grow justify-center items-center md:order-1 order-2">
            <Image
              src="/img/UniPro_Logo.webp"
              alt="UniProject"
              height={150}
              width={150}
            />
          </div>
          <div className="md:w-3/5 order-1 md:order-2">
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
              UniProject is an online community created to provide a space for
              digital creators to exchange ideas and collaborate. We work on
              various projects, including websites, applications, and videos.
            </p>
          </div>
        </section>
        <hr />
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
              Club Portal Linkle is a website managed by UniProject that
              aggregates information about clubs within N/S/R High School. It
              provides convenient features for finding club information. This
              project received the Excellence Award at the{" "}
              <bold className="font-bold">
                <Link
                  href={
                    "https://progedu.github.io/webappcontest/2024/winter/entry/result.html"
                  }
                  target="_blank"
                  arget="_blank"
                  className="hover:underline inline-flex items-baseliner:underline inline-flex items-baseline"
                >
                  ZEN Study Moving Web App Contest Winter 2024 ZEN Study
                  <FaExternalLinkAlt />
                </Link>
              </bold>
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
        <hr />
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-grow justify-center items-center md:order-1 order-2">
            <Image
              src="/img/UniProGitTool.webp"
              alt="UniPro Git Tool"
              height={150}
              width={350}
            />
          </div>
          <div className="md:w-3/5 order-1 md:order-2">
            <h2 className="text-2xl">
              <Link
                href={"https://github.com/UniPro-tech/UniPro-Git-Tool"}
                f={"https://github.com/UniPro-tech/UniPro-Git-Tool"}
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                UniPro Git Tool UniPro Git Tool
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              UniPro Git Tool is a utility designed to enhance Git commitniPro
              Git Tool is a tool to make Git commit messages more messages. It
              allows users to add emojis to commit messages basedased on on
              templates and prefixes.
            </p>
          </div>
        </section>
      </div>
    ),
  },
};
export default data;
