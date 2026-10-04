import { SUBJECT_IDS } from "./app.js";

export const subjects = [
  {
    id: SUBJECT_IDS.biology,
    name: "الأحياء",
    emoji: "🧬",
    enabled: true,
    path: "/biology",
    theme: "theme-biology",
    eyebrow: "🧬 عالم الأحياء",
    hubTitle: "رحلتي في الأحياء",
    blurb: "ادخلي عالم الخلية والوراثة والحياة، وتقدّمي مع نورة نحو التخرج.",
    cardTag: "استكشفي الخلية والحياة",
    bannerTag: "من الخلية إلى أسرار الأحياء",
    teachers: ["سمر الهذلي", "مها العتيبي"],
    plannedChapters: 61,
    targetQuestions: 610,
  },
  {
    id: SUBJECT_IDS.chemistry,
    name: "الكيمياء",
    emoji: "⚗️",
    enabled: true,
    path: "/chemistry",
    theme: "theme-chemistry",
    eyebrow: "⚗️ عالم الكيمياء",
    hubTitle: "رحلتي في الكيمياء",
    blurb: "ادخلي عالم الذرة والتفاعلات والقوانين، وتقدّمي مع نورة نحو التخرج.",
    cardTag: "تعرّفي على العناصر والتفاعلات",
    bannerTag: "عالم الذرة والتفاعلات",
    teachers: ["عمشة العتيبي"],
    plannedChapters: 33,
    targetQuestions: 330,
  },
  {
    id: SUBJECT_IDS.physics,
    name: "الفيزياء",
    emoji: "⚛️",
    enabled: true,
    path: "/physics",
    theme: "theme-physics",
    eyebrow: "⚛️ عالم الفيزياء",
    hubTitle: "رحلتي في الفيزياء",
    blurb: "ادخلي عالم الحركة والقياس والقوانين، وتقدّمي مع نورة نحو التخرج.",
    cardTag: "افهمي الحركة والطاقة",
    bannerTag: "قوانين الحركة والطاقة",
    teachers: ["امجاد العتيبي"],
    plannedChapters: 141,
    targetQuestions: 1410,
  },
];

export const upcomingSubjectSlots = 0;

export function getSubjectById(subjectId) {
  return subjects.find((item) => item.id === subjectId && item.enabled) ?? null;
}
