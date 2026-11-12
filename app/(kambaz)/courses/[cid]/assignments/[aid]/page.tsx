"use client";
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
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AssignmentEditorScreen from "../AssignmentEditorScreen";
import {
  templateAssignment,
  type Assignment,
} from "@/app/(kambaz)/store/assignmentsStore";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const courseId = cid as string;
  const assignmentId = aid as string;
  // undefined while loading; null when `aid` is a new assignment.
  const [existing, setExisting] = useState<Assignment | null>();
  useEffect(() => {
    client.findAssignmentsForCourse(courseId).then((list: Assignment[]) => {
      setExisting(list.find((a) => a._id === assignmentId) ?? null);
    });
  }, [courseId, assignmentId]);
  // The editor copies `a` into state once, so wait until we know what to show.
  if (existing === undefined) return null;
  const save = (assignment: Assignment) =>
    existing
      ? client.updateAssignment(assignment)
      : client.createAssignmentForCourse(courseId, assignment);
  return (
    <AssignmentEditorScreen
      a={existing ?? templateAssignment}
      aid={assignmentId}
      cid={courseId}
      updateAssignmentAction={save}
    />
  );
}
