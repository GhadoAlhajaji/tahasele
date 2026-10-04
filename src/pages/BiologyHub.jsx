import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import JourneyPath from "../components/JourneyPath";
import ScoreBadge from "../components/ScoreBadge";
import ProgressBar from "../components/ProgressBar";
import SubjectDecor from "../components/SubjectDecor";
import SubjectMark from "../components/SubjectMark";
import { companion } from "../config/app";
import { getSubjectById } from "../config/subjects";
import { getSubjectChapterCards } from "../data/chapters";
import { useSubjectProgress } from "../hooks/useSubjectProgress";
import { resetSubjectProgress } from "../storage/progressStore";

export default function SubjectHub() {
  const { subjectId } = useParams();
  const subject = getSubjectById(subjectId);
  const navigate = useNavigate();
  const progress = useSubjectProgress(subjectId);
  const chapters = getSubjectChapterCards(subjectId);
  const answered = Object.keys(progress.answers).length;
  const completed = progress.completedChapters.length;
  const planned = subject?.plannedChapters ?? 1;
  const chapterIcons = {
    biology: ["🧫", "🔬", "🧬", "🦠"],
    chemistry: ["⚗️", "🧪", "🫧", "🔬"],
    physics: ["⚛️", "⚡", "🌊", "🔭"],
  };

  if (!subject) {
    return <Navigate to="/subjects" replace />;
  }

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
      navigate(`/${subject.id}/chapter/${card.chapter}/results`);
      return;
    }
    navigate(`/${subject.id}/chapter/${card.chapter}`);
  }

  function resetProgress() {
    const ok = window.confirm(`هل تريدين إعادة تعيين تقدّمك في ${subject.name} على هذا الجهاز؟`);
    if (ok) resetSubjectProgress(subject.id);
  }

  return (
    <div className={`page ${subject.theme}`}>
      <SubjectDecor subjectId={subject.id} />
      <SchoolHeader compact />

      <main className="bio-hub">
        <div className="bio-hub-top">
          <Link to="/subjects" className="back-link">
            رجوع إلى المواد
          </Link>
          <ScoreBadge points={progress.points} />
        </div>

        <section className="theme-banner fade-up">
          <div className="hub-copy">
            <h1>{subject.name}</h1>
            <p className="banner-tag">{subject.bannerTag}</p>
            {subject.teachers?.length ? (
              <div className="subject-teachers">
                <p className="subject-teacher-label">
                  {subject.teachers.length > 1 ? "معلمات المادة" : "معلمة المادة"}
                </p>
                {subject.teachers.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            ) : null}
            <p>
              {companion.name} تسير معك من البداية حتى التخرج. كل فصل عشر أسئلة متنوعة،
              وكل إجابة صحيحة تمنحك 10 نقاط.
            </p>
          </div>
          <div className="hub-art" aria-hidden="true">
            <SubjectMark subjectId={subject.id} />
          </div>
        </section>

        <JourneyPath
          completedChapters={completed}
          plannedChapters={planned}
          label={`رحلتي في ${subject.name}`}
        />

        <section className="theme-meter fade-up">
          <span className="theme-meter-icon" aria-hidden="true">
            <SubjectMark subjectId={subject.id} />
          </span>
          <ProgressBar
            value={answered}
            max={subject.targetQuestions}
            label="تقدمك في المادة"
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
                  <div className="chapter-copy">
                    <h3>الفصل {card.ordinal}</h3>
                    <p>{card.intro}</p>
                    <span className="chapter-cta">{labels[state]}</span>
                  </div>
                  <span className="chapter-glyph" aria-hidden="true">
                    {(chapterIcons[subject.id] ?? chapterIcons.biology)[(card.chapter - 1) % 4]}
                  </span>
                  <span className="chapter-chevron" aria-hidden="true">
                    ‹
                  </span>
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
