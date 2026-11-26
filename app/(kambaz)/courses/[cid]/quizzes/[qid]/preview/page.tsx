"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { errorMessage } from "../../quizInfo";
import type { Quiz, TakingQuestion } from "../../types";
import QuizTaker from "../QuizTaker";

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// The questions as a student would get them: no answers, and the choices
// shuffled when the quiz says so.
const asTaken = (quiz: Quiz): TakingQuestion[] =>
  quiz.questions.map(({ _id, type, title, points, question, choices }) => ({
    _id,
    type,
    title,
    points,
    question,
    choices:
      type === "MULTIPLE_CHOICE"
        ? (quiz.shuffleAnswers ? shuffled(choices) : choices).map(
            ({ _id, text }) => ({ _id, text }),
          )
        : undefined,
  }));

type Preview = {
  quiz: Quiz;
  questions: TakingQuestion[];
  deadline: string | null;
};

// Faculty taking their own quiz: the student screen, graded but never saved.
// The access code and the availability dates don't apply.
export default function PreviewQuiz() {
  const { cid, qid } = useParams();
  const quizId = qid as string;
  const detailsHref = `/courses/${cid}/quizzes/${quizId}`;
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    client
      .findQuiz<Quiz>(quizId)
      .then((quiz) => {
        // Students get the quiz without its questions.
        if (!("questions" in quiz)) {
          setError("Only faculty can preview quizzes.");
          return;
        }
        setPreview({
          quiz,
          questions: asTaken(quiz),
          // The time limit counts from when the preview opens.
          deadline: quiz.timeLimit
            ? new Date(Date.now() + quiz.timeLimit * 60_000).toISOString()
            : null,
        });
      })
      .catch((e) => setError(errorMessage(e, "Couldn't load the quiz.")));
  }, [quizId]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!preview) return null;
  const { quiz } = preview;
  return (
    <div id="wd-quiz-preview-screen" className="space-y-4">
      <p className="m-0 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm">
        This is a preview of the published version: your answers are graded, but
        not saved.{" "}
        <Link href={detailsHref} className="text-red-700">
          Back to the quiz
        </Link>
      </p>
      <QuizTaker
        title={quiz.title}
        oneQuestionAtATime={quiz.oneQuestionAtATime}
        lockQuestionsAfterAnswering={quiz.lockQuestionsAfterAnswering}
        questions={preview.questions}
        deadline={preview.deadline}
        initialAnswers={[]}
        submitAction={(answers) => client.previewQuiz(quizId, answers)}
        doneHref={detailsHref}
      />
    </div>
  );
}
