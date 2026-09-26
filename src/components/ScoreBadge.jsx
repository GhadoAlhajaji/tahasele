export default function ScoreBadge({ points }) {
  return (
    <div className="score-badge" aria-live="polite">
      <span aria-hidden="true">⭐</span>
      <span>نقاطي: {points}</span>
    </div>
  );
}
