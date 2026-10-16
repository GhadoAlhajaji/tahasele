/**
 * بطلات التحصيلي
 *
 * لتعديل الأسماء والنقاط: غيّري قيمة name و score داخل كل بطاقة.
 * اتركي الحقل فارغًا "" ليظهر النص التوضيحي في الصفحة.
 * لإضافة طالبة: انسخي أحد الأسطر { name: "", score: "" } والصقيه داخل نفس القائمة.
 * ترتيب البطاقات هو ترتيب المراكز: الأول، ثم الثاني، ثم الثالث، ثم الرابع، ثم الخامس.
 */
const emptyBoard = () => [
  { name: "", score: "" },
  { name: "", score: "" },
  { name: "", score: "" },
  { name: "", score: "" },
  { name: "", score: "" },
];

export const heroineSections = [
  {
    id: "biology",
    title: "بطلات الأحياء",
    kicker: "أعلى النقاط في الأحياء",
    icon: "🧬",
    students: emptyBoard(),
  },
  {
    id: "physics",
    title: "بطلات الفيزياء",
    kicker: "أعلى النقاط في الفيزياء",
    icon: "⚛️",
    students: emptyBoard(),
  },
  {
    id: "chemistry",
    title: "بطلات الكيمياء",
    kicker: "أعلى النقاط في الكيمياء",
    icon: "⚗️",
    students: emptyBoard(),
  },
];
