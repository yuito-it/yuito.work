import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const data = {
  home: {
    title: "yuitopia(ユイトピア) - あかつきゆいと 公式ウェブサイト",
    description:
      "デジタルの中に自分だけの世界を描く。あかつきゆいとが手がける創作の記録、ちょっと不思議で自由なユートピア。",
    name: "曙 唯人",
    ruby: "あかつき ゆいと",
    jobs: "UniProject創設者 / デジタルクリエイター / Webエンジニア / インフラエンジニア / プロジェクトマネージャー",
    button: {
      about: "About more...",
      works: "Works",
      contacts: "Contacts",
    },
    aboutSite: {
      title: "このサイトについて",
      description: `yuitopia（ユイトピア）は、あかつきゆいとの創作を詰め込んだデジタルの箱庭です。
Web制作やアプリ開発、ちょっとしたアイデアの実験まで。
自分だけの「好き」を自由に表現し、記録していく場所として、このサイトをつくりました。
少し不思議で、ちょっと遊び心のある世界を、どうぞのぞいてみてください。`,
    },
    friendLinks: {
      title: "相互リンク",
      description: "友人のウェブサイトやプロジェクトへのリンク集です。",
      howto: {
        contents: (
          <div className="flex flex-col gap-2">
            相互リンクしてくださる方を絶賛募集中です！相互リンクをご希望の方は、以下の情報を含むメールを
            <Link
              href={"mailto:contact[at]yuito.work"}
              className="hover:underline inline-flex items-baseline"
            >
              contact[at]yuito.work
            </Link>
            までお送りください。[at]は@に変更してください。
            <br />
            <ul className="list-disc list-inside mt-2">
              <li>サイト名</li>
              <li>URL</li>
              <li>紹介文（50文字以内）</li>
              <li>バナー画像（任意、88x31推奨）</li>
            </ul>
            また、以下のバナーをご利用ください。
            <br />
            <code className="block border border-foreground/10 p-2 bg-foreground/5 rounded-md">
              &lt;a href=&quot;https://yuito-it.jp&quot;&gt; &lt;img
              src=&quot;https://yuito-it.jp/img/banner_88x31.png&quot; alt=&quot;yuitopia -
              あかつきゆいと公式ウェブサイト&quot; width=&quot;88&quot; height=&quot;31&quot; /&gt;
              &lt;/a&gt;
            </code>
          </div>
        ),
      },
    },
  },
  contacts: {
    title: "Contacts",
    description: "連絡先情報です。ご連絡は以下の方法からお願いします。",
    contents: "ご連絡は以下の方法でお願いします。[at]は@に変更してください。",
  },
  common: {
    title: "あかつきゆいと",
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
    friendLinks: "相互リンク",
    contents: (
      <div className="space-y-4 p-5">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-grow justify-center items-center md:order-1 order-2">
            <Image
              src="/img/UniPro_Logo.webp"
              alt="UniProject"
              height={130}
              width={130}
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
            <span>(c) 2024-2025 UniProject. Used under CC BY-NC-SA 4.0</span>
          </div>
        </section>
        <hr />
        <section className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/5">
            <h2 className="text-2xl">
              <Link
                href={"https://linkle.unipro-n.com"}
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
                  href={"https://progedu.github.io/webappcontest/2024/winter/entry/result.html"}
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
              UniPro Git ToolはGitのコミットメッセージをいいかんじにするためのツールです。
              コミットメッセージのテンプレートや、コミットメッセージのprefixに応じて、絵文字を追加できるようになっています。
            </p>
            <span>(c) 2024 UniProject. Used under CC BY-NC-SA 4.0</span>
          </div>
        </section>
        <hr />
        <section className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/5">
            <h2 className="text-2xl">
              <Link
                href={"https://security-camp.or.jp"}
                target="_blank"
                className="flex flex-row items-center gap-2"
              >
                (一社)セキュリティ・キャンプ協議会
                <FaExternalLinkAlt />
              </Link>
            </h2>
            <p>
              次代を担う日本発で世界に通用する若年層の情報セキュリティ人材を発掘・育成するための取り組みを行なっている一般社団法人です。
              私はこの団体のコミュニティ支援グループの一員として活動しています。
            </p>
            <span>Copyright(C)Security Camp</span>
          </div>
          <div className="flex flex-grow justify-center items-center">
            <Image
              src="/img/security-camp.png"
              alt="(一社)セキュリティ・キャンプ協議会"
              height={150}
              width={150}
            />
          </div>
        </section>
      </div>
    ),
  },
};

export default data;
