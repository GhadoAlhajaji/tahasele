import { SUBJECT_IDS, PLANNED_CHAPTERS } from "../config/app";

/**
 * طبقة حفظ التقدّم.
 * الواجهة العامة ثابتة حتى يمكن لاحقًا استبدال LocalStorageAdapter بقاعدة بيانات.
 */
const STORAGE_KEY = "tahseeli-progress-v2";

function emptySubject() {
  return {
    points: 0,
    scoredQuestionIds: [],
    answers: {},
    completedChapters: [],
    currentChapter: 1,
    lastAttempts: {},
  };
}

function emptyState() {
  return {
    subjects: {
      [SUBJECT_IDS.biology]: emptySubject(),
      [SUBJECT_IDS.chemistry]: emptySubject(),
      [SUBJECT_IDS.physics]: emptySubject(),
    },
  };
}

const localStorageAdapter = {
  load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      return {
        ...emptyState(),
        ...parsed,
        subjects: {
          ...emptyState().subjects,
          ...(parsed.subjects ?? {}),
        },
      };
    } catch {
      return emptyState();
    }
  },
  save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
};

let adapter = localStorageAdapter;
let snapshot = adapter.load();
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener(snapshot));
}

function persist() {
  adapter.save(snapshot);
  emit();
}

export function subscribeProgress(listener) {
  listeners.add(listener);
  listener(snapshot);
  return () => listeners.delete(listener);
}

export function getProgressState() {
  return snapshot;
}

export function getSubjectProgress(subjectId) {
  return snapshot.subjects[subjectId] ?? emptySubject();
}

export function recordAnswer(subjectId, { questionId, chapter, selected, correct }) {
  const subject = {
    ...getSubjectProgress(subjectId),
    answers: { ...getSubjectProgress(subjectId).answers },
    scoredQuestionIds: [...getSubjectProgress(subjectId).scoredQuestionIds],
  };

  const alreadyScored = subject.scoredQuestionIds.includes(questionId);
  const earnedPoints = correct && !alreadyScored ? 10 : 0;

  if (earnedPoints) {
    subject.points += earnedPoints;
    subject.scoredQuestionIds.push(questionId);
  }

  subject.answers[questionId] = {
    selected,
    correct,
    chapter,
    answeredAt: Date.now(),
  };
  subject.currentChapter = chapter;

  snapshot = {
    ...snapshot,
    subjects: {
      ...snapshot.subjects,
      [subjectId]: subject,
    },
  };
  persist();
  return { earnedPoints, alreadyScored };
}

export function completeChapter(subjectId, chapter, attempt) {
  const subject = {
    ...getSubjectProgress(subjectId),
    completedChapters: [...getSubjectProgress(subjectId).completedChapters],
    lastAttempts: { ...getSubjectProgress(subjectId).lastAttempts },
  };

  if (!subject.completedChapters.includes(chapter)) {
    subject.completedChapters.push(chapter);
    subject.completedChapters.sort((a, b) => a - b);
  }

  subject.lastAttempts[chapter] = attempt;
  subject.currentChapter = chapter;

  snapshot = {
    ...snapshot,
    subjects: {
      ...snapshot.subjects,
      [subjectId]: subject,
    },
  };
  persist();
}

export function getAnsweredCount(subjectId) {
  return Object.keys(getSubjectProgress(subjectId).answers).length;
}

export function getMistakeEntries(subjectId, questions) {
  const { answers } = getSubjectProgress(subjectId);
  return questions
    .filter((question) => answers[question.id] && answers[question.id].correct === false)
    .map((question) => ({
      question,
      selected: answers[question.id].selected,
    }));
}

export function resetSubjectProgress(subjectId) {
  snapshot = {
    ...snapshot,
    subjects: {
      ...snapshot.subjects,
      [subjectId]: emptySubject(),
    },
  };
  persist();
}

export function getJourneyStageIndex(completedChapters, plannedChapters = PLANNED_CHAPTERS) {
  if (completedChapters <= 0) return 0;
  if (completedChapters >= plannedChapters) return 5;
  return Math.min(4, Math.max(1, Math.ceil((completedChapters / plannedChapters) * 4)));
}
