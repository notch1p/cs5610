"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "@/app/(kambaz)/courses/[cid]/people/PeopleTable";
import * as client from "../client";
import NewUserDialog, { type NewUser } from "./NewUserDialog";

export default function Users() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);
  const [role, setRole] = useState("");
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const [showNewUser, setShowNewUser] = useState(false);
  const createUser = async (user: NewUser) => {
    const newUser = await client.createUser(user);
    // Leave them out of the list if the role filter would hide them.
    if (!role || newUser.role === role) {
      setUsers((users) => [...users, newUser]);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h3>Users</h3>
        <button
          type="button"
          id="wd-add-user"
          onClick={() => setShowNewUser(true)}
          className="inline-flex items-center gap-1 rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
        >
          <FaPlus /> Users
        </button>
      </div>
      {showNewUser && (
        <NewUserDialog
          handleCloseAction={() => setShowNewUser(false)}
          createUserAction={createUser}
        />
      )}
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="wd-select-role mb-2 w-1/4 rounded border border-neutral-300 px-2 py-1"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
