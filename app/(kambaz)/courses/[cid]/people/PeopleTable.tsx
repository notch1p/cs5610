"use client";
import { FaUserCircle } from "react-icons/fa";
import type { User } from "@/app/(kambaz)/account/AccountContext";
import { useState } from "react";
import PeopleDetails from "./Details";

// The server stores lastActivity as a Date, so it arrives as an ISO timestamp
// ("2020-10-01T00:00:00.000Z"). Keep the date part; converting to local time
// would show the previous day in US time zones.
const formatDate = (value?: string) => value?.slice(0, 10);

export default function PeopleTable({
  users,
  fetchUsers,
}: {
  // The server leaves out passwords.
  users: Omit<User, "password">[];
  // Admin screen only: passing it turns on the details popup, and it's
  // called when the popup closes so the list picks up edits and deletions.
  fetchUsers?: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  return (
    <div id="wd-people-table" className="overflow-x-auto">
      {fetchUsers && showDetails && (
        <PeopleDetails
          // A fresh popup per user, so an unsaved edit can't carry over to
          // the next name you click.
          key={showUserId}
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-300">
            <th className="p-2">Name</th>
            <th className="p-2">Login ID</th>
            <th className="p-2">Section</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Activity</th>
            <th className="p-2">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="odd:bg-neutral-50">
              <td
                className="wd-full-name p-2 text-nowrap"
                onClick={() => {
                  setShowDetails(true);
                  setShowUserId(user._id);
                }}
              >
                <FaUserCircle className="me-2 inline align-middle text-3xl text-neutral-500" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id p-2">{user.loginId}</td>
              <td className="wd-section p-2">{user.section}</td>
              <td className="wd-role p-2">{user.role}</td>
              <td className="wd-last-activity p-2">
                {formatDate(user.lastActivity)}
              </td>
              <td className="wd-total-activity p-2">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
