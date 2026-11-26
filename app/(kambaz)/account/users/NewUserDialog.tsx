"use client";

import { useState } from "react";
import axios from "axios";
import { roles, type User } from "../AccountContext";

export type NewUser = Pick<
  User,
  | "username"
  | "password"
  | "firstName"
  | "lastName"
  | "email"
  | "section"
  | "role"
>;

const emptyUser: NewUser = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  section: "",
  role: "STUDENT",
};
const inputClass = "mt-1 w-full rounded border border-neutral-300 px-2 py-1";

export default function NewUserDialog({
  handleCloseAction: handleClose,
  createUserAction: createUser,
}: {
  handleCloseAction: () => void;
  createUserAction: (user: NewUser) => Promise<void>;
}) {
  const [user, setUser] = useState(emptyUser);
  const [error, setError] = useState("");
  const update = (changes: Partial<NewUser>) =>
    setUser({ ...user, ...changes });
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      id="wd-add-user-dialog"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createUser(user);
            handleClose();
          } catch (err) {
            setError(
              (axios.isAxiosError(err) && err.response?.data?.message) ||
                "Couldn't create the user.",
            );
          }
        }}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h3 className="m-0 text-lg font-semibold">Add User</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="reset-default block bg-inherit center text-base border-none"
          >
            X
          </button>
        </div>
        <div className="space-y-2 px-4 py-3">
          <label className="block">
            <b>Username</b>
            <input
              required
              // Don't let the browser fill in the admin's own login.
              autoComplete="off"
              value={user.username}
              onChange={(e) => update({ username: e.target.value })}
              id="wd-add-user-username"
              className={inputClass}
            />
          </label>
          <label className="block">
            <b>Password</b>
            <input
              required
              type="password"
              autoComplete="new-password"
              value={user.password}
              onChange={(e) => update({ password: e.target.value })}
              id="wd-add-user-password"
              className={inputClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <b>First name</b>
              <input
                value={user.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                id="wd-add-user-firstname"
                className={inputClass}
              />
            </label>
            <label className="block">
              <b>Last name</b>
              <input
                value={user.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                id="wd-add-user-lastname"
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <b>Email</b>
            <input
              type="email"
              value={user.email}
              onChange={(e) => update({ email: e.target.value })}
              id="wd-add-user-email"
              className={inputClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <b>Role</b>
              <select
                value={user.role}
                onChange={(e) => update({ role: e.target.value })}
                id="wd-add-user-role"
                className={inputClass}
              >
                {Object.entries(roles).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <b>Section</b>
              <input
                value={user.section}
                onChange={(e) => update({ section: e.target.value })}
                id="wd-add-user-section"
                className={inputClass}
              />
            </label>
          </div>
          {error && <p className="m-0 text-sm text-red-700">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            id="wd-add-user-cancel"
            className="reset-default block px-2 py-1 rounded bg-gray-200 border-none text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="wd-add-user-submit"
            className="reset-default block px-2 py-1 rounded bg-red-700 text-white border-none text-base"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
