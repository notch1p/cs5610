"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as client from "../client";
import { errorMessage } from "../quizInfo";
import type { Question, Quiz } from "../types";
import QuizDetailsForm from "./QuizDetailsForm";
import QuestionList from "./QuestionList";
import { newQuestion, tidyQuestion } from "./QuestionEditor";

const TABS = { details: "Details", questions: "Questions" } as const;
type Tab = keyof typeof TABS;

const totalPoints = (questions: Question[]) =>
  questions.reduce((sum, q) => sum + (q.points || 0), 0);
const primary =
  "rounded border-none bg-red-700 px-3 py-1.5 text-sm text-white disabled:opacity-60";
const secondary =
  "rounded border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-sm disabled:opacity-60";

export default function FacultyQuizDetails({
  cid,
  qid,
}: {
  cid: string;
  qid: string;
}) {
  const router = useRouter();
  // "+ Quiz" opens the new quiz straight in edit mode.
  const editOnLoad = useSearchParams().get("edit") === "1";
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("details");
  // While editing, both tabs work on one draft of the whole quiz. Questions
  // open in their editors keep their not-yet-accepted changes in `open`, and
  // `fresh` lists new questions that haven't been accepted even once.
  const [draft, setDraft] = useState<Quiz | null>(null);
  const [open, setOpen] = useState<Record<string, Question>>({});
  const [fresh, setFresh] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    client
      .findQuiz<Quiz>(qid)
      .then((loaded) => {
        setQuiz(loaded);
        if (editOnLoad) setDraft(loaded);
      })
      .catch((e) => setError(errorMessage(e, "Couldn't load the quiz.")));
  }, [qid, editOnLoad]);

  if (error) return <p className="text-red-700">{error}</p>;
  if (!quiz) return null;
  const editing = draft !== null;
  const shown = draft ?? quiz;
  const backToList = () => router.push(`/courses/${cid}/quizzes`);

  const startEditing = () => {
    setDraft(quiz);
    setOpen({});
    setFresh([]);
    setSaveError("");
  };
  const setQuestions = (update: (questions: Question[]) => Question[]) =>
    setDraft((d) => d && { ...d, questions: update(d.questions) });
  const openQuestion = (question: Question) =>
    setOpen((o) => ({ ...o, [question._id]: question }));
  const closeQuestion = (id: string) => {
    setOpen((o) =>
      Object.fromEntries(Object.entries(o).filter(([k]) => k !== id)),
    );
    setFresh((f) => f.filter((k) => k !== id));
  };
  const addQuestion = () => {
    const question = newQuestion();
    setQuestions((questions) => [...questions, question]);
    openQuestion(question);
    setFresh((f) => [...f, question._id]);
  };
  const acceptQuestion = (id: string) => {
    const accepted = tidyQuestion(open[id]);
    setQuestions((questions) =>
      questions.map((q) => (q._id === id ? accepted : q)),
    );
    closeQuestion(id);
  };
  // A new question that was never accepted goes away; any other question
  // goes back to how it was before it was opened.
  const cancelQuestion = (id: string) => {
    if (fresh.includes(id)) {
      setQuestions((questions) => questions.filter((q) => q._id !== id));
    }
    closeQuestion(id);
  };
  const deleteQuestion = (id: string) => {
    setQuestions((questions) => questions.filter((q) => q._id !== id));
    closeQuestion(id);
  };
  // Saves the whole draft, questions still open in their editors included,
  // then goes back to the list.
  const save = async (publish: boolean) => {
    if (!draft) return;
    setSaving(true);
    setSaveError("");
    try {
      await client.updateQuiz({
        ...draft,
        questions: draft.questions.map((q) =>
          open[q._id] ? tidyQuestion(open[q._id]) : q,
        ),
        ...(publish ? { published: true } : {}),
      });
      backToList();
    } catch (e) {
      setSaveError(errorMessage(e, "Couldn't save the quiz."));
      setSaving(false);
    }
  };

  return (
    <div id="wd-quiz-details">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 text-xl font-semibold">
          {shown.title || "Unnamed Quiz"}{" "}
          <span className="align-middle text-sm font-normal text-neutral-500">
            {editing
              ? "Editing"
              : shown.published
                ? "Published"
                : "Unpublished"}
          </span>
        </h3>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                type="button"
                id="wd-quiz-cancel"
                onClick={backToList}
                className={secondary}
              >
                Cancel
              </button>
              <button
                type="button"
                id="wd-quiz-save-publish"
                disabled={saving}
                onClick={() => save(true)}
                className={secondary}
              >
                Save &amp; Publish
              </button>
              <button
                type="button"
                id="wd-quiz-save"
                disabled={saving}
                onClick={() => save(false)}
                className={primary}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/courses/${cid}/quizzes/${qid}/preview`}
                id="wd-quiz-preview"
                className={`${secondary} inline-block text-neutral-900 no-underline`}
              >
                Preview
              </Link>
              <button
                type="button"
                id="wd-quiz-edit"
                onClick={startEditing}
                className={primary}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
      {saveError && <p className="text-red-700">{saveError}</p>}
      <div
        role="tablist"
        className="mb-4 flex gap-1 border-b border-neutral-300"
      >
        {(Object.keys(TABS) as Tab[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`wd-quiz-${key}-tab`}
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`-mb-px rounded-t border px-4 py-2 text-sm ${
              tab === key
                ? "border-neutral-300 border-b-white bg-white font-semibold"
                : "border-transparent bg-transparent text-red-700"
            }`}
          >
            {TABS[key]}
          </button>
        ))}
      </div>
      {tab === "details" ? (
        <QuizDetailsForm
          quiz={{ ...shown, points: totalPoints(shown.questions) }}
          editing={editing}
          onChangeAction={(changes) =>
            setDraft((d) => d && { ...d, ...changes })
          }
        />
      ) : (
        <>
          <QuestionList
            questions={shown.questions}
            editing={editing}
            open={open}
            fresh={fresh}
            onNewAction={addQuestion}
            onEditAction={openQuestion}
            onChangeAction={openQuestion}
            onSaveAction={acceptQuestion}
            onCancelAction={cancelQuestion}
            onDeleteAction={deleteQuestion}
          />
          {editing && (
            <div className="mt-4 flex justify-end gap-2 border-t border-neutral-300 pt-3">
              <button type="button" onClick={backToList} className={secondary}>
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => save(false)}
                className={primary}
              >
                Save
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
