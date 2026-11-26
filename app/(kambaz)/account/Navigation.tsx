"use client";
import Link from "next/link";
import "@/app/labs/lab2/tailwind/utilities.css";
import "../kambaz.css";
import { useAccountContext } from "./AccountContext";
import { usePathname } from "next/navigation";

const labels = {
  signin: "Signin",
  signup: "Signup",
  profile: "Profile",
  users: "Users",
};

export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  const links: (keyof typeof labels)[] = !currentUser
    ? ["signin", "signup"]
    : currentUser.role === "ADMIN"
      ? ["profile", "users"]
      : ["profile"];
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
              {labels[link]}
            </Link>
            <br />
          </span>
        );
      })}
    </div>
  );
}
