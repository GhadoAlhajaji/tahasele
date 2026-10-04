import { biologyQuestions } from "./biologyQuestions.js";
import { chemistryQuestions } from "./chemistryQuestions.js";
import { physicsQuestions } from "./physicsQuestions.js";
import {
  QUESTIONS_PER_CHAPTER,
  chapterOrdinals,
  chapterIntros,
  SUBJECT_IDS,
} from "../config/app.js";
import { getSubjectById } from "../config/subjects.js";

const questionBanks = {
  [SUBJECT_IDS.biology]: biologyQuestions,
  [SUBJECT_IDS.chemistry]: chemistryQuestions,
  [SUBJECT_IDS.physics]: physicsQuestions,
};

export function getQuestions(subjectId) {
  return questionBanks[subjectId] ?? [];
}

export function getQuestionsByChapter(subjectId, chapter) {
  return getQuestions(subjectId).filter((item) => item.chapter === chapter);
}

export function getQuestionById(subjectId, id) {
  return getQuestions(subjectId).find((item) => item.id === id) ?? null;
}

export function acceptedAnswers(question) {
  if (!question) return [];
  return question.acceptedAnswers?.length ? question.acceptedAnswers : [question.correctAnswer];
}

export function isCorrectOption(question, option) {
  return acceptedAnswers(question).includes(option);
}

export function correctAnswerText(question) {
  return acceptedAnswers(question).join(" أو ");
}

export function getAvailableChapterNumbers(subjectId) {
  return [...new Set(getQuestions(subjectId).map((item) => item.chapter))].sort(
    (a, b) => a - b,
  );
}

export function getChapterMeta(subjectId, chapter) {
  const questions = getQuestionsByChapter(subjectId, chapter);
  return {
    chapter,
    ordinal: chapterOrdinals[chapter] ?? String(chapter),
    intro: chapterIntros[chapter] ?? "كمّلي رحلتك بثقة 🌱",
    questions,
    hasQuestions: questions.length === QUESTIONS_PER_CHAPTER,
  };
}

export function getSubjectChapterCards(subjectId) {
  const subject = getSubjectById(subjectId);
  const planned = subject?.plannedChapters ?? 0;
  return Array.from({ length: planned }, (_, index) => {
    const chapter = index + 1;
    const questions = getQuestionsByChapter(subjectId, chapter);
    return {
      chapter,
      ordinal: chapterOrdinals[chapter],
      intro: chapterIntros[chapter],
      questionCount: questions.length,
      ready: questions.length === QUESTIONS_PER_CHAPTER,
      comingSoon: questions.length !== QUESTIONS_PER_CHAPTER,
    };
  });
}

export function getTotalQuestionCount(subjectId) {
  return getQuestions(subjectId).length;
}

export function getBiologyChapterCards() {
  return getSubjectChapterCards(SUBJECT_IDS.biology);
}
