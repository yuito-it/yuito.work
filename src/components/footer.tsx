import Image from 'next/image';
import { ImGithub } from 'react-icons/im';

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
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
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
                    href="https://UniProject-tech.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to UniProject →
                </a>
            </div>
            <span className='text-center'>
                &copy;2024 YuitoAkatsuki
                All rights reserved.
            </span>
        </footer>
    );
}