import { biologyQuestions } from "./biologyQuestions";
import {
  PLANNED_CHAPTERS,
  QUESTIONS_PER_CHAPTER,
  chapterOrdinals,
  chapterIntros,
} from "../config/app";

export function getQuestionsByChapter(chapter) {
  return biologyQuestions.filter((item) => item.chapter === chapter);
}

export function getQuestionById(id) {
  return biologyQuestions.find((item) => item.id === id) ?? null;
}

export function getAvailableChapterNumbers() {
  return [...new Set(biologyQuestions.map((item) => item.chapter))].sort(
    (a, b) => a - b,
  );
}

export function getChapterMeta(chapter) {
  return {
    chapter,
    ordinal: chapterOrdinals[chapter] ?? String(chapter),
    intro: chapterIntros[chapter] ?? "كمّلي رحلتك بثقة 🌱",
    questions: getQuestionsByChapter(chapter),
    hasQuestions: getQuestionsByChapter(chapter).length === QUESTIONS_PER_CHAPTER,
  };
}

export function getBiologyChapterCards() {
  return Array.from({ length: PLANNED_CHAPTERS }, (_, index) => {
    const chapter = index + 1;
    const questions = getQuestionsByChapter(chapter);
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

export function getTotalQuestionCount() {
  return biologyQuestions.length;
}
