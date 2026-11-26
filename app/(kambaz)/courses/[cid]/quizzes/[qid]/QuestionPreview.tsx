"use client";

import { FaCheck, FaTrash } from "react-icons/fa";
import SafeHtml from "../SafeHtml";
import { QUESTION_TYPES } from "../quizInfo";
import type { Question } from "../types";

// A question as faculty see it outside its editor: the prompt, and its answers
// with the right ones marked. Edit and Delete show when their actions are given.
export default function QuestionPreview({
  number,
  question,
  onEditAction: onEdit,
  onDeleteAction: onDelete,
}: {
  number: number;
  question: Question;
  onEditAction?: () => void;
  onDeleteAction?: () => void;
}) {
  return (
    <div className="wd-question-preview rounded border border-neutral-300">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-sm">
        <span className="font-semibold">
          Question {number}
          {question.title ? `: ${question.title}` : ""}
        </span>
        <span className="flex items-center gap-3 text-neutral-600">
          {QUESTION_TYPES[question.type]} · {question.points} pts
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="wd-edit-question border-none bg-transparent p-0 text-red-700"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              aria-label={`Delete question ${number}`}
              onClick={onDelete}
              className="wd-delete-question border-none bg-transparent p-0 text-neutral-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          )}
        </span>
      </div>
      <div className="px-3 py-2">
        <SafeHtml html={question.question} className="mb-2" />
        <Answers question={question} />
      </div>
    </div>
  );
}

function Answers({ question }: { question: Question }) {
  const row = (key: string, correct: boolean, text: string) => (
    <li
      key={key}
      className={`flex items-start gap-2 ${correct ? "font-semibold text-green-700" : ""}`}
    >
      <span className="mt-1 inline-block w-4 shrink-0">
        {correct && <FaCheck aria-label="Correct" />}
      </span>
      <span className="whitespace-pre-wrap">{text}</span>
    </li>
  );
  if (question.type === "MULTIPLE_CHOICE") {
    return (
      <ul className="m-0 list-none space-y-1 p-0">
        {question.choices.map((c) => row(c._id, !!c.correct, c.text))}
      </ul>
    );
  }
  if (question.type === "TRUE_FALSE") {
    return (
      <ul className="m-0 list-none space-y-1 p-0">
        {row("true", question.correctAnswer === true, "True")}
        {row("false", question.correctAnswer === false, "False")}
      </ul>
    );
  }
  return (
    <p className="m-0 text-sm">
      Correct answers:{" "}
      {question.possibleAnswers.length
        ? question.possibleAnswers.join(", ")
        : "none yet"}
      {question.caseSensitive ? " (case-sensitive)" : ""}
    </p>
  );
}
