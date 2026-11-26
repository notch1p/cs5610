"use client";

import { FaPlus } from "react-icons/fa";
import type { Question } from "../types";
import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";

// The Questions tab. While editing, each question is either previewed (with
// Edit and Delete) or open in its editor; `open` holds the open ones' edits.
export default function QuestionList({
  questions,
  editing,
  open,
  fresh,
  onNewAction,
  onEditAction,
  onChangeAction,
  onSaveAction,
  onCancelAction,
  onDeleteAction,
}: {
  questions: Question[];
  editing: boolean;
  open: Record<string, Question>;
  fresh: string[];
  onNewAction: () => void;
  onEditAction: (question: Question) => void;
  onChangeAction: (question: Question) => void;
  onSaveAction: (id: string) => void;
  onCancelAction: (id: string) => void;
  onDeleteAction: (id: string) => void;
}) {
  const total = questions.reduce((sum, q) => sum + (q.points || 0), 0);
  return (
    <div id="wd-quiz-questions">
      <p className="mt-0 text-sm text-neutral-600">
        <span id="wd-quiz-questions-points" className="font-semibold">
          Points: {total}
        </span>{" "}
        · {questions.length} {questions.length === 1 ? "question" : "questions"}
      </p>
      {questions.length === 0 && (
        <p className="text-neutral-600">No questions yet.</p>
      )}
      <ol className="m-0 list-none space-y-3 p-0">
        {questions.map((question, i) => (
          <li key={question._id}>
            {editing && open[question._id] ? (
              <QuestionEditor
                number={i + 1}
                question={open[question._id]}
                isNew={fresh.includes(question._id)}
                onChangeAction={onChangeAction}
                onSaveAction={() => onSaveAction(question._id)}
                onCancelAction={() => onCancelAction(question._id)}
              />
            ) : (
              <QuestionPreview
                number={i + 1}
                question={question}
                onEditAction={
                  editing ? () => onEditAction(question) : undefined
                }
                onDeleteAction={
                  editing ? () => onDeleteAction(question._id) : undefined
                }
              />
            )}
          </li>
        ))}
      </ol>
      {editing && (
        <button
          type="button"
          id="wd-new-question"
          onClick={onNewAction}
          className="mt-3 inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-sm"
        >
          <FaPlus /> New Question
        </button>
      )}
    </div>
  );
}
