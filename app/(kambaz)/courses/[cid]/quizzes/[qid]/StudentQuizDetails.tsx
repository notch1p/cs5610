"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { errorMessage, formatDateTime } from "../quizInfo";
import type { AttemptStatus, StudentQuiz } from "../types";

const button =
  "inline-block rounded border-none bg-red-700 px-4 py-2 text-white no-underline disabled:opacity-60";

export default function StudentQuizDetails({
  cid,
  qid,
}: {
  cid: string;
  qid: string;
}) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<StudentQuiz | null>(null);
  const [status, setStatus] = useState<AttemptStatus | null>(null);
  const [error, setError] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState("");
  useEffect(() => {
    Promise.all([
      client.findQuiz<StudentQuiz>(qid),
      client.findAttemptStatus(qid),
    ])
      .then(([q, s]) => {
        setQuiz(q);
        setStatus(s);
      })
      .catch((e) => setError(errorMessage(e, "Couldn't load the quiz.")));
  }, [qid]);
  if (error) return <p className="text-red-700">{error}</p>;
  if (!quiz || !status) return null;

  const base = `/courses/${cid}/quizzes/${qid}`;
  const start = async () => {
    setStarting(true);
    setStartError("");
    try {
      await client.startAttempt(qid, accessCode);
      router.push(`${base}/take`);
    } catch (e) {
      setStartError(errorMessage(e, "Couldn't start the quiz."));
      setStarting(false);
    }
  };
  // Why the quiz can't be started, when it can't.
  const blocked =
    status.availability === "NOT_YET"
      ? `Not available until ${formatDateTime(quiz.availableDate)}.`
      : status.availability === "CLOSED"
        ? "This quiz is closed."
        : "No attempts left.";
  const last = status.lastAttempt;
  return (
    <div id="wd-quiz-details" className="space-y-4">
      <h3 className="m-0 text-xl font-semibold">{quiz.title}</h3>
      <p className="m-0 text-sm text-neutral-600">
        {quiz.timeLimit
          ? `Time limit: ${quiz.timeLimit} minutes`
          : "No time limit"}{" "}
        · Attempts used: {status.attemptsUsed} of {status.attemptsAllowed}
      </p>
      {status.inProgress ? (
        <Link href={`${base}/take`} id="wd-quiz-resume" className={button}>
          Resume Quiz
        </Link>
      ) : status.canStart ? (
        <div className="flex flex-wrap items-center gap-2">
          {quiz.hasAccessCode && (
            <input
              id="wd-quiz-access-code"
              aria-label="Access code"
              placeholder="Access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="rounded border border-neutral-300 px-3 py-2"
            />
          )}
          <button
            type="button"
            id="wd-quiz-start"
            disabled={starting}
            onClick={start}
            className={button}
          >
            Start Quiz
          </button>
          {startError && <span className="text-red-700">{startError}</span>}
        </div>
      ) : (
        <p id="wd-quiz-unavailable" className="m-0">
          {blocked}
        </p>
      )}
      {last && (
        <div
          id="wd-quiz-last-attempt"
          className="space-y-1 rounded border border-neutral-300 p-3"
        >
          <div className="font-semibold">Last attempt</div>
          <div>
            {last.score !== undefined
              ? `Score: ${last.score} / ${last.maxScore}`
              : "Submitted"}{" "}
            · {formatDateTime(last.submittedAt)}
          </div>
          {last.dropped ? (
            <div className="text-neutral-600">
              Quiz edited: attempts dropped.
            </div>
          ) : (
            <Link
              href={`${base}/review`}
              id="wd-quiz-view-attempt"
              className="text-red-700"
            >
              View attempt
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
