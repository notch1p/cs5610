"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import SafeHtml from "../SafeHtml";
import { errorMessage } from "../quizInfo";
import type {
  Answer,
  AttemptResult,
  SavedAnswer,
  TakingQuestion,
} from "../types";
import AttemptReview from "./AttemptReview";

// Thrown by a saveAction when the server has already ended the attempt
// because time ran out. It carries the finished attempt to show instead.
export class AttemptFinished extends Error {
  result: AttemptResult;
  constructor(result: AttemptResult) {
    super("The attempt has ended.");
    this.result = result;
  }
}

const toRecord = (answers: SavedAnswer[]) =>
  Object.fromEntries(
    answers
      .filter((a) => a.answer !== undefined && a.answer !== null)
      .map((a) => [a.question, a.answer as Answer]),
  ) as Record<string, Answer>;

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

const primary =
  "rounded border-none bg-red-700 px-4 py-2 text-white disabled:opacity-60";
const secondary =
  "rounded border border-neutral-300 bg-neutral-100 px-4 py-2 disabled:opacity-60";

// The screen for taking a quiz. It's shared by students and the faculty
// preview, which differ only in how answers are saved and submitted:
// - saveAction stores answers as the student goes. A preview passes none, and
//   answers are only kept on screen (locking still applies).
// - submitAction grades the attempt; the result is then shown here.
export default function QuizTaker({
  title,
  oneQuestionAtATime,
  lockQuestionsAfterAnswering,
  questions,
  deadline,
  initialAnswers,
  saveAction,
  submitAction,
  doneHref,
}: {
  title: string;
  oneQuestionAtATime: boolean;
  lockQuestionsAfterAnswering: boolean;
  questions: TakingQuestion[];
  deadline: string | null;
  initialAnswers: SavedAnswer[];
  saveAction?: (answers: SavedAnswer[]) => Promise<SavedAnswer[]>;
  submitAction: (answers: SavedAnswer[]) => Promise<AttemptResult>;
  doneHref: string;
}) {
  const [answers, setAnswers] = useState(() => toRecord(initialAnswers));
  // What's been saved. With lockQuestionsAfterAnswering these can't change.
  const [saved, setSaved] = useState(() => toRecord(initialAnswers));
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"taking" | "submitting" | "done">(
    "taking",
  );
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [notice, setNotice] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const submitted = useRef(false);
  const deadlineMs = deadline ? Date.parse(deadline) : null;

  const locked = (id: string) => lockQuestionsAfterAnswering && id in saved;
  const isAnswered = (id: string) =>
    answers[id] !== undefined && answers[id] !== "";
  const finish = (finished: AttemptResult) => {
    submitted.current = true;
    setResult(finished);
    setPhase("done");
  };

  // Saves the answers that changed since they were last saved.
  const save = async (changes: SavedAnswer[]) => {
    const pending = changes.filter(
      ({ question, answer }) =>
        !locked(question) && (answer ?? undefined) !== saved[question],
    );
    if (!pending.length) return;
    if (!saveAction) {
      setSaved((s) => ({ ...s, ...toRecord(pending) }));
      return;
    }
    try {
      const stored = toRecord(await saveAction(pending));
      setSaved(stored);
      // With locking, the server keeps the first answer; show that one.
      if (lockQuestionsAfterAnswering) setAnswers((a) => ({ ...a, ...stored }));
      setNotice("");
    } catch (e) {
      if (e instanceof AttemptFinished) finish(e.result);
      else
        setNotice(
          "Couldn't save your last answer. It'll be sent when you submit.",
        );
    }
  };
  const submit = async () => {
    if (submitted.current) return;
    submitted.current = true;
    setConfirming(false);
    setPhase("submitting");
    try {
      const all = Object.entries(answers).map(([question, answer]) => ({
        question,
        answer,
      }));
      finish(await submitAction(all));
    } catch (e) {
      submitted.current = false;
      setNotice(errorMessage(e, "Couldn't submit the quiz. Try again."));
      setPhase("taking");
    }
  };

  // Count down, and submit what's on screen when time runs out. The server
  // still accepts it for 30 seconds after the deadline.
  const onTimeUp = useEffectEvent(() => {
    void submit();
  });
  useEffect(() => {
    if (deadlineMs === null) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= deadlineMs) {
        clearInterval(timer);
        onTimeUp();
      }
    };
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [deadlineMs]);

  if (phase === "done" && result) {
    return (
      <div className="space-y-4">
        <h3 className="m-0 text-xl font-semibold">{title}</h3>
        <AttemptReview result={result} />
        <Link href={doneHref} className="text-red-700">
          Back to the quiz
        </Link>
      </div>
    );
  }

  // Picking an option is an answer in itself, and typed answers count when the
  // student leaves the box. One question at a time saves on moving instead.
  const choose = (id: string, answer: Answer) => {
    setAnswers((a) => ({ ...a, [id]: answer }));
    if (!oneQuestionAtATime) void save([{ question: id, answer }]);
  };
  const leaveText = (id: string) => {
    if (!oneQuestionAtATime) void save([{ question: id, answer: answers[id] }]);
  };
  const goTo = (index: number) => {
    const id = questions[current]?._id;
    if (id) void save([{ question: id, answer: answers[id] }]);
    setCurrent(index);
  };
  const unanswered = questions.filter((q) => !isAnswered(q._id)).length;
  const shown = oneQuestionAtATime
    ? questions.slice(current, current + 1)
    : questions;
  const remaining =
    deadlineMs !== null && now !== null ? deadlineMs - now : null;

  return (
    <div id="wd-quiz-taker" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 text-xl font-semibold">{title}</h3>
        {deadlineMs !== null && (
          <span
            id="wd-quiz-timer"
            className={`font-mono text-lg ${remaining !== null && remaining < 60_000 ? "text-red-700" : ""}`}
          >
            Time left:{" "}
            {remaining === null ? "--:--" : formatRemaining(remaining)}
          </span>
        )}
      </div>
      {lockQuestionsAfterAnswering && (
        <p className="m-0 text-sm text-neutral-600">
          Answers are locked once saved
          {oneQuestionAtATime
            ? ", which happens when you move to another question"
            : ""}
          .
        </p>
      )}
      {notice && <p className="m-0 text-amber-700">{notice}</p>}
      {questions.length === 0 && (
        <p className="m-0">This quiz has no questions.</p>
      )}
      {oneQuestionAtATime && questions.length > 1 && (
        <nav aria-label="Questions" className="flex flex-wrap gap-1">
          {questions.map((q, i) => (
            <button
              key={q._id}
              type="button"
              aria-current={i === current}
              aria-label={`Question ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-8 w-8 rounded border text-sm ${
                i === current
                  ? "border-red-700 bg-red-700 text-white"
                  : isAnswered(q._id)
                    ? "border-neutral-400 bg-neutral-200"
                    : "border-neutral-300 bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      )}
      <ol className="m-0 list-none space-y-4 p-0">
        {shown.map((q) => (
          <li key={q._id}>
            <QuestionCard
              number={questions.indexOf(q) + 1}
              question={q}
              value={answers[q._id]}
              locked={locked(q._id)}
              disabled={phase !== "taking"}
              onChoose={(answer) => choose(q._id, answer)}
              onType={(text) => setAnswers((a) => ({ ...a, [q._id]: text }))}
              onLeave={() => leaveText(q._id)}
            />
          </li>
        ))}
      </ol>
      {oneQuestionAtATime && questions.length > 1 && (
        <div className="flex justify-between">
          <button
            type="button"
            id="wd-quiz-previous"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
            className={secondary}
          >
            Previous
          </button>
          <button
            type="button"
            id="wd-quiz-next"
            disabled={current === questions.length - 1}
            onClick={() => goTo(current + 1)}
            className={secondary}
          >
            Next
          </button>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-neutral-300 pt-3">
        {confirming ? (
          <>
            <span>
              {unanswered} {unanswered === 1 ? "question is" : "questions are"}{" "}
              unanswered. Submit anyway?
            </span>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className={secondary}
            >
              Keep working
            </button>
            <button
              type="button"
              onClick={() => void submit()}
              className={primary}
            >
              Submit
            </button>
          </>
        ) : (
          <button
            type="button"
            id="wd-quiz-submit"
            disabled={phase !== "taking"}
            onClick={() => (unanswered ? setConfirming(true) : void submit())}
            className={primary}
          >
            {phase === "submitting" ? "Submitting…" : "Submit Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  number,
  question: q,
  value,
  locked,
  disabled,
  onChoose,
  onType,
  onLeave,
}: {
  number: number;
  question: TakingQuestion;
  value?: Answer;
  locked: boolean;
  disabled: boolean;
  onChoose: (answer: Answer) => void;
  onType: (text: string) => void;
  onLeave: () => void;
}) {
  return (
    <div className="wd-take-question rounded border border-neutral-300">
      <div className="flex flex-wrap justify-between gap-2 border-b border-neutral-300 bg-neutral-100 px-3 py-2 text-sm">
        <span className="font-semibold">
          Question {number}
          {q.title ? `: ${q.title}` : ""}
        </span>
        <span className="text-neutral-600">
          {q.points} pts{locked ? " · Locked" : ""}
        </span>
      </div>
      <fieldset
        disabled={locked || disabled}
        className="m-0 min-w-0 space-y-2 border-none px-3 py-2"
      >
        <SafeHtml html={q.question} />
        {q.type === "MULTIPLE_CHOICE" && (
          <ul className="m-0 list-none space-y-1 p-0">
            {(q.choices ?? []).map((c) => (
              <li key={c._id}>
                <label className="flex items-start gap-2">
                  <input
                    type="radio"
                    name={`answer-${q._id}`}
                    checked={value === c._id}
                    onChange={() => onChoose(c._id)}
                    className="mt-1"
                  />
                  <span className="whitespace-pre-wrap">{c.text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {q.type === "TRUE_FALSE" && (
          <div className="flex gap-6">
            {[true, false].map((option) => (
              <label key={String(option)} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`answer-${q._id}`}
                  checked={value === option}
                  onChange={() => onChoose(option)}
                />
                {option ? "True" : "False"}
              </label>
            ))}
          </div>
        )}
        {q.type === "FILL_IN_BLANK" && (
          <input
            aria-label="Your answer"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onType(e.target.value)}
            onBlur={onLeave}
            className="w-full max-w-md rounded border border-neutral-300 px-2 py-1"
          />
        )}
      </fieldset>
    </div>
  );
}
