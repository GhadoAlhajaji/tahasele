import { Link } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import { school } from "../config/app";
import { heroineSections } from "../config/heroines";

const rankMeta = [
  { icon: "🥇", label: "المركز الأول" },
  { icon: "🥈", label: "المركز الثاني" },
  { icon: "🥉", label: "المركز الثالث" },
  { icon: "⭐", label: "المركز الرابع" },
  { icon: "⭐", label: "المركز الخامس" },
];

function rankFor(index) {
  return rankMeta[index] ?? { icon: "⭐", label: `المركز ${index + 1}` };
}

export default function Heroines() {
  return (
    <div className="page theme-home">
      <div className="home-glow" aria-hidden="true" />
      <SchoolHeader />
      <p className="principal-name">مالك المبادرة : أ.سمر الهذلي</p>
      <p className="principal-name">مديرة المدرسة: {school.principal}</p>

      <main className="heroines-page">
        <div className="page-intro fade-up">
          <p className="eyebrow">لوحة الشرف</p>
          <h1>بطلات التحصيلي</h1>
          <p>الطالبات الحاصلات على أعلى النقاط في الأحياء والفيزياء والكيمياء.</p>
          <Link to="/" className="btn btn-ghost heroines-back">
            العودة للرئيسية
          </Link>
        </div>

        {heroineSections.map((section) => (
          <section key={section.id} className={`heroines-section is-${section.id} fade-up`} aria-labelledby={`${section.id}-title`}>
            <header className="heroines-section-head">
              <span className="heroines-section-icon" aria-hidden="true">{section.icon}</span>
              <div>
                <p>{section.kicker}</p>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
              </div>
            </header>

            <div className="heroines-grid">
              {section.students.map((student, index) => {
                const rank = rankFor(index);
                const name = student.name?.trim();
                const score = student.score === "" || student.score == null ? "" : String(student.score).trim();

                return (
                  <article
                    key={`${section.id}-${index}`}
                    className={`heroine-card is-rank-${Math.min(index + 1, 4)} ${name ? "is-filled" : "is-placeholder"}`}
                  >
                    <span className="heroine-medal" aria-hidden="true">{rank.icon}</span>
                    <span className="heroine-rank">{rank.label}</span>
                    <h3>{name || "اسم الطالبة"}</h3>
                    <p className="heroine-score">
                      <span>النقاط</span>
                      <strong>{score || "—"}</strong>
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        <div className="heroines-footer">
          <Link to="/" className="btn btn-primary">
            العودة للرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
