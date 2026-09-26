import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import Character from "../components/Character";
import JourneyPath from "../components/JourneyPath";
import ProgressBar from "../components/ProgressBar";
import ScoreBadge from "../components/ScoreBadge";
import ReviewModal from "../components/ReviewModal";
import BiologyDecor from "../components/BiologyDecor";
import { SUBJECT_IDS, TARGET_QUESTIONS, PLANNED_CHAPTERS } from "../config/app";
import { getChapterMeta, getQuestionsByChapter } from "../data/chapters";
import { resultsHeadline } from "../data/messages";
import { useSubjectProgress } from "../hooks/useSubjectProgress";
import { getJourneyStageIndex, getMistakeEntries } from "../storage/progressStore";

export default function ChapterResults() {
  const { chapterId } = useParams();
  const chapter = Number(chapterId);
  const navigate = useNavigate();
  const meta = getChapterMeta(chapter);
  const progress = useSubjectProgress(SUBJECT_IDS.biology);
  const [reviewOpen, setReviewOpen] = useState(false);

  const questions = getQuestionsByChapter(chapter);
  const attempt = progress.lastAttempts?.[chapter];
  const fallbackCorrect = questions.filter((item) => progress.answers[item.id]?.correct).length;
  const correct = attempt?.correct ?? fallbackCorrect;
  const total = attempt?.total ?? questions.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const answered = Object.keys(progress.answers).length;
  const mistakes = useMemo(
    () => getMistakeEntries(SUBJECT_IDS.biology, questions),
    [progress, chapter],
  );
  const nextChapter = chapter + 1;
  const nextMeta = getChapterMeta(nextChapter);
  const canGoNext = nextChapter <= PLANNED_CHAPTERS && nextMeta.hasQuestions;
  const stage = getJourneyStageIndex(progress.completedChapters.length);
  const pose = percent >= 80 ? "happy" : percent >= 50 ? "idle" : "think";

  return (
    <div className="page theme-biology">
      <BiologyDecor />
      <SchoolHeader compact />

      <main className="results-page fade-up">
        <div className="quiz-top">
          <Link to="/biology" className="back-link">رجوع إلى الأحياء</Link>
          <ScoreBadge points={progress.points} />
        </div>

        <section className="results-hero">
          <Character pose={stage >= 5 ? "graduate" : pose} size="lg" celebrating={percent >= 70} />
          <div>
            <h1>{resultsHeadline(correct, total, meta.ordinal)}</h1>
            <div className="result-stats">
              <article>
            <strong>{correct} من {total}</strong>
                <span>إجابات صحيحة</span>
              </article>
              <article>
                <strong>{percent}%</strong>
                <span>نسبة الفصل</span>
              </article>
              <article>
                <strong>+{correct * 10}</strong>
                <span>نقطة هذا الفصل ⭐</span>
              </article>
            </div>
          </div>
        </section>

        <section className="hub-progress-card">
          <ProgressBar value={answered} max={TARGET_QUESTIONS} label="تقدمك في الأحياء" />
          <p className="journey-note">تقدّمت نورة خطوة في رحلة التخرج.</p>
          <JourneyPath completedChapters={progress.completedChapters.length} />
        </section>

        <div className="results-actions">
          <button type="button" className="btn btn-ghost" onClick={() => setReviewOpen(true)}>
            مراجعة أخطائي 🔍
          </button>
          {canGoNext ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/biology/chapter/${nextChapter}`)}
            >
              الفصل التالي ←
            </button>
          ) : (
            <button type="button" className="btn btn-primary" disabled>
              الفصل التالي قريبًا ✨
            </button>
          )}
        </div>
      </main>

      <ReviewModal
        open={reviewOpen}
        items={mistakes}
        onClose={() => setReviewOpen(false)}
          onRetry={() => navigate(`/biology/chapter/${chapter}?attempt=${Date.now()}`, { replace: true })}
      />
    </div>
  );
}
