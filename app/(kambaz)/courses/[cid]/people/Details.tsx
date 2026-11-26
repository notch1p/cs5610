"use client";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import { roles } from "../../../account/AccountContext";

const inputClass = "mt-1 w-full rounded border border-neutral-300 px-2 py-1";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  const [editing, setEditing] = useState(false);
  // Edits go into a copy of the user, so Cancel throws them away.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [draft, setDraft] = useState<any>({});
  const [name, setName] = useState("");
  const startEditing = () => {
    setDraft(user);
    setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
    setEditing(true);
  };
  const saveUser = async () => {
    // The first word is the first name and the rest is the last name, so
    // "Mary Ann Lee" keeps all three words and one word clears the last name.
    const [firstName = "", ...rest] = name.trim().split(/\s+/);
    const updatedUser = { ...draft, firstName, lastName: rest.join(" ") };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };
  useEffect(() => {
    const fetchUser = async () => {
      const user = await client.findUserById(uid!);
      setUser(user);
    };
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details fixed top-0 end-0 bottom-0 z-20 w-full max-w-sm bg-white p-4 shadow">
      <button
        type="button"
        onClick={onClose}
        className="wd-close-details absolute end-2 top-2"
      >
        <IoCloseSharp className="text-3xl" />
      </button>
      <div className="mt-2 text-center">
        <FaUserCircle className="me-2 text-4xl text-neutral-500" />
      </div>
      <hr />
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser();
          }}
          className="space-y-2"
        >
          <label className="block">
            <b>Name</b>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`wd-edit-name ${inputClass}`}
            />
          </label>
          <label className="block">
            <b>Email</b>
            <input
              type="email"
              value={draft.email ?? ""}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              className={`wd-edit-email ${inputClass}`}
            />
          </label>
          <label className="block">
            <b>Role</b>
            <select
              value={draft.role ?? "USER"}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              className={`wd-edit-role ${inputClass}`}
            >
              {Object.entries(roles).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <b>Login ID</b>
            <input
              value={draft.loginId ?? ""}
              onChange={(e) => setDraft({ ...draft, loginId: e.target.value })}
              className={`wd-edit-login-id ${inputClass}`}
            />
          </label>
          <label className="block">
            <b>Section</b>
            <input
              value={draft.section ?? ""}
              onChange={(e) => setDraft({ ...draft, section: e.target.value })}
              className={`wd-edit-section ${inputClass}`}
            />
          </label>
          <button
            type="submit"
            className="wd-save float-end rounded bg-green-700 px-3 py-1 text-sm text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="wd-cancel float-end me-2 rounded bg-neutral-200 px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="text-lg text-red-700">
            <FaPencilAlt
              onClick={startEditing}
              className="wd-edit float-end mt-1 cursor-pointer"
            />
            <span className="wd-name">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <b>Email:</b> <span className="wd-email">{user.email}</span>
          <br />
          <b>Roles:</b> <span className="wd-roles">{user.role}</span>
          <br />
          <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
          <br />
          <b>Section:</b> <span className="wd-section">{user.section}</span>
          <br />
          <b>Total Activity:</b>{" "}
          <span className="wd-total-activity">{user.totalActivity}</span>
          <br />
          <button
            type="button"
            onClick={() => deleteUser(uid)}
            className="wd-delete float-end rounded bg-red-600 px-3 py-1 text-sm text-white"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="wd-cancel float-end me-2 rounded bg-neutral-200 px-3 py-1 text-sm"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
