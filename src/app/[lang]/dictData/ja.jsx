import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const data = {
  home: {
    title: "あかつきゆいと - デジタルクリエイター",
    description: "あかつきゆいとのウェブサイトです。",
    name: "曙 唯人",
    ruby: "あかつき ゆいと",
    jobs: "UniProject創設者 / デジタルクリエイター / Webエンジニア / インフラエンジニア / プロジェクトマネージャー",
    button: {
      about: "About more...",
      works: "Works(Comming soon)",
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
          href={"https://UniProject-tech.net"}
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
};

export default data;
