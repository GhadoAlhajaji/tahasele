import { Link } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import { subjects, upcomingSubjectSlots } from "../config/subjects";

export default function Subjects() {
  return (
    <div className="page theme-home">
      <SchoolHeader compact />
      <main className="subjects-page">
        <div className="page-intro fade-up">
          <p className="eyebrow">اختيار المادة</p>
          <h1>من اين تحبين ان تبدأين؟</h1>
          <p>حاليًا تتوفر مادة الأحياء. بقية المواد سنضيفها لاحقًا في المكان نفسه.</p>
        </div>

        <div className="subjects-grid fade-up delay-1">
          {subjects.map((subject) => (
            <Link key={subject.id} to={subject.path} className="subject-card is-live">
              <span className="subject-emoji">{subject.emoji}</span>
              <h2>{subject.name}</h2>
              {subject.teacher ? (
                <p className="subject-teacher">معلمة المادة: {subject.teacher}</p>
              ) : null}
              <p>{subject.blurb}</p>
              <span className="subject-cta">ادخلي المادة</span>
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
