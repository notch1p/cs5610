"use client";

import { useState } from "react";
import type { Course } from "../store/coursesStore";

const inputClass = "mt-1 w-full rounded border border-neutral-300 px-2 py-1";

export default function CourseEditor({
  dialogTitle,
  course,
  saveCourseAction: saveCourse,
  handleCloseAction: handleClose,
}: {
  dialogTitle: string;
  course: Course;
  saveCourseAction: (course: Course) => Promise<void>;
  handleCloseAction: () => void;
}) {
  const [draft, setDraft] = useState(course);
  const [error, setError] = useState("");
  const update = (changes: Partial<Course>) =>
    setDraft({ ...draft, ...changes });
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      id="wd-course-editor"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await saveCourse(draft);
            handleClose();
          } catch {
            setError("Couldn't save the course.");
          }
        }}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h3 className="m-0 text-lg font-semibold">{dialogTitle}</h3>
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
            <b>Name</b>
            <input
              required
              value={draft.name}
              onChange={(e) => update({ name: e.target.value })}
              id="wd-course-name"
              className={inputClass}
            />
          </label>
          <label className="block">
            <b>Number</b>
            <input
              value={draft.number}
              onChange={(e) => update({ number: e.target.value })}
              id="wd-course-number"
              className={inputClass}
            />
          </label>
          <label className="block">
            <b>Start date</b>
            <input
              type="date"
              value={draft.startDate}
              onChange={(e) => update({ startDate: e.target.value })}
              id="wd-course-start-date"
              className={inputClass}
            />
          </label>
          <label className="block">
            <b>Description</b>
            <textarea
              rows={3}
              value={draft.description}
              onChange={(e) => update({ description: e.target.value })}
              id="wd-course-description"
              className={inputClass}
            />
          </label>
          {error && <p className="m-0 text-sm text-red-700">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            id="wd-cancel-course-click"
            className="reset-default block px-2 py-1 rounded bg-gray-200 border-none text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="wd-save-course-click"
            className="reset-default block px-2 py-1 rounded bg-red-700 text-white border-none text-base"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
