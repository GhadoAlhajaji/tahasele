import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import JourneyPath from "../components/JourneyPath";
import ProgressBar from "../components/ProgressBar";
import ScoreBadge from "../components/ScoreBadge";
import ReviewModal from "../components/ReviewModal";
import SubjectDecor from "../components/SubjectDecor";
import { getSubjectById } from "../config/subjects";
import { getChapterMeta, getQuestionsByChapter } from "../data/chapters";
import { resultsHeadline } from "../data/messages";
import { useSubjectProgress } from "../hooks/useSubjectProgress";
import { getMistakeEntries } from "../storage/progressStore";

export default function ChapterResults() {
  const { subjectId, chapterId } = useParams();
  const subject = getSubjectById(subjectId);
  const chapter = Number(chapterId);
  const navigate = useNavigate();
  const meta = getChapterMeta(subjectId, chapter);
  const progress = useSubjectProgress(subjectId);
  const [reviewOpen, setReviewOpen] = useState(false);

  const questions = getQuestionsByChapter(subjectId, chapter);
  const attempt = progress.lastAttempts?.[chapter];
  const fallbackCorrect = questions.filter((item) => progress.answers[item.id]?.correct).length;
  const correct = attempt?.correct ?? fallbackCorrect;
  const total = attempt?.total ?? questions.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const answered = Object.keys(progress.answers).length;
  const mistakes = useMemo(
    () => getMistakeEntries(subjectId, questions),
    [progress, chapter, subjectId],
  );
  const nextChapter = chapter + 1;
  const nextMeta = getChapterMeta(subjectId, nextChapter);
  const planned = subject?.plannedChapters ?? 0;
  const canGoNext = nextChapter <= planned && nextMeta.hasQuestions;
  if (!subject) {
    return <Navigate to="/subjects" replace />;
  }

  return (
    <div className={`page ${subject.theme}`}>
      <SubjectDecor subjectId={subject.id} />
      <SchoolHeader compact />

      <main className="results-page fade-up">
        <div className="quiz-top">
          <Link to={`/${subject.id}`} className="back-link">رجوع إلى {subject.name}</Link>
          <ScoreBadge points={progress.points} />
        </div>

        <section className="results-hero">
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
          <ProgressBar value={answered} max={subject.targetQuestions} label={`تقدمك في ${subject.name}`} />
          <p className="journey-note">تقدّمت نورة خطوة في رحلة التخرج.</p>
          <JourneyPath
            completedChapters={progress.completedChapters.length}
            plannedChapters={planned}
            label={`رحلتي في ${subject.name}`}
          />
        </section>

        <div className="results-actions">
          <button type="button" className="btn btn-ghost" onClick={() => setReviewOpen(true)}>
            مراجعة أخطائي 🔍
          </button>
          {canGoNext ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/${subject.id}/chapter/${nextChapter}`)}
            >
              الفصل التالي ←
            </button>
          ) : nextChapter > planned ? (
            <Link to={`/${subject.id}`} className="btn btn-primary">
              أنهيتِ هذه المادة 🎓
            </Link>
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
        onRetry={() => navigate(`/${subject.id}/chapter/${chapter}?attempt=${Date.now()}`, { replace: true })}
      />
    </div>
  );
}
