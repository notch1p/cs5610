"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { useAccountContext } from "@/app/(kambaz)/account/AccountContext";
import { isFacultyRole } from "../quizInfo";
import FacultyQuizDetails from "./FacultyQuizDetails";
import StudentQuizDetails from "./StudentQuizDetails";

// Faculty get the quiz's settings and questions, and the editor; students get
// a way to take it.
export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useAccountContext();
  return isFacultyRole(currentUser?.role) ? (
    // FacultyQuizDetails reads ?edit=1; useSearchParams needs a Suspense boundary.
    <Suspense fallback={null}>
      <FacultyQuizDetails cid={cid as string} qid={qid as string} />
    </Suspense>
  ) : (
    <StudentQuizDetails cid={cid as string} qid={qid as string} />
  );
}
