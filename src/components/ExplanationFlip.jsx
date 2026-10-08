import { useState } from "react";

export default function ExplanationFlip({ explanation, onOpen }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="why-wrap">
        <button
          type="button"
          className="why-btn"
          onClick={() => {
            setOpen(true);
            onOpen?.();
          }}
        >
          لماذا؟ 💡
        </button>
      </div>
    );
  }

  return (
    <div className="why-wrap">
      <article className="explain-card">
        <div className="explain-front-hint">💡 لماذا هذه هي الإجابة الصحيحة؟</div>
        <p>{explanation}</p>
      </article>
    </div>
  );
}
