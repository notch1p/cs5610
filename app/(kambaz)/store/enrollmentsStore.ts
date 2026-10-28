import { create } from "zustand";
import enrollmentsJson from "../database/enrollments.json";

export type Enrollment = (typeof enrollmentsJson)[number];
export type NoIdEnrollment = Omit<Enrollment, "_id">;
export type EnrollmentStore = {
  enrollments: Enrollment[];
  enroll: (e: NoIdEnrollment) => void;
  unenroll: (eid: string) => void;
};

export const useEnrollmentsStore = create<EnrollmentStore>((set) => ({
  enrollments: enrollmentsJson as Enrollment[],
  enroll: (e) =>
    set((s) => ({
      enrollments: [...s.enrollments, { ...e, _id: crypto.randomUUID() }],
    })),
  unenroll: (e) =>
    set((s) => ({
      enrollments: s.enrollments.filter(({ _id }) => _id !== e),
    })),
}));
