import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const data = {
  home: {
    title: "あかつきゆいと - デジタルクリエイター",
    description: "あかつきゆいとのウェブサイトです。",
    name: "曙 唯人",
    ruby: "あかつき ゆいと",
    jobs: "UniProject創設者 / デジタルクリエイター / Webエンジニア / インフラエンジニア / プロジェクトマネージャー",
    button: {
      about: "About more...",
      works: "Works",
      contacts: "Contacts",
    },
  },
  contacts: {
    title: "Contacts",
    description: "連絡先情報です。ご連絡は以下の方法からお願いします。",
    contents: "ご連絡は以下の方法でお願いします。[at]は@に変更してください。",
  },
  common: {
    BackHome: "ホームに戻る",
  },
  about: {
    title: "About",
    description: "自己紹介です。",
    contents: (
      <>
        あかつきゆいとはデジタルクリエイター、Web開発者、インフラエンジニア、プロジェクトマネージャーです。2009年生まれで、現在日本のS高等学校に通う学生です。また、全日本デジタルサークル{" "}
        <Link
          href={"https://uniproject.jp"}
          target="_blank"
          className="hover:underline inline-flex items-baseline"
        >
          &quot;UniProject&quot;
          <FaExternalLinkAlt />
        </Link>{" "}
        を創設し、様々なプロジェクトに取り組んでいます。
      </>
    ),
  },
  works: {
    title: "Works",
    description: "私が今まで制作したり関わったものの一覧です。",
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
              UniProjectはデジタルクリエイターの情報交換など、
              気軽に交流できる場所を目指してつくられたオンラインサークルです。
              ウェブサイト、アプリケーション、ビデオの制作など、様々なプロジェクトに取り組んでいます。
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
                同好会ポータル Linkle
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              同好会ポータル Linkleは、UniProjectが運営する、
              N/S/R高等学校内の同好会の情報を集約するウェブサイトです。
              同好会の情報を探す際に便利な機能が揃っています。 このサイトは、
              <bold className="font-bold">
                <Link
                  href={
                    "https://progedu.github.io/webappcontest/2024/winter/entry/result.html"
                  }
                  target="_blank"
                  className="hover:underline inline-flex items-baseline"
                >
                  ZEN Study 動くWebアプリコンテスト2024冬
                  <FaExternalLinkAlt />
                </Link>
              </bold>
              優秀賞を受賞しました。
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
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                UniPro Git Tool
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              UniPro Git
              ToolはGitのコミットメッセージをいいかんじにするためのツールです。
              コミットメッセージのテンプレートや、コミットメッセージのprefixに応じて、絵文字を追加できるようになっています。
            </p>
          </div>
        </section>
      </div>
    ),
  },
};

export default data;
