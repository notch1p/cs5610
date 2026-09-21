import Link from "next/link";

const TOC = () => (
  <ul>
    Zhenming
    <br /> presenting:
    <li>
      <Link href="/labs" id="wd-lab1-link">
        Home
      </Link>
    </li>
    <li>
      <Link href="/labs/lab1">Lab1</Link>
    </li>
    <li>Lab2</li>
    <li>Lab3</li>
    <li>
      <a href="https://webdev-client.vercel.app/book/ch1" id="wd-toc-book-link">
        Book Ch1
      </a>
    </li>
    <li>
      <Link href="/" id="wd-kambaz-link">
        Kambaz
      </Link>
    </li>
  </ul>
);
export default TOC;
