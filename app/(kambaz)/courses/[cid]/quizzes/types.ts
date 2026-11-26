// Shapes of the quiz API's responses. See kambaz-server/docs/quizzes.md.

export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
export type QuizType =
  "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
export type AssignmentGroup = "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
export type ShowCorrectAnswers =
  "NEVER" | "IMMEDIATELY" | "AFTER_LAST_ATTEMPT" | "AFTER_DUE_DATE";
export type Availability = "NOT_YET" | "AVAILABLE" | "CLOSED";

export type Choice = { _id: string; text: string; correct?: boolean };
export type Question = {
  _id: string;
  type: QuestionType;
  title: string;
  points: number;
  question: string; // HTML
  choices: Choice[];
  correctAnswer?: boolean;
  possibleAnswers: string[];
  caseSensitive: boolean;
};

// Fields faculty and students both get.
type QuizBase = {
  _id: string;
  course: string;
  title: string;
  description?: string; // HTML
  quizType: QuizType;
  assignmentGroup: AssignmentGroup;
  points: number;
  shuffleAnswers: boolean;
  timeLimit: number | null; // minutes; null = no limit
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: ShowCorrectAnswers;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  // ISO date-times; unset or null means no restriction.
  dueDate?: string | null;
  availableDate?: string | null;
  untilDate?: string | null;
  published: boolean;
  version: number;
};
// What faculty get: everything, answers included.
export type Quiz = QuizBase & { accessCode: string; questions: Question[] };
// What students get outside an attempt.
export type StudentQuiz = QuizBase & {
  hasAccessCode: boolean;
  questionCount: number;
};

// A choice's _id, true/false, or the text typed into a blank.
export type Answer = string | boolean;
export type SavedAnswer = { question: string; answer?: Answer | null };

// A question while it's being answered: nothing that gives the answer away.
export type TakingQuestion = {
  _id: string;
  type: QuestionType;
  title: string;
  points: number;
  question: string; // HTML
  choices?: { _id: string; text: string }[];
};
export type AttemptInProgress = {
  _id: string;
  attemptNumber: number;
  startedAt: string;
  deadline: string | null;
  answers: SavedAnswer[];
  questions: TakingQuestion[];
};

// A question in a review. The right answers are there only when they may be
// shown.
export type ReviewQuestion = Omit<TakingQuestion, "choices"> & {
  choices?: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
};
export type GradedAnswer = SavedAnswer & { correct?: boolean; points?: number };
// A graded attempt: one just submitted, the last one, or a faculty preview.
// A dropped attempt has only its score.
export type AttemptResult = {
  _id?: string;
  attemptNumber?: number;
  submittedAt?: string;
  dropped?: boolean;
  score?: number; // none for ungraded surveys
  maxScore?: number;
  correctAnswersShown?: boolean;
  answers?: GradedAnswer[];
  questions?: ReviewQuestion[];
};

export type AttemptSummary = {
  _id: string;
  attemptNumber: number;
  score?: number; // none for ungraded surveys
  maxScore?: number;
  submittedAt: string;
  dropped: boolean;
};
export type AttemptStatus = {
  availability: Availability;
  attemptsAllowed: number;
  attemptsUsed: number;
  canStart: boolean;
  inProgress: { _id: string; deadline: string | null } | null;
  lastAttempt: AttemptSummary | null;
};
