import { useState } from "react";

export default function ExplanationFlip({ explanation }) {
  const [stage, setStage] = useState("button");

  if (stage === "button") {
    return (
      <div className="why-wrap">
        <button type="button" className="why-btn" onClick={() => setStage("front")}>
          لماذا؟ 💡
        </button>
      </div>
    );
  }

  if (stage === "front") {
    return (
      <div className="why-wrap">
        <button type="button" className="explain-card explain-front" onClick={() => setStage("back")}>
          <strong>💡 لماذا هذه هي الإجابة الصحيحة؟</strong>
          <small>اضغطي لفتح الشرح</small>
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
