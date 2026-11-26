import axios from "axios";
import type {
  AttemptInProgress,
  AttemptResult,
  AttemptStatus,
  Quiz,
  SavedAnswer,
  StudentQuiz,
} from "./types";

const api = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// Faculty get Quiz objects; students get StudentQuiz objects.
export const findQuizzesForCourse = async (
  courseId: string,
): Promise<(Quiz | StudentQuiz)[]> =>
  (await api.get(`${COURSES_API}/${courseId}/quizzes`)).data;
export const createQuiz = async (courseId: string): Promise<Quiz> =>
  (await api.post(`${COURSES_API}/${courseId}/quizzes`, {})).data;
export const findQuiz = async <T extends Quiz | StudentQuiz>(
  quizId: string,
): Promise<T> => (await api.get(`${QUIZZES_API}/${quizId}`)).data;
export const updateQuiz = async (
  quiz: Partial<Quiz> & { _id: string },
): Promise<Quiz> => (await api.put(`${QUIZZES_API}/${quiz._id}`, quiz)).data;
export const deleteQuiz = async (quizId: string) =>
  (await api.delete(`${QUIZZES_API}/${quizId}`)).data;
export const findAttemptStatus = async (
  quizId: string,
): Promise<AttemptStatus> =>
  (await api.get(`${QUIZZES_API}/${quizId}/attempts/status`)).data;

// Starts an attempt, or resumes the one in progress.
export const startAttempt = async (
  quizId: string,
  accessCode: string,
): Promise<AttemptInProgress> =>
  (await api.post(`${QUIZZES_API}/${quizId}/attempts`, { accessCode })).data;
// The attempt in progress, or null when there's none.
export const findCurrentAttempt = async (
  quizId: string,
): Promise<AttemptInProgress | null> => {
  try {
    return (await api.get(`${QUIZZES_API}/${quizId}/attempts/current`)).data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return null;
    throw e;
  }
};
// Resolves to every answer the server now has for the attempt.
export const saveAnswers = async (
  quizId: string,
  attemptId: string,
  answers: SavedAnswer[],
): Promise<SavedAnswer[]> =>
  (
    await api.put(`${QUIZZES_API}/${quizId}/attempts/${attemptId}/answers`, {
      answers,
    })
  ).data.answers;
export const submitAttempt = async (
  quizId: string,
  attemptId: string,
  answers: SavedAnswer[],
): Promise<AttemptResult> =>
  (
    await api.post(`${QUIZZES_API}/${quizId}/attempts/${attemptId}/submit`, {
      answers,
    })
  ).data;
// Faculty preview: grades the answers like a real attempt, but saves nothing.
export const previewQuiz = async (
  quizId: string,
  answers: SavedAnswer[],
): Promise<AttemptResult> =>
  (await api.post(`${QUIZZES_API}/${quizId}/preview`, { answers })).data;
// The last submitted attempt, or null when there's none.
export const findLastAttempt = async (
  quizId: string,
): Promise<AttemptResult | null> =>
  (await api.get(`${QUIZZES_API}/${quizId}/attempts/last`)).data;
