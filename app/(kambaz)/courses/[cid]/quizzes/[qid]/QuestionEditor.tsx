"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
import RichText from "../RichText";
import { QUESTION_TYPES } from "../quizInfo";
import type { Choice, Question, QuestionType } from "../types";

const input = "w-full rounded border border-neutral-300 px-2 py-1";
const iconButton =
  "border-none bg-transparent p-1 text-neutral-500 hover:text-red-700";
const addButton =
  "mt-2 inline-flex items-center gap-1 border-none bg-transparent p-0 text-sm text-red-700";

const HINTS: Record<QuestionType, string> = {
  MULTIPLE_CHOICE:
    "Enter the question and its choices, then select the one correct choice.",
  TRUE_FALSE:
    "Enter the question, then select whether True or False is correct.",
  FILL_IN_BLANK:
    "Enter the question, then every answer that counts as correct. Students type their answer into a blank.",
};

const newChoice = (correct = false): Choice => ({
  _id: crypto.randomUUID(),
  text: "",
  correct,
});

// Switching type keeps the title, points and question text, and fills in
// what the new type needs when it's missing.
export function withType(question: Question, type: QuestionType): Question {
  const next = { ...question, type };
  if (type === "MULTIPLE_CHOICE" && next.choices.length === 0) {
    next.choices = [newChoice(true), newChoice()];
  }
  if (type === "TRUE_FALSE" && next.correctAnswer === undefined) {
    next.correctAnswer = true;
  }
  if (type === "FILL_IN_BLANK" && next.possibleAnswers.length === 0) {
    next.possibleAnswers = [""];
  }
  return next;
}

// New questions are multiple choice and worth 1 point.
export const newQuestion = (): Question =>
  withType(
    {
      _id: crypto.randomUUID(),
      type: "MULTIPLE_CHOICE",
      title: "",
      points: 1,
      question: "",
      choices: [],
      possibleAnswers: [],
      caseSensitive: false,
    },
    "MULTIPLE_CHOICE",
  );

// A question as kept once its edits are accepted: blank possible answers go.
export const tidyQuestion = (question: Question): Question => ({
  ...question,
  possibleAnswers: question.possibleAnswers.filter((a) => a.trim()),
});

export default function QuestionEditor({
  number,
  question: q,
  isNew,
  onChangeAction: onChange,
  onSaveAction: onSave,
  onCancelAction: onCancel,
}: {
  number: number;
  question: Question;
  isNew: boolean;
  onChangeAction: (question: Question) => void;
  onSaveAction: () => void;
  onCancelAction: () => void;
}) {
  const setChoice = (id: string, text: string) =>
    onChange({
      ...q,
      choices: q.choices.map((c) => (c._id === id ? { ...c, text } : c)),
    });
  const markCorrect = (id: string) =>
    onChange({
      ...q,
      choices: q.choices.map((c) => ({ ...c, correct: c._id === id })),
    });
  // Keeps exactly one choice marked correct.
  const removeChoice = (id: string) => {
    const rest = q.choices.filter((c) => c._id !== id);
    if (rest.length && !rest.some((c) => c.correct)) {
      rest[0] = { ...rest[0], correct: true };
    }
    onChange({ ...q, choices: rest });
  };
  const setAnswer = (index: number, text: string) =>
    onChange({
      ...q,
      possibleAnswers: q.possibleAnswers.map((a, i) =>
        i === index ? text : a,
      ),
    });
  const removeAnswer = (index: number) =>
    onChange({
      ...q,
      possibleAnswers: q.possibleAnswers.filter((_, i) => i !== index),
    });

  return (
    <div className="wd-question-editor rounded border border-neutral-400">
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-300 bg-neutral-100 px-3 py-2">
        <input
          aria-label="Question title"
          placeholder={`Question ${number}`}
          value={q.title}
          onChange={(e) => onChange({ ...q, title: e.target.value })}
          className="min-w-40 flex-1 rounded border border-neutral-300 px-2 py-1"
        />
        <select
          aria-label="Question type"
          value={q.type}
          onChange={(e) =>
            onChange(withType(q, e.target.value as QuestionType))
          }
          className="rounded border border-neutral-300 px-2 py-1"
        >
          {Object.entries(QUESTION_TYPES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="ms-auto flex items-center gap-1 text-sm">
          pts:
          <input
            type="number"
            min={0}
            value={q.points}
            onChange={(e) => onChange({ ...q, points: Number(e.target.value) })}
            className="w-20 rounded border border-neutral-300 px-2 py-1"
          />
        </label>
      </div>
      <div className="space-y-3 p-3">
        <p className="m-0 text-sm text-neutral-600">{HINTS[q.type]}</p>
        <div>
          <span className="mb-1 block font-semibold">Question</span>
          <RichText
            value={q.question}
            onChangeAction={(question) => onChange({ ...q, question })}
          />
        </div>
        <div>
          <span className="mb-1 block font-semibold">Answers</span>
          {q.type === "MULTIPLE_CHOICE" && (
            <>
              <ul className="m-0 list-none space-y-2 p-0">
                {q.choices.map((c, i) => (
                  <li key={c._id} className="flex items-start gap-2">
                    <input
                      type="radio"
                      name={`correct-${q._id}`}
                      checked={!!c.correct}
                      onChange={() => markCorrect(c._id)}
                      aria-label={`Choice ${i + 1} is correct`}
                      className="mt-2"
                    />
                    <textarea
                      rows={2}
                      value={c.text}
                      placeholder={`Choice ${i + 1}`}
                      onChange={(e) => setChoice(c._id, e.target.value)}
                      className={`${input} ${c.correct ? "border-green-600" : ""}`}
                    />
                    <button
                      type="button"
                      aria-label={`Remove choice ${i + 1}`}
                      onClick={() => removeChoice(c._id)}
                      className={`${iconButton} mt-1`}
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...q,
                    choices: [...q.choices, newChoice(q.choices.length === 0)],
                  })
                }
                className={addButton}
              >
                <FaPlus /> Add Another Answer
              </button>
            </>
          )}
          {q.type === "TRUE_FALSE" && (
            <div className="flex gap-6">
              {[true, false].map((value) => (
                <label key={String(value)} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`true-false-${q._id}`}
                    checked={q.correctAnswer === value}
                    onChange={() => onChange({ ...q, correctAnswer: value })}
                  />
                  {value ? "True" : "False"}
                </label>
              ))}
            </div>
          )}
          {q.type === "FILL_IN_BLANK" && (
            <>
              <ul className="m-0 list-none space-y-2 p-0">
                {q.possibleAnswers.map((answer, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      value={answer}
                      placeholder={`Possible answer ${i + 1}`}
                      onChange={(e) => setAnswer(i, e.target.value)}
                      className={input}
                    />
                    <button
                      type="button"
                      aria-label={`Remove possible answer ${i + 1}`}
                      onClick={() => removeAnswer(i)}
                      className={iconButton}
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...q,
                    possibleAnswers: [...q.possibleAnswers, ""],
                  })
                }
                className={addButton}
              >
                <FaPlus /> Add Another Answer
              </button>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={q.caseSensitive}
                  onChange={(e) =>
                    onChange({ ...q, caseSensitive: e.target.checked })
                  }
                />
                Case-sensitive
              </label>
            </>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="wd-cancel-question rounded border-none bg-neutral-200 px-3 py-1.5 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="wd-save-question rounded border-none bg-red-700 px-3 py-1.5 text-sm text-white"
          >
            {isNew ? "Save Question" : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
