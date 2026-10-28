import { create } from "zustand";
import assignmentsJson from "../database/assignments.json";

export type Assignment = (typeof assignmentsJson)[number];

export type AssignmentStore = {
  assignments: Assignment[];
  addAssignment: (a: NoIdAssignment, cid: string) => void;
  deleteAssignment: (aid: string) => void;
  updateAssignment: (a: Assignment) => void;
};
export type NoIdAssignment = Omit<Assignment, "_id" | "course">;

export const templateAssignment: NoIdAssignment = {
  title: "New assignment",
  description: "Sample desc.",
  points: 100,
  due: "1970-01-01",
  available: "1970-01-01",
};

export const useAssignmentsStore = create<AssignmentStore>((set) => ({
  assignments: assignmentsJson as Assignment[],
  addAssignment: (a: NoIdAssignment, cid: string) =>
    set((s) => ({
      assignments: [
        ...s.assignments,
        { ...a, _id: crypto.randomUUID(), course: cid },
      ],
    })),
  deleteAssignment: (aid) =>
    set((s) => ({ assignments: s.assignments.filter((a) => a._id !== aid) })),
  updateAssignment: (a) =>
    set((s) => {
      const res = [];
      let flag = true;
      s.assignments.forEach((aa) => {
        if (aa._id === a._id) {
          res.push(a);
          flag = false;
        } else res.push(aa);
      });
      if (flag) res.push(a);
      console.log(res);
      return {
        assignments: res,
      };
    }),
}));
