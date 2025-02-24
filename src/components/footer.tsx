import { ImGithub } from "react-icons/im";
import { FaScaleBalanced } from "react-icons/fa6";
import Image from "next/image";

export default function footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-col items-center justify-center">
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/yuito-it/yuito.work/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaScaleBalanced />
          Lisence
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/yuito-it/yuito.work"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImGithub />
          View Source
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://uniproject.jp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/UniPro_Logo.webp"
            alt="UniProject"
            width={20}
            height={20}
          />
          Go to UniProject
        </a>
      </div>
      <span className="text-center">
        &copy;2024 YuitoAkatsuki All rights reserved.
      </span>
    </footer>
  );
}
