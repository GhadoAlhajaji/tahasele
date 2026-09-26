export default function SparkleBurst({ show }) {
  if (!show) return null;

  return (
    <div className="sparkle-burst" aria-hidden="true">
      <span>✨</span>
      <span>⭐</span>
      <span>🍃</span>
      <span>💚</span>
      <span>✨</span>
    </div>
  );
}
