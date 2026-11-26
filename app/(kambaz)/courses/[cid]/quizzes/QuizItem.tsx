"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { FaBan, FaCheckCircle, FaRocket } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  availabilityText,
  formatDateTime,
  SORT_LABELS,
  type SortKey,
} from "./quizInfo";
import type { Quiz, StudentQuiz } from "./types";

// Kambaz doesn't load Tailwind's base reset, so buttons need their browser
// border and background removed explicitly.
const menuItem =
  "block w-full border-none bg-transparent px-3 py-1.5 text-left text-sm text-neutral-900 no-underline hover:bg-neutral-100";
const iconButton = "border-none bg-transparent p-0";

export default function QuizItem({
  cid,
  quiz,
  faculty,
  onPublishAction: onPublish,
  onDeleteAction: onDelete,
  onSortAction: onSort,
}: {
  cid: string;
  quiz: Quiz | StudentQuiz;
  faculty: boolean;
  onPublishAction: (published: boolean) => void;
  onDeleteAction: () => void;
  onSortAction: (key: SortKey) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const href = `/courses/${cid}/quizzes/${quiz._id}`;
  const questionCount =
    "questions" in quiz ? quiz.questions.length : quiz.questionCount;
  const details: [string, string][] = [
    ["Availability", availabilityText(quiz)],
    ["Due", formatDateTime(quiz.dueDate)],
    ["Points", String(quiz.points)],
    ["Questions", String(questionCount)],
  ];
  // Closes the menu, then runs the chosen action.
  const choose = (action: () => void) => () => {
    setMenuOpen(false);
    action();
  };
  return (
    <li
      className={`wd-quiz-list-item mb-3 flex gap-3 border border-l-[3px] border-neutral-300 bg-white p-3 ${
        quiz.published ? "border-l-green-600" : "border-l-neutral-400"
      }`}
    >
      <FaRocket className="mt-1 shrink-0 text-xl text-green-700" />
      <div className="min-w-0 flex-auto">
        <Link
          href={href}
          className="wd-quiz-link font-semibold text-neutral-900 no-underline"
        >
          {quiz.title}
        </Link>
        <dl className="m-0 mt-1 grid grid-cols-[max-content_1fr] gap-x-3 text-sm text-neutral-600">
          {details.map(([label, value]) => (
            <Fragment key={label}>
              <dt className="text-right font-medium">{label}</dt>
              <dd className="m-0">{value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
      {faculty && (
        <div className="relative flex shrink-0 items-start gap-2 text-lg">
          <button
            type="button"
            className={`wd-publish-toggle ${iconButton}`}
            title={
              quiz.published
                ? "Published. Click to unpublish."
                : "Unpublished. Click to publish."
            }
            onClick={() => onPublish(!quiz.published)}
          >
            {quiz.published ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaBan className="text-red-600" />
            )}
          </button>
          <button
            type="button"
            className={`wd-quiz-menu-toggle ${iconButton}`}
            aria-label="Quiz menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoEllipsisVertical />
          </button>
          {menuOpen && (
            <>
              {/* Clicking anywhere else closes the menu. */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <ul className="wd-quiz-menu absolute end-0 top-7 z-20 m-0 w-44 list-none rounded border border-neutral-200 bg-white p-1 text-sm shadow-md">
                <li>
                  <Link href={href} className={menuItem}>
                    Edit
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={menuItem}
                    onClick={choose(onDelete)}
                  >
                    Delete
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={menuItem}
                    onClick={choose(() => onPublish(!quiz.published))}
                  >
                    {quiz.published ? "Unpublish" : "Publish"}
                  </button>
                </li>
                <li className="mt-1 border-t border-neutral-200 px-3 pt-1.5 text-xs text-neutral-500">
                  Sort by
                </li>
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      className={menuItem}
                      onClick={choose(() => onSort(key))}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </li>
  );
}
