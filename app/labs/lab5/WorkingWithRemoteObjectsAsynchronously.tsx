"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
export default function WorkingWithRemoteObjectsAsynchronously() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const fetchAssignment = async () => {
    setAssignment(await client.fetchAssignment());
  };
  const updateTitle = async () => {
    setAssignment(await client.updateTitle(assignment.title));
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAssignment();
  }, []);
  return (
    <>
      <h4>Working with Objects Asynchronously</h4>
      <button
        className="rounded bg-blue-600 px-3 py-1 me-2 text-sm text-white"
        onClick={updateTitle}
      >
        Update Title
      </button>
      <input
        type="text"
        defaultValue={assignment.title}
        className="rounded p-0.5 w-xl"
        onChange={(e) =>
          setAssignment((a) => ({ ...a, title: e.target.value }))
        }
      />
      <hr className="mt-2 w-2xl" />
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
    </>
  );
}
