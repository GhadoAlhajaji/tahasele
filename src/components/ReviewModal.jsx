import { correctAnswerText } from "../data/chapters";

export default function ReviewModal({ items }) {
  return (
    <section className="mistake-review" id="mistakes" aria-labelledby="review-title">
      <h2 id="review-title">مراجعة الأخطاء</h2>
      <p className="mistake-review-note">راجعي إجاباتك الخاطئة هنا بدون إعادة الفصل.</p>

      {items.length === 0 ? (
        <p className="empty-note">ما شاء الله… لا توجد أخطاء في هذا الفصل 🌟</p>
      ) : (
        <ul className="review-list">
          {items.map(({ question, selected }, index) => (
            <li key={question.id} className="review-item">
              <p className="review-q">
                {index + 1}. {question.question}
              </p>
              <p className="review-a wrong">إجابتك: {selected}</p>
              <p className="review-a right">
                الإجابة الصحيحة:{" "}
                <span
                  className={
                    question.italicOptions?.includes(question.correctAnswer) ? "is-italic" : ""
                  }
                >
                  {correctAnswerText(question)}
                </span>
              </p>
              <p className="review-explain">{question.explanation}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
