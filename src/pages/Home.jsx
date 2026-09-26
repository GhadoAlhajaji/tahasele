import { Link } from "react-router-dom";
import SchoolHeader from "../components/SchoolHeader";
import Character from "../components/Character";
import { companion, school } from "../config/app";

export default function Home() {
  return (
    <div className="page theme-home">
      <div className="home-glow" aria-hidden="true" />
      <SchoolHeader />
      <p className="principal-name">مديرة المدرسة: {school.principal}</p>

      <main className="hero">
        <div className="hero-copy fade-up">
          <p className="eyebrow">رحلة التحصيلي</p>
          <h1>
            من أول سؤال
            <span> إلى يوم التخرج 🎓</span>
          </h1>
          <p className="lede">
            تجربة تفاعلية لطالبات المرحلة الثانوية. ترافقك {companion.name} في مسار ممتع،
            وكل إجابة صحيحة تقرّبك خطوة من هدفك.
          </p>
          <Link to="/subjects" className="btn btn-primary btn-xl">
            ابدئي رحلتك 🚀
          </Link>
        </div>

        <div className="hero-visual fade-up delay-2">
          <div className="hero-orbit" aria-hidden="true">
            <span>🎓</span>
            <span>✨</span>
            <span>📖</span>
            <span>🏆</span>
          </div>
          <Character pose="idle" size="xl" caption={`${companion.name} بانتظارك لتبدئي`} />
        </div>
      </main>
    </div>
  );
}
