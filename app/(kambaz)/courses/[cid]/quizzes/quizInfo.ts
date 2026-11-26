import axios from "axios";
import type {
  AssignmentGroup,
  Availability,
  QuestionType,
  QuizType,
  ShowCorrectAnswers,
} from "./types";

export const QUIZ_TYPES: Record<QuizType, string> = {
  GRADED_QUIZ: "Graded Quiz",
  PRACTICE_QUIZ: "Practice Quiz",
  GRADED_SURVEY: "Graded Survey",
  UNGRADED_SURVEY: "Ungraded Survey",
};
export const ASSIGNMENT_GROUPS: Record<AssignmentGroup, string> = {
  QUIZZES: "Quizzes",
  EXAMS: "Exams",
  ASSIGNMENTS: "Assignments",
  PROJECT: "Project",
};
export const SHOW_CORRECT_ANSWERS: Record<ShowCorrectAnswers, string> = {
  NEVER: "Never",
  IMMEDIATELY: "Immediately",
  AFTER_LAST_ATTEMPT: "After the last attempt",
  AFTER_DUE_DATE: "After the due date",
};
export const QUESTION_TYPES: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: "Multiple choice",
  TRUE_FALSE: "True/False",
  FILL_IN_BLANK: "Fill in the blank",
};

// ADMIN counts as FACULTY for quizzes.
export const isFacultyRole = (role?: string) =>
  role === "FACULTY" || role === "ADMIN";

type Dates = { availableDate?: string | null; untilDate?: string | null };

// The same rule the server enforces: unset dates don't restrict.
export function availability(quiz: Dates, now = new Date()): Availability {
  if (quiz.availableDate && now < new Date(quiz.availableDate))
    return "NOT_YET";
  if (quiz.untilDate && now > new Date(quiz.untilDate)) return "CLOSED";
  return "AVAILABLE";
}
export function availabilityText(quiz: Dates, now = new Date()) {
  switch (availability(quiz, now)) {
    case "NOT_YET":
      return `Not available until ${formatDateTime(quiz.availableDate)}`;
    case "CLOSED":
      return "Closed";
    default:
      return "Available";
  }
}

export const formatDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

// <input type="datetime-local"> works in local time with no zone, while the
// server stores ISO instants.
export function toLocalInput(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export const fromLocalInput = (value: string) =>
  value ? new Date(value).toISOString() : null;

export type SortKey = "title" | "dueDate" | "availableDate";
export const SORT_LABELS: Record<SortKey, string> = {
  title: "Name",
  dueDate: "Due date",
  availableDate: "Available date",
};
// Quizzes without the date sort last.
export function compareQuizzes(key: SortKey) {
  return (
    a: { title: string } & Dates & { dueDate?: string | null },
    b: typeof a,
  ) => {
    if (key === "title") return a.title.localeCompare(b.title);
    const x = a[key] ? Date.parse(a[key]) : Infinity;
    const y = b[key] ? Date.parse(b[key]) : Infinity;
    return x === y ? 0 : x < y ? -1 : 1;
  };
}

export const isStatus = (e: unknown, status: number) =>
  axios.isAxiosError(e) && e.response?.status === status;

// A message for a failed request, from the server's response when it has one.
export function errorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status;
    if (status === 401) return "Sign in to see this course's quizzes.";
    if (status === 404) return "This quiz doesn't exist.";
    if (e.response?.data?.message) return e.response.data.message as string;
    if (status === 403) return "You don't have access to this.";
  }
  return fallback;
}
