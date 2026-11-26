"use client";

import type { ReactNode } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import SafeHtml from "../SafeHtml";
import { formatDateTime } from "../quizInfo";
import type { AttemptResult, GradedAnswer, ReviewQuestion } from "../types";

// A graded attempt: the score, then each question with the student's answer
// and whether it was right. The right answers appear when the server includes
// them, which depends on Show Correct Answers.
export default function AttemptReview({ result }: { result: AttemptResult }) {
  const graded = new Map((result.answers ?? []).map((a) => [a.question, a]));
  return (
    <div id="wd-attempt-review" className="space-y-4">
      <div className="rounded border border-neutral-300 bg-neutral-50 p-3">
        <div id="wd-attempt-score" className="text-lg font-semibold">
          {result.score !== undefined
            ? `Score: ${result.score} / ${result.maxScore}`
            : "Submitted"}
        </div>
        {result.submittedAt && (
          <div className="text-sm text-neutral-600">
            {result.attemptNumber ? `Attempt ${result.attemptNumber} · ` : ""}
            Submitted {formatDateTime(result.submittedAt)}
          </div>
        )}
        {result.dropped && (
          <div className="mt-1">Quiz edited: attempts dropped.</div>
        )}
        {result.correctAnswersShown === false && (
          <div className="mt-1 text-sm text-neutral-600">
            The correct answers aren&apos;t shown for this quiz yet.
          </div>
        )}
      </div>
      {result.questions && (
        <ol className="m-0 list-none space-y-3 p-0">
          {result.questions.map((question, i) => (
            <li key={question._id}>
              <ReviewCard
                number={i + 1}
                question={question}
                graded={graded.get(question._id)}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const right = (
  <FaCheck className="text-green-600" aria-label="Correct answer" />
);
const wrong = <FaTimes className="text-red-600" aria-label="Wrong answer" />;

function ReviewCard({
  number,
  question: q,
  graded,
}: {
  number: number;
  question: ReviewQuestion;
  graded?: GradedAnswer;
}) {
  const answer = graded?.answer ?? undefined;
  const answered = answer !== undefined && answer !== "";
  const verdict = !answered
    ? "No answer"
    : graded?.correct === true
      ? "Correct"
      : graded?.correct === false
        ? "Incorrect"
        : null; // surveys have no right answers
  // One row of options: the student's pick, and right/wrong marks where known.
  const option = (
    key: string,
    text: string,
    picked: boolean,
    isRight?: boolean,
  ) => {
    let mark: ReactNode = null;
    if (isRight) mark = right;
    else if (picked && graded?.correct === true) mark = right;
    else if (picked && graded?.correct === false) mark = wrong;
    return (
      <li
        key={key}
        className={`flex items-start gap-2 ${picked ? "font-semibold" : ""}`}
      >
        <span className="mt-1 inline-block w-4 shrink-0">{mark}</span>
        <span className="whitespace-pre-wrap">{text}</span>
        {picked && (
          <span className="text-sm font-normal text-neutral-500">
            (your answer)
          </span>
        )}
      </li>
    );
  };
  return (
    <div className="wd-review-question rounded border border-neutral-300">
      <div className="flex flex-wrap justify-between gap-2 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-sm">
        <span className="font-semibold">
          Question {number}
          {q.title ? `: ${q.title}` : ""}
        </span>
        <span className="flex items-center gap-3 text-neutral-600">
          {graded?.points !== undefined
            ? `${graded.points} / ${q.points} pts`
            : `${q.points} pts`}
          {verdict && (
            <span
              className={
                verdict === "Correct"
                  ? "text-green-700"
                  : verdict === "Incorrect"
                    ? "text-red-700"
                    : ""
              }
            >
              {verdict}
            </span>
          )}
        </span>
      </div>
      <div className="space-y-2 px-3 py-2">
        <SafeHtml html={q.question} />
        {q.type === "MULTIPLE_CHOICE" && (
          <ul className="m-0 list-none space-y-1 p-0">
            {(q.choices ?? []).map((c) =>
              option(c._id, c.text, answer === c._id, c.correct),
            )}
          </ul>
        )}
        {q.type === "TRUE_FALSE" && (
          <ul className="m-0 list-none space-y-1 p-0">
            {[true, false].map((value) =>
              option(
                String(value),
                value ? "True" : "False",
                answer === value,
                q.correctAnswer === undefined
                  ? undefined
                  : q.correctAnswer === value,
              ),
            )}
          </ul>
        )}
        {q.type === "FILL_IN_BLANK" && (
          <>
            <p className="m-0">
              Your answer:{" "}
              <span className="font-semibold">
                {answered ? String(answer) : "—"}
              </span>
            </p>
            {q.possibleAnswers && (
              <p className="m-0 text-sm text-green-700">
                Correct answers: {q.possibleAnswers.join(", ")}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
