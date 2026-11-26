"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { errorMessage } from "../../quizInfo";
import type { AttemptResult, StudentQuiz } from "../../types";
import AttemptReview from "../AttemptReview";

// A student's last submitted attempt, replayed.
export default function ReviewLastAttempt() {
  const { cid, qid } = useParams();
  const quizId = qid as string;
  const detailsHref = `/courses/${cid}/quizzes/${quizId}`;
  const [quiz, setQuiz] = useState<StudentQuiz | null>(null);
  // undefined while loading, null when nothing has been submitted.
  const [last, setLast] = useState<AttemptResult | null>();
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      client.findQuiz<StudentQuiz>(quizId),
      client.findLastAttempt(quizId),
    ])
      .then(([q, l]) => {
        setQuiz(q);
        setLast(l);
      })
      .catch((e) => setError(errorMessage(e, "Couldn't load the attempt.")));
  }, [quizId]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!quiz || last === undefined) return null;
  return (
    <div id="wd-quiz-review" className="space-y-4">
      <h3 className="m-0 text-xl font-semibold">{quiz.title}</h3>
      {last ? (
        <AttemptReview result={last} />
      ) : (
        <p className="m-0">No submitted attempts yet.</p>
      )}
      <Link href={detailsHref} className="text-red-700">
        Back to the quiz
      </Link>
    </div>
  );
}
