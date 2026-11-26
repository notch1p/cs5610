"use client";

import RichText from "../RichText";
import SafeHtml from "../SafeHtml";
import {
  ASSIGNMENT_GROUPS,
  fromLocalInput,
  QUIZ_TYPES,
  SHOW_CORRECT_ANSWERS,
  toLocalInput,
} from "../quizInfo";
import type {
  AssignmentGroup,
  Quiz,
  QuizType,
  ShowCorrectAnswers,
} from "../types";

const input = "w-full rounded border border-neutral-300 px-3 py-1.5";
const options = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

// The quiz's settings. While not `editing`, everything is "frozen": disabled
// and hatched (see .wd-frozen in kambaz.css).
export default function QuizDetailsForm({
  quiz,
  editing,
  onChangeAction: onChange,
}: {
  quiz: Quiz;
  editing: boolean;
  onChangeAction: (changes: Partial<Quiz>) => void;
}) {
  return (
    <fieldset
      disabled={!editing}
      className={`m-0 min-w-0 space-y-4 border-none p-0 ${editing ? "" : "wd-frozen"}`}
    >
      <label className="block">
        <span className="mb-1 block">Quiz Title</span>
        <input
          id="wd-quiz-title"
          value={quiz.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className={input}
        />
      </label>
      <div>
        <span className="mb-1 block">Description</span>
        {editing ? (
          <RichText
            id="wd-quiz-description"
            value={quiz.description ?? ""}
            onChangeAction={(description) => onChange({ description })}
          />
        ) : (
          <SafeHtml
            html={quiz.description}
            className="wd-frozen-box min-h-24 rounded border border-neutral-300 px-3 py-2"
          />
        )}
      </div>
      <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
        <label htmlFor="wd-quiz-type" className="text-right">
          Quiz Type
        </label>
        <select
          id="wd-quiz-type"
          value={quiz.quizType}
          onChange={(e) => onChange({ quizType: e.target.value as QuizType })}
          className={input}
        >
          {options(QUIZ_TYPES)}
        </select>

        <span className="text-right">Points</span>
        <span id="wd-quiz-points">{quiz.points}</span>

        <label htmlFor="wd-quiz-group" className="text-right">
          Assignment Group
        </label>
        <select
          id="wd-quiz-group"
          value={quiz.assignmentGroup}
          onChange={(e) =>
            onChange({ assignmentGroup: e.target.value as AssignmentGroup })
          }
          className={input}
        >
          {options(ASSIGNMENT_GROUPS)}
        </select>

        <span className="self-start text-right">Options</span>
        <div className="space-y-2 rounded border border-neutral-300 p-3">
          <Checkbox
            id="wd-quiz-shuffle"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(shuffleAnswers) => onChange({ shuffleAnswers })}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Checkbox
              id="wd-quiz-time-limit"
              label="Time Limit"
              checked={quiz.timeLimit !== null}
              onChange={(on) => onChange({ timeLimit: on ? 20 : null })}
            />
            {quiz.timeLimit !== null && (
              <label className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    onChange({ timeLimit: Number(e.target.value) })
                  }
                  className="w-20 rounded border border-neutral-300 px-2 py-1"
                />
                Minutes
              </label>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Checkbox
              id="wd-quiz-multiple-attempts"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(multipleAttempts) => onChange({ multipleAttempts })}
            />
            {quiz.multipleAttempts && (
              <label className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={quiz.howManyAttempts}
                  onChange={(e) =>
                    onChange({ howManyAttempts: Number(e.target.value) })
                  }
                  className="w-20 rounded border border-neutral-300 px-2 py-1"
                />
                Attempts
              </label>
            )}
          </div>
          <Checkbox
            id="wd-quiz-one-at-a-time"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(oneQuestionAtATime) => onChange({ oneQuestionAtATime })}
          />
          <Checkbox
            id="wd-quiz-webcam"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={(webcamRequired) => onChange({ webcamRequired })}
          />
          <Checkbox
            id="wd-quiz-lock"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(lockQuestionsAfterAnswering) =>
              onChange({ lockQuestionsAfterAnswering })
            }
          />
        </div>

        <label htmlFor="wd-quiz-show-answers" className="text-right">
          Show Correct Answers
        </label>
        <select
          id="wd-quiz-show-answers"
          value={quiz.showCorrectAnswers}
          onChange={(e) =>
            onChange({
              showCorrectAnswers: e.target.value as ShowCorrectAnswers,
            })
          }
          className={input}
        >
          {options(SHOW_CORRECT_ANSWERS)}
        </select>

        <label htmlFor="wd-quiz-access-code" className="text-right">
          Access Code
        </label>
        <input
          id="wd-quiz-access-code"
          value={quiz.accessCode}
          placeholder="None"
          onChange={(e) => onChange({ accessCode: e.target.value })}
          className={input}
        />

        <span className="self-start text-right">Assign</span>
        <div className="grid gap-3 rounded border border-neutral-300 p-3 sm:grid-cols-3">
          <DateField
            id="wd-quiz-due"
            label="Due"
            value={quiz.dueDate}
            onChange={(dueDate) => onChange({ dueDate })}
          />
          <DateField
            id="wd-quiz-available"
            label="Available from"
            value={quiz.availableDate}
            onChange={(availableDate) => onChange({ availableDate })}
          />
          <DateField
            id="wd-quiz-until"
            label="Until"
            value={quiz.untilDate}
            onChange={(untilDate) => onChange({ untilDate })}
          />
        </div>
      </div>
    </fieldset>
  );
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-neutral-300"
      />
      {label}
    </label>
  );
}

function DateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value?: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input
        id={id}
        type="datetime-local"
        value={toLocalInput(value)}
        onChange={(e) => onChange(fromLocalInput(e.target.value))}
        className={input}
      />
    </label>
  );
}
