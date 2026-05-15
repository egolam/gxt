import Link from "next/link";
import { FaDiscord, FaGithub, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="text-xs flex flex-col items-center justify-center text-ghost font-medium mt-auto pt-4">
      <nav>
        <ul className="flex flex-row items-center justify-center gap-2 leading-none">
          <li>
            <Link href="/how-to-play" className="hover:underline">
              How to play
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline">
              Privacy and Terms
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex">
          <li>
            <a
              href=""
              className="flex items-center justify-center size-8 hover:text-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub size={16} />
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex items-center justify-center size-8 hover:text-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">X / Twitter</span>
              <FaXTwitter size={16} />
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex items-center justify-center size-8 hover:text-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Reddit</span>
              <FaReddit size={16} />
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex items-center justify-center size-8 hover:text-text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Discord</span>
              <FaDiscord size={16} />
            </a>
          </li>
        </ul>
      </nav>
      <p className="leading-none text-xs text-center text-ghost">
        © 2026 Satisguessry | Powered by robot4qbu
      </p>
    </footer>
  );
};
