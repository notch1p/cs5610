"use client";

import Link from "next/link";
import { useAccountContext } from "../AccountContext";
import * as client from "../client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPass, setVerifyPass] = useState("");
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();
  const signup = async () => {
    const current = await client.signup({ username, password });
    setCurrentUser(current);
    router.push("/account/profile");
  };
  return (
    <div id="wd-signup-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign Up</h1>
      <input
        placeholder="username"
        id="wd-username"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <br />
      <input
        placeholder="password"
        type="password"
        id="wd-password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <br />
      <input
        placeholder="verify password"
        type="password"
        id="wd-password-verify"
        onChange={(e) => setVerifyPass(e.target.value)}
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      {password !== verifyPass && (
        <span className="text-red-600">Password does not match</span>
      )}
      <button
        onClick={(_) => password === verifyPass && signup()}
        className="mb-2 block w-full rounded bg-green-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign up
      </button>
      <Link
        href="/account/signin"

        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign in
      </Link>
    </div>
  );
}
