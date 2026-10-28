"use client";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";
import { useAssignmentsStore } from "@/app/(kambaz)/store/assignmentsStore";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments: afull, deleteAssignment } = useAssignmentsStore();
  const assignments = afull.filter(({ course }) => course === (cid as string));
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState("");

  return (
    <div id="wd-assignments">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="rounded border py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            id="wd-add-assignment-group"
            type="button"
            className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm"
          >
            <FaPlus /> Group
          </button>
          <button
            id="wd-add-assignment"
            type="button"
            className="inline-flex items-center gap-1 rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
            onClick={() => {
              redirect(`/courses/${cid}/assignments/${crypto.randomUUID()}`);
            }}
          >
            <FaPlus /> Assignment
          </button>
        </div>
      </div>
      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>
        <button
          type="button"
          className="inline-flex items-center rounded border bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>
      </h3>

      {show ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          id="wd-add-assignment-dialog"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between px-3 py-2">
              <h3 className="m-0 text-lg font-semibold">
                Deleting:
                <br />
                <span className="font-mono">{deleting}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShow(false)}
                aria-label="Close"
                className="reset-default block bg-inherit center text-base border-none"
              >
                X
              </button>
            </div>
            <div className="flex justify-end gap-2 border-t border-neutral-200 px-3 py-2">
              <button
                type="button"
                onClick={() => setShow(false)}
                id="wd-add-assignment-cancel"
                className="reset-default block px-2 py-1 rounded bg-gray-200 border-none text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteAssignment(deleting);
                  setShow(false);
                }}
                id="wd-add-assignment-submit"
                className="reset-default block px-2 py-1 rounded bg-red-700 text-white border-none text-base"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {assignments.map(({ _id, title, available, due, points }) => (
          <AssignmentItem
            key={_id}
            cid={cid as string}
            aid={_id}
            title={title}
            details={`Multiple Modules | Not available until ${available} | Due ${due} | ${points} pts`}
            deleteAssignment={() => {
              setShow(true);
              setDeleting(_id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
