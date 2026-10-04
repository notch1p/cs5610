import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign Up</h1>
      <input
        placeholder="username"
        id="wd-username"
        defaultValue="ada"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <br />
      <input
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <br />
      <input
        placeholder="verify password"
        type="password"
        id="wd-password-verify"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <Link
        href="/account/profile"

        className="mb-2 block w-full rounded bg-green-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign up
      </Link>
      <Link
        href="/account/signin"

        className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white no-underline"
      >
        Sign in
      </Link>
    </div>
  );
}
