export const successMessages = [
  "أحسنتِ! 🎉 إجابة صحيحة",
  "رائع! استمري 👏🏻",
  "خطوة أخرى نحو هدفك 🎓",
  "أبدعتِ! 💚",
  "ممتاز! كملي، أنتِ قادرة 💪🏻",
  "إجابتك دقيقة… وهذا تقدم حقيقي ✨",
  "برافو نورة الفخرية! 🌿",
  "ممتاز! استمري 👏🏻",
];

export const encourageMessages = [
  "قريبة! 💚 لا بأس، نتعلم من كل سؤال.",
  "مو مشكلة 💚",
  "كل خطأ فرصة نتعلم منها.",
  "قريبة! جربي تفهمين السبب 💡",
  "كملي، لسه الرحلة مستمرة 🌱",
  "قريبة جدًا! لا تستسلمين 🌱",
];

export function pickMessage(list, avoid) {
  const pool = list.filter((item) => item !== avoid);
  const source = pool.length ? pool : list;
  return source[Math.floor(Math.random() * source.length)];
}

export function resultsHeadline(correct, total, ordinal) {
  const ratio = correct / total;
  if (ratio === 1) {
    return `أسطورة! أنهيتِ الفصل ${ordinal} بدون خطأ 🌟`;
  }
  if (ratio >= 0.8) {
    return `أحسنتِ! أنهيتِ الفصل ${ordinal} 🎉`;
  }
  if (ratio >= 0.5) {
    return `أداء جميل في الفصل ${ordinal}… كملي بهذا النَفَس 💚`;
  }
  return `أنهيتِ الفصل ${ordinal}، والرحلة ما زالت لصالحك 🌱`;
}
