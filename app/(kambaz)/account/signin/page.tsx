"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as db from "../../database";
import { useAccountContext } from "../AccountContext";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password,
    );
    if (!user) return;
    setCurrentUser(user);
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen" className="max-w-sm">
      <h3 className="mb-3 text-2xl font-semibold">Sign in</h3>
      <input
        placeholder="username"
        id="wd-username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        placeholder="password"
        type="password"
        id="wd-password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <button
        type="button"
        onClick={signin}
        id="wd-signin-btn"
        className="reset-default mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white text-base border-none"
      >
        Sign in
      </button>
      <Link
        href="/account/signup"
        id="wd-signup-link"
        className="mb-2 block w-full rounded bg-green-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign up
      </Link>
    </div>
  );
}
