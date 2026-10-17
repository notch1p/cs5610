/* layout:

Assignment Name (label above)
input[type="text"] full width
textarea[id="wd-description"]


      (1fr)         (2fr)
             Points input[type="text"]
  Assignment Group  ...
  Display Grade as  ...
   Submission type  ... (box around the sub-form)
            Assign  ... (box around the sub-form)
  ---------------------------------------------------------- (divider)
                                button[Cancel] button[Save] (submit type)
*/
import Link from "next/link";
import * as db from "../../../../database";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = await params;
  const assignment = db.assignments.find(({ _id }) => _id === aid);
  return (
    <div id="wd-assignments-editor" className="space-y-6">
      <div>
        <label htmlFor="wd-name" className="mb-1 block">
          Assignment Name
        </label>
        <input
          type="text"
          id="wd-name"
          defaultValue={assignment?.title ?? ""}
          className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
        />
        <label htmlFor="wd-assignment-id" className="mb-1 block">
          Assignment id (readonly)
        </label>
        <input
          type="text"
          id="wd-assignment-id"
          defaultValue={aid}
          className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5 read-only:bg-gray-200"
          readOnly
        />
      </div>
      <textarea
        id="wd-description"
        rows={5}
        defaultValue={assignment?.description ?? ""}
        className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
      />

      <div className="grid grid-cols-[1fr_2fr] items-baseline gap-x-4 gap-y-6">
        <label htmlFor="wd-points" className="text-right">
          Points
        </label>
        <input
          type="text"
          id="wd-points"
          defaultValue={assignment?.points ?? 100}
          className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
        />

        <label htmlFor="wd-group" className="text-right">
          Assignment Group
        </label>
        <select
          id="wd-group"
          defaultValue="ASSIGNMENTS"
          className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
        >
          <option value="ASSIGNMENTS">Assignments</option>
          <option value="QUIZZES">Quizzes</option>
          <option value="EXAMS">Exams</option>
          <option value="PROJECT">Project</option>
        </select>

        <label htmlFor="wd-display-grade-as" className="text-right">
          Display Grade as
        </label>
        <select
          id="wd-display-grade-as"
          defaultValue="PRECENTAGE"
          className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
        >
          <option value="PRECENTAGE">Precentage</option>
          <option value="POINTS">Points</option>
        </select>

        <label htmlFor="wd-submission-type" className="text-right">
          Submission Type
        </label>
        <div className="space-y-4 rounded border border-neutral-300 p-4">
          <select
            id="wd-submission-type"
            defaultValue="ONLINE"
            className="block w-full rounded border-neutral-300  shadow-sm px-3 py-1.5"
          >
            <option value="ONLINE">Online</option>
            <option value="FILE">File Upload</option>
          </select>
          <fieldset>
            <legend className="font-bold">Online Entry Options</legend>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wd-text-entry"
                  className="rounded border-neutral-300"
                />
                <label htmlFor="wd-text-entry">Text Entry</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wd-website-url"
                  className="rounded border-neutral-300"
                />
                <label htmlFor="wd-website-url">Website URL</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wd-media-recordings"
                  className="rounded border-neutral-300"
                />
                <label htmlFor="wd-media-recordings">Media Recordings</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wd-student-annotation"
                  className="rounded border-neutral-300"
                />
                <label htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="wd-file-upload"
                  className="rounded border-neutral-300"
                />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </div>
          </fieldset>
        </div>

        <span className="text-right">Assign</span>
        <div className="space-y-4 rounded border border-neutral-300 p-4">
          <div>
            <label htmlFor="wd-assign-to" className="mb-1 block font-bold">
              Assign to
            </label>
            <select
              multiple
              id="wd-assign-to"
              className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
            >
              <option value="EVERYONE" className="px-2 py-1">
                Everyone
              </option>
              <option value="PERSON1" className="px-2 py-1">
                Person 1
              </option>
              <option value="PERSON2" className="px-2 py-1">
                Person 2
              </option>
              <option value="PERSON3" className="px-2 py-1">
                Person 3
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="wd-due-date" className="mb-1 block font-bold">
              Due
            </label>
            <input
              type="datetime-local"
              id="wd-due-date"
              defaultValue="2026-09-21T20:00"
              className="block w-full rounded border-neutral-300  shadow-sm px-3 py-1.5"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-56 flex-1">
              <label
                htmlFor="wd-available-from"
                className="mb-1 block font-bold"
              >
                Available from
              </label>
              <input
                type="datetime-local"
                id="wd-available-from"
                defaultValue={assignment?.available}
                className="block w-full rounded border-neutral-300  shadow-sm px-3 py-1.5"
              />
            </div>
            <div className="min-w-56 flex-1">
              <label
                htmlFor="wd-available-until"
                className="mb-1 block font-bold"
              >
                Until
              </label>
              <input
                type="datetime-local"
                id="wd-available-until"
                defaultValue={assignment?.due}
                className="block w-full rounded border-neutral-300  shadow-sm px-3 py-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      <label htmlFor="wd-ai-editor-notes" className="mb-1 block">
        Sample notes
      </label>
      <textarea
        id="wd-ai-editor-notes"
        rows={5}
        defaultValue="AI sample notes"
        className="block w-full rounded border-neutral-300 shadow-sm px-3 py-1.5"
      />
      <hr className="border-neutral-300" />
      <div className="flex justify-end gap-2">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel"
          className="rounded border border-neutral-300 bg-white shadow-sm px-3 py-1.5 text-sm no-underline"
        >
          Cancel
        </Link>
        <Link
          id="wd-save"
          className="rounded border border-red-600 bg-red-600 shadow-sm px-3 py-1.5 text-sm font-medium text-white no-underline"
          href={`/courses/${cid}/assignments`}
        >
          Save
        </Link>
      </div>
    </div>
  );
}
