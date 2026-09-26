import { optionLabels } from "../config/app";

export default function QuestionCard({
  index,
  total,
  question,
  selected,
  locked,
  onSelect,
}) {
  return (
    <article className="question-card">
      <p className="question-kicker">السؤال {index} من {total}</p>
      <h2 className="question-text">{question.question}</h2>
      <div className="options-grid">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === option;
          const isCorrect = option === question.correctAnswer;
          let state = "";
          if (locked) {
            if (isCorrect) state = "is-correct";
            else if (isSelected) state = "is-wrong";
            else state = "is-dimmed";
          } else if (isSelected) {
            state = "is-picked";
          }

          return (
            <button
              key={option}
              type="button"
              className={`option-btn ${state}`}
              onClick={() => onSelect(option)}
              disabled={locked}
            >
              <span className="option-letter">{optionLabels[optionIndex]}</span>
              <span className="option-text">{option}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
