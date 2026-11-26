"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { errorMessage, isStatus } from "../../quizInfo";
import type {
  AttemptInProgress,
  AttemptResult,
  StudentQuiz,
} from "../../types";
import QuizTaker, { AttemptFinished } from "../QuizTaker";

// A student taking a quiz: the attempt in progress, started from the quiz's
// details screen. Reloading resumes it.
export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const quizId = qid as string;
  const detailsHref = `/courses/${cid}/quizzes/${quizId}`;
  const [quiz, setQuiz] = useState<StudentQuiz | null>(null);
  // undefined while loading, null when there's no attempt in progress.
  const [attempt, setAttempt] = useState<AttemptInProgress | null>();
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      client.findQuiz<StudentQuiz>(quizId),
      client.findCurrentAttempt(quizId),
    ])
      .then(([q, a]) => {
        setQuiz(q);
        setAttempt(a);
      })
      .catch((e) => setError(errorMessage(e, "Couldn't load the quiz.")));
  }, [quizId]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!quiz || attempt === undefined) return null;
  if (attempt === null) {
    return (
      <p>
        No attempt in progress.{" "}
        <Link href={detailsHref} className="text-red-700">
          Back to the quiz
        </Link>
      </p>
    );
  }
  // When the server has already submitted the attempt (409), show that.
  const lastAttempt = async (): Promise<AttemptResult> =>
    (await client.findLastAttempt(quizId)) ?? {};
  return (
    <QuizTaker
      title={quiz.title}
      oneQuestionAtATime={quiz.oneQuestionAtATime}
      lockQuestionsAfterAnswering={quiz.lockQuestionsAfterAnswering}
      questions={attempt.questions}
      deadline={attempt.deadline}
      initialAnswers={attempt.answers}
      saveAction={async (answers) => {
        try {
          return await client.saveAnswers(quizId, attempt._id, answers);
        } catch (e) {
          if (isStatus(e, 409)) throw new AttemptFinished(await lastAttempt());
          throw e;
        }
      }}
      submitAction={async (answers) => {
        try {
          return await client.submitAttempt(quizId, attempt._id, answers);
        } catch (e) {
          if (isStatus(e, 409)) return lastAttempt();
          throw e;
        }
      }}
      doneHref={detailsHref}
    />
  );
}
