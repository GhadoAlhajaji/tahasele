import { Link } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import SubjectMark from "../components/SubjectMark";
import { subjects, upcomingSubjectSlots } from "../config/subjects";

export default function Subjects() {
  return (
    <div className="page theme-home">
      <div className="page-blobs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <SchoolHeader compact />
      <main className="subjects-page">
        <div className="page-intro fade-up">
          <p className="eyebrow">اختيار المادة</p>
          <h1>من اين تحبين ان تبدأين؟</h1>
        </div>

        <div className="subjects-grid fade-up delay-1">
          {subjects.map((subject) => (
            <Link key={subject.id} to={subject.path} className={`subject-card is-live is-${subject.id}`}>
              <span className="card-blob" aria-hidden="true" />
              <span className="subject-icon">
                <SubjectMark subjectId={subject.id} />
              </span>
              <h2>{subject.name}</h2>
              <p className="subject-tag">{subject.cardTag}</p>
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
              <span className="subject-cta">
                ابدئي الآن
                <span aria-hidden="true">←</span>
              </span>
            </Link>
          ))}

          {Array.from({ length: upcomingSubjectSlots }).map((_, index) => (
            <div key={`soon-${index}`} className="subject-card is-soon">
              <span className="subject-emoji">✨</span>
              <h2>مادة قادمة</h2>
              <p>مكان محجوز لإضافة مواد جديدة لاحقًا دون تغيير بنية الموقع.</p>
              <span className="subject-cta">قريبًا</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
