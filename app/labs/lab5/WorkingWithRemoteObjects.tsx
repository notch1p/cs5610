"use client";

import { useState } from "react";

export default function WorkingWithRemoteObjects() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 1,
    name: "Next.js",
    description: "Next.js development",
    course: "RS101",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <div className="mb-2">
        <a
          id="wd-update-assignment-title"
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
        <input
          id="wd-assignment-title"
          className="rounded p-0.5 ms-2"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>
      <div>
        <a
          id="wd-update-assignment-score"
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <input
          id="wd-assignment-score"
          type="number"
          className="rounded p-0.5 ms-2"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
      </div>
      <h4>Module</h4>
      <div className="mb-2">
        <a
          id="wd-retrieve-module"
          className="rounded bg-blue-600 px-3 py-1.5 me-2 text-sm text-white"
          href={MODULE_API_URL}
        >
          Get Module
        </a>
        <a
          id="wd-retrieve-module-name"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>
      <div className="mb-2">
        <a
          id="wd-update-module-name"
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
        <input
          id="wd-module-name"
          className="rounded p-0.5 ms-2"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
      </div>
      <div>
        <a
          id="wd-update-module-description"
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <input
          id="wd-module-description"
          className="rounded p-0.5 ms-2"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
      </div>
    </>
  );
}
