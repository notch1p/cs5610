import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>A list of labs</h1>
      <ul>
        <li>
          <Link href="/labs/lab1">Lab1</Link>
        </li>
        <li>
          <Link href="/labs/lab2">Lab2</Link>
        </li>
        <li>
          <Link href="/labs/lab3">Lab3</Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab4
          </Link>
        </li>
        <li>
          <Link href="/labs/lab5">Lab5</Link>
        </li>
      </ul>
    </div>
  );
}
