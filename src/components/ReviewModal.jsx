import ExplanationFlip from "./ExplanationFlip";
import { correctAnswerText } from "../data/chapters";

export default function ReviewModal({ open, items, onClose, onRetry }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <div className="modal-sheet">
        <div className="modal-head">
          <h2 id="review-title">🔍 مراجعة أخطائي</h2>
          <button type="button" className="icon-close" onClick={onClose} aria-label="إغلاق">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-note">ما شاء الله… لا توجد أخطاء في هذا الفصل 🌟</p>
        ) : (
          <ul className="review-list">
            {items.map(({ question, selected }) => (
              <li key={question.id} className="review-item">
                <p className="review-q">{question.question}</p>
                <p className="review-a wrong">إجابتك: {selected}</p>
                <p className="review-a right">الإجابة الصحيحة: {correctAnswerText(question)}</p>
                <ExplanationFlip explanation={question.explanation} />
              </li>
            ))}
          </ul>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            إغلاق
          </button>
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            حاولي مرة أخرى
          </button>
        </div>
      </div>
    </div>
  );
}
