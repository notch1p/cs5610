"use client";
import Link from "next/link";
import "@/app/labs/lab2/tailwind/utilities.css";
import "../kambaz.css";
import { useAccountContext } from "./AccountContext";
import { usePathname } from "next/navigation";
export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  const links = currentUser
    ? (["profile"] as const)
    : (["signin", "signup"] as const);
  const pathname = usePathname() ?? "";

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group rounded-none text-lg"
    >
      {links.map((link) => {
        const href = `/account/${link}`;
        const active = pathname === href;
        const spanstyle = active
          ? "list-group-item active border-0"
          : "list-group-item border-0";
        const linkstyle = active
          ? "text-black no-underline visited:inherit"
          : "text-red-700 no-underline visited:inherit";
        return (
          <span key={link} className={spanstyle}>
            <Link href={href} className={linkstyle}>
              {link === "signin"
                ? "Signin"
                : link === "signup"
                  ? "Signup"
                  : "Profile"}
            </Link>
            <br />
          </span>
        );
      })}
    </div>
  );
}
