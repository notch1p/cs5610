"use client";

import Module from "./Module";
import Lesson from "./Lesson";
import ModulesControls from "./ModulesControls";
import { useModulesStore } from "@/app/(kambaz)/store/modulesStore";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Modules() {
  const { cid } = useParams();
  const {
    modules: allM,
    updateModule,
    addModule,
    editModule,
    deleteModule,
  } = useModulesStore();
  const modules = allM.filter((m) => m.course === cid);
  const [moduleName, setModuleName] = useState("");
  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleNameAction={setModuleName}
        addModuleAction={() => {
          if (moduleName === "")
            addModule({ name: moduleName, course: cid as string });
        }}
      />
      <ul id="wd-modules" className="m-0 list-none p-0">
        {modules.map((module) => (
          <Module
            key={module._id}
            moduleId={module._id}
            deleteModule={deleteModule}
            editModule={editModule}
            title={
              module.editing ? (
                <input
                  className="w-full rounded border border-neutral-300 px-2 py-1 text-base"
                  defaultValue={module.name}
                  onChange={(e) =>
                    updateModule({ ...module, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModule({ ...module, editing: false });
                    }
                  }}
                />
              ) : (
                module.name
              )
            }
          >
            {module.lessons?.map((lesson) => (
              <Lesson key={lesson._id} title={lesson.name} />
            ))}
          </Module>
        ))}
      </ul>
    </div>
  );
}
