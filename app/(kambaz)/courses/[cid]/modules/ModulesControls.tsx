"use client";

import { useState } from "react";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleNameAction: setModuleName,
  addModuleAction: addModule,
}: {
  moduleName: string;
  setModuleNameAction: (title: string) => void;
  addModuleAction: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      id="wd-modules-controls"
      className="mb-3 flex flex-wrap items-center gap-2"
    >
      <button
        type="button"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        Collapse All
      </button>
      <button
        type="button"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        View Progress
      </button>
      <select
        defaultValue="publish-all"
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
      >
        <option value="publish-all">Publish All</option>
        <option value="unpublish-all">Unpublish All</option>
      </select>
      <button
        type="button"
        id="wd-add-module-btn"
        onClick={handleShow}
        className="inline-flex items-center gap-1 rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
      >
        + Module
      </button>
      <ModuleEditor
        show={show}
        handleCloseAction={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleNameAction={setModuleName}
        addModuleAction={addModule}
      />
    </div>
  );
}
