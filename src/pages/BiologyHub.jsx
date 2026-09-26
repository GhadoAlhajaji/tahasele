import { Link, useNavigate } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import Character from "../components/Character";
import JourneyPath from "../components/JourneyPath";
import ScoreBadge from "../components/ScoreBadge";
import ProgressBar from "../components/ProgressBar";
import BiologyDecor from "../components/BiologyDecor";
import { companion, SUBJECT_IDS, TARGET_QUESTIONS } from "../config/app";
import { subjects } from "../config/subjects";
import { getBiologyChapterCards } from "../data/chapters";
import { useSubjectProgress } from "../hooks/useSubjectProgress";
import { getJourneyStageIndex, resetSubjectProgress } from "../storage/progressStore";

export default function BiologyHub() {
  const navigate = useNavigate();
  const progress = useSubjectProgress(SUBJECT_IDS.biology);
  const chapters = getBiologyChapterCards();
  const answered = Object.keys(progress.answers).length;
  const completed = progress.completedChapters.length;
  const stage = getJourneyStageIndex(completed);
  const pose = stage >= 5 ? "graduate" : "idle";

  function chapterState(card) {
    const answeredInChapter = Object.values(progress.answers).filter(
      (item) => item.chapter === card.chapter,
    ).length;
    const isComplete = progress.completedChapters.includes(card.chapter);
    const previousReady =
      card.chapter === 1 || progress.completedChapters.includes(card.chapter - 1);

    if (card.comingSoon) return "soon";
    if (!previousReady && !isComplete) return "locked";
    if (isComplete) return "complete";
    if (answeredInChapter > 0) return "progress";
    return "ready";
  }

  function openChapter(card) {
    const state = chapterState(card);
    if (state === "soon" || state === "locked") return;
    if (state === "complete") {
      navigate(`/biology/chapter/${card.chapter}/results`);
      return;
    }
    navigate(`/biology/chapter/${card.chapter}`);
  }

  function resetProgress() {
    const ok = window.confirm("هل تريدين إعادة تعيين تقدّمك في الأحياء على هذا الجهاز؟");
    if (ok) resetSubjectProgress(SUBJECT_IDS.biology);
  }

  return (
    <div className="page theme-biology">
      <BiologyDecor />
      <SchoolHeader compact />

      <main className="bio-hub">
        <div className="bio-hub-top">
          <Link to="/subjects" className="back-link">
            رجوع إلى المواد
          </Link>
          <ScoreBadge points={progress.points} />
        </div>

        <section className="bio-hero-panel fade-up">
          <div>
            <p className="eyebrow">🧬 عالم الأحياء</p>
            <h1>رحلتي في الأحياء</h1>
            <p className="subject-teacher">معلمة المادة: {subjects.find((item) => item.id === SUBJECT_IDS.biology)?.teacher}</p>
            <p>
              {companion.name} تسير معك من البداية حتى التخرج. كل فصل عشر أسئلة متنوعة،
              وكل إجابة صحيحة تمنحك 10 نقاط.
            </p>
          </div>
          <Character
            pose={pose}
            size="lg"
            caption={stage >= 5 ? "يوم التخرج اقترب" : "جاهزة للفصل التالي"}
          />
        </section>

        <JourneyPath completedChapters={completed} />

        <section className="hub-progress-card fade-up">
          <ProgressBar
            value={answered}
            max={TARGET_QUESTIONS}
            label="تقدمك في الأحياء"
          />
        </section>

        <section className="chapters-section">
          <h2>الفصول التدريبية</h2>
          <div className="chapters-grid">
            {chapters.map((card) => {
              const state = chapterState(card);
              const labels = {
                ready: "ابدئي الفصل",
                progress: "كمّلي الفصل",
                complete: "عرض النتيجة",
                locked: "يُفتح بعد الفصل السابق",
                soon: "الأسئلة قادمة قريبًا",
              };
              return (
                <button
                  key={card.chapter}
                  type="button"
                  className={`chapter-card is-${state}`}
                  onClick={() => openChapter(card)}
                  disabled={state === "locked" || state === "soon"}
                >
                  <span className="chapter-num">{card.chapter}</span>
                  <div>
                    <h3>الفصل {card.ordinal}</h3>
                    <p>{card.intro}</p>
                    <span className="chapter-cta">{labels[state]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <button type="button" className="reset-link" onClick={resetProgress}>
          إعادة تعيين التقدّم على هذا الجهاز
        </button>
      </main>
    </div>
  );
}
