"use client";

import Module from "./Module";
import Lesson from "./Lesson";
import ModulesControls from "./ModulesControls";
import type { CourseModule } from "@/app/(kambaz)/store/modulesStore";
import * as client from "./client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Modules() {
  const { cid } = useParams();
  const courseId = cid as string;
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [moduleName, setModuleName] = useState("");
  useEffect(() => {
    client.findModulesForCourse(courseId).then(setModules);
  }, [courseId]);
  // Typing and the pencil's `editing` flag stay local; Enter saves to the server.
  const updateModule = (module: CourseModule) =>
    setModules((ms) => ms.map((m) => (m._id === module._id ? module : m)));
  const editModule = (moduleId: string) =>
    setModules((ms) =>
      ms.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)),
    );
  const saveModule = async (module: CourseModule) => {
    await client.updateModule(module);
    updateModule(module);
  };
  const addModule = async () => {
    if (moduleName === "") return;
    const newModule = await client.createModuleForCourse(courseId, {
      name: moduleName,
      description: "",
      lessons: [],
    });
    setModules((ms) => [...ms, newModule]);
    setModuleName("");
  };
  const deleteModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    setModules((ms) => ms.filter((m) => m._id !== moduleId));
  };
  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleNameAction={setModuleName}
        addModuleAction={addModule}
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
                      saveModule({ ...module, editing: false });
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
