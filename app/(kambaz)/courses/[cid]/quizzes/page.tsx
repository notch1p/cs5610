"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useAccountContext } from "@/app/(kambaz)/account/AccountContext";
import * as client from "./client";
import QuizItem from "./QuizItem";
import {
  compareQuizzes,
  errorMessage,
  isFacultyRole,
  type SortKey,
} from "./quizInfo";
import type { Quiz, StudentQuiz } from "./types";

export default function Quizzes() {
  const { cid } = useParams();
  const courseId = cid as string;
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const faculty = isFacultyRole(currentUser?.role);
  const [quizzes, setQuizzes] = useState<(Quiz | StudentQuiz)[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [deleting, setDeleting] = useState<Quiz | StudentQuiz | null>(null);
  useEffect(() => {
    client
      .findQuizzesForCourse(courseId)
      .then(setQuizzes)
      .catch((e) => setError(errorMessage(e, "Couldn't load the quizzes.")));
  }, [courseId, currentUser]);

  // The new quiz is saved right away, then opened in edit mode.
  const addQuiz = async () => {
    const quiz = await client.createQuiz(courseId);
    router.push(`/courses/${courseId}/quizzes/${quiz._id}?edit=1`);
  };
  const setPublished = async (quizId: string, published: boolean) => {
    const updated = await client.updateQuiz({ _id: quizId, published });
    setQuizzes((list) =>
      (list ?? []).map((q) => (q._id === updated._id ? updated : q)),
    );
  };
  const deleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    setQuizzes((list) => (list ?? []).filter((q) => q._id !== quizId));
  };

  const term = search.trim().toLowerCase();
  const visible = (quizzes ?? []).filter((q) =>
    q.title.toLowerCase().includes(term),
  );
  if (sortBy) visible.sort(compareQuizzes(sortBy));

  return (
    <div id="wd-quizzes">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Quiz"
            id="wd-search-quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        {faculty && (
          <button
            id="wd-add-quiz"
            type="button"
            onClick={addQuiz}
            className="inline-flex items-center gap-1 rounded border-none bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
          >
            <FaPlus /> Quiz
          </button>
        )}
      </div>
      <h3
        id="wd-quizzes-title"
        className="mb-3 rounded bg-neutral-200 p-3 text-lg"
      >
        QUIZZES
      </h3>
      {error ? (
        <p className="text-red-700">{error}</p>
      ) : quizzes === null ? null : visible.length === 0 ? (
        <p id="wd-quizzes-empty" className="text-neutral-600">
          {quizzes.length > 0
            ? "No quizzes match your search."
            : faculty
              ? "No quizzes yet. Click + Quiz to add one."
              : "No quizzes"}
        </p>
      ) : (
        <ul id="wd-quiz-list" className="m-0 list-none p-0">
          {visible.map((quiz) => (
            <QuizItem
              key={quiz._id}
              cid={courseId}
              quiz={quiz}
              faculty={faculty}
              onPublishAction={(published) => setPublished(quiz._id, published)}
              onDeleteAction={() => setDeleting(quiz)}
              onSortAction={setSortBy}
            />
          ))}
        </ul>
      )}

      {deleting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          id="wd-delete-quiz-dialog"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
            <div className="px-4 py-3">
              <h3 className="m-0 text-lg font-semibold">
                Delete &ldquo;{deleting.title}&rdquo;?
              </h3>
              <p className="m-0 mt-1 text-sm text-neutral-600">
                Students&apos; attempts at this quiz are deleted too.
              </p>
            </div>
            <div className="flex justify-end gap-2 border-t border-neutral-200 px-4 py-3">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                id="wd-delete-quiz-cancel"
                className="rounded border-none bg-gray-200 px-2 py-1 text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await deleteQuiz(deleting._id);
                  setDeleting(null);
                }}
                id="wd-delete-quiz-confirm"
                className="rounded border-none bg-red-700 px-2 py-1 text-base text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
