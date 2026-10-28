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
import { useParams } from "next/navigation";
import AssignmentEditorScreen from "../AssignmentEditorScreen";
import {
  templateAssignment,
  useAssignmentsStore,
} from "@/app/(kambaz)/store/assignmentsStore";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments, updateAssignment } = useAssignmentsStore();
  return (
    <AssignmentEditorScreen
      a={
        assignments.find(({ _id }) => _id === (aid as string)) ??
        templateAssignment
      }
      aid={aid as string}
      cid={cid as string}
      updateAssignmentAction={updateAssignment}
    />
  );
}
