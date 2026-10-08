import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import QuestionCard from "../components/QuestionCard";
import ExplanationFlip from "../components/ExplanationFlip";
import ScoreBadge from "../components/ScoreBadge";
import SparkleBurst from "../components/SparkleBurst";
import SubjectDecor from "../components/SubjectDecor";
import { QUESTIONS_PER_CHAPTER } from "../config/app";
import { getSubjectById } from "../config/subjects";
import { correctAnswerText, getChapterMeta, getQuestionsByChapter, isCorrectOption } from "../data/chapters";
import { pickMessage, successMessages, encourageMessages } from "../data/messages";
import { useSubjectProgress } from "../hooks/useSubjectProgress";
import { completeChapter, getSubjectProgress, recordAnswer } from "../storage/progressStore";

export default function ChapterQuiz() {
  const { subjectId, chapterId } = useParams();
  const subject = getSubjectById(subjectId);
  const [searchParams] = useSearchParams();
  const chapter = Number(chapterId);
  const attemptKey = searchParams.get("attempt") ?? "resume";
  const navigate = useNavigate();
  const meta = getChapterMeta(subjectId, chapter);
  const progress = useSubjectProgress(subjectId);
  const questions = meta.questions;
  const sessionRef = useRef([]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [earned, setEarned] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [reasonSeen, setReasonSeen] = useState(false);

  useEffect(() => {
    if (!subject) return;
    const current = getSubjectProgress(subject.id);
    const chapterQuestions = getQuestionsByChapter(subject.id, chapter);
    const completed = current.completedChapters.includes(chapter);
    const firstUnanswered = chapterQuestions.findIndex((item) => !current.answers[item.id]);
    const allAnswered = chapterQuestions.length > 0 && firstUnanswered === -1;

    if (attemptKey === "resume" && allAnswered && !completed) {
      const correctCount = chapterQuestions.filter((item) => current.answers[item.id]?.correct).length;
      completeChapter(subject.id, chapter, {
        correct: correctCount,
        total: chapterQuestions.length,
        at: Date.now(),
      });
      navigate(`/${subject.id}/chapter/${chapter}/results`, { replace: true });
      return;
    }

    const nextIndex =
      attemptKey === "resume" && !completed && firstUnanswered >= 0 ? firstUnanswered : 0;

    sessionRef.current = [];
    setIndex(nextIndex);
    setSelected(null);
    setLocked(false);
    setFeedback(null);
    setEarned(0);
    setCelebrating(false);
    setReasonSeen(false);
  }, [attemptKey, chapter, navigate, subject]);

  if (!subject) {
    return <Navigate to="/subjects" replace />;
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function choose(option) {
    if (locked || !question) return;
    const correct = isCorrectOption(question, option);
    const result = recordAnswer(subject.id, {
      questionId: question.id,
      chapter,
      selected: option,
      correct,
    });

    setSelected(option);
    setLocked(true);
    setEarned(result.earnedPoints);
    const nextSession = [
      ...sessionRef.current.filter((item) => item.id !== question.id),
      { id: question.id, selected: option, correct },
    ];
    sessionRef.current = nextSession;

    if (correct) {
      setCelebrating(true);
      setFeedback({
        type: "success",
        text: pickMessage(successMessages),
      });
      window.setTimeout(() => setCelebrating(false), 900);
    } else {
      setReasonSeen(false);
      setFeedback({
        type: "encourage",
        text: pickMessage(encourageMessages),
      });
    }
  }

  function next() {
    if (!locked) return;
    if (feedback?.type === "encourage" && !reasonSeen) return;

    if (isLast) {
      const merged = {};
      questions.forEach((item) => {
        const fromSession = sessionRef.current.find((row) => row.id === item.id);
        const fromStore = progress.answers[item.id];
        const row = fromSession ?? (fromStore
          ? { id: item.id, selected: fromStore.selected, correct: fromStore.correct }
          : null);
        if (row) merged[item.id] = row;
      });
      if (selected && question) {
        merged[question.id] = {
          id: question.id,
          selected,
          correct: isCorrectOption(question, selected),
        };
      }
      const correctCount = Object.values(merged).filter((item) => item.correct).length;
      completeChapter(subject.id, chapter, {
        correct: correctCount,
        total: questions.length,
        at: Date.now(),
      });
      navigate(`/${subject.id}/chapter/${chapter}/results`);
      return;
    }

    setIndex((value) => value + 1);
    setSelected(null);
    setLocked(false);
    setFeedback(null);
    setEarned(0);
    setReasonSeen(false);
  }

  if (!meta.hasQuestions || !question) {
    return (
      <div className={`page ${subject.theme}`}>
        <SchoolHeader compact />
        <main className="empty-chapter">
          <h1>{meta.hasQuestions ? "جاري تجهيز السؤال…" : "هذا الفصل غير جاهز بعد"}</h1>
          <Link to={`/${subject.id}`} className="btn btn-primary">العودة إلى {subject.name}</Link>
        </main>
      </div>
    );
  }

  return (
    <div className={`page ${subject.theme}`}>
      <SubjectDecor subjectId={subject.id} />
      <SchoolHeader compact />
      <SparkleBurst show={celebrating} />

      <main className="quiz-page">
        <div className="quiz-top">
          <Link to={`/${subject.id}`} className="back-link">رجوع إلى {subject.name}</Link>
          <ScoreBadge points={progress.points} />
        </div>

        <div className="quiz-layout">
          <aside className="quiz-companion">
            <p className="quiz-chapter-title">الفصل {meta.ordinal}</p>
            <p className="quiz-chapter-intro">{meta.intro}</p>
          </aside>

          <div className="quiz-main" key={question?.id}>
            <div className="quiz-step-bar">
              {questions.map((item, itemIndex) => (
                <span
                  key={item.id}
                  className={`step-dot ${itemIndex < index ? "is-done" : ""} ${itemIndex === index ? "is-current" : ""}`}
                />
              ))}
            </div>

            <QuestionCard
              index={index + 1}
              total={questions.length || QUESTIONS_PER_CHAPTER}
              question={question}
              selected={selected}
              locked={locked}
              onSelect={choose}
            />

            {feedback ? (
              <div className={`feedback-card is-${feedback.type}`}>
                <p>{feedback.text}</p>
                {feedback.type === "success" && earned > 0 ? (
                  <p className="points-pop">+{earned} نقاط ⭐</p>
                ) : null}
                {feedback.type === "success" && earned === 0 ? (
                  <p className="points-muted">سبق أن حصلتِ على نقاط هذا السؤال</p>
                ) : null}
                {feedback.type === "encourage" ? (
                  <>
                    <p className="correct-reveal">الإجابة الصحيحة: {correctAnswerText(question)}</p>
                    <ExplanationFlip
                      explanation={question.explanation}
                      onOpen={() => setReasonSeen(true)}
                    />
                  </>
                ) : null}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={next}
                  disabled={feedback.type === "encourage" && !reasonSeen}
                >
                  {isLast ? "عرض النتيجة 🎉" : "السؤال التالي"}
                </button>
                {feedback.type === "encourage" && !reasonSeen ? (
                  <p className="choose-hint">اضغطي «لماذا؟» حتى يظهر لكِ السؤال التالي</p>
                ) : null}
              </div>
            ) : (
              <p className="choose-hint">اختاري الإجابة التي ترينها صحيحة</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
