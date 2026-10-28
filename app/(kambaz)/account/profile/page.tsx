"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";
import Link from "next/link";
export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(currentUser);
  }, [currentUser, router]);
  const signout = () => {
    setCurrentUser(null);
    router.push("/account/signin");
  };
  if (!profile) return null;
  return (
    <div id="wd-profile-screen" className="max-w-sm">
      <h3 className="mb-3 text-2xl font-semibold">Profile</h3>
      <input
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        id="wd-username"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <br />
      <input
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        type="password"
        id="wd-password"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        id="wd-firstname"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        id="wd-lastname"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        type="email"
        id="wd-email"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <select
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        id="wd-role"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />

      <button
        type="button"
        onClick={signout}
        id="wd-signout-btn"
        className="reset-default border-none mb-2 block w-full rounded bg-red-700 px-3 py-2 text-center text-white no-underline"
      >
        Sign out
      </button>
    </div>
  );
}
