export default function SubjectMark({ subjectId }) {
  if (subjectId === "chemistry") {
    return (
      <svg viewBox="0 0 180 150" aria-hidden="true">
        <circle cx="24" cy="40" r="8" fill="#d9ccff" />
        <circle cx="152" cy="26" r="5" fill="#c4b5fd" />
        <circle cx="160" cy="48" r="10" fill="#ede7ff" />
        <path d="M78 12h24l2 8c1 14 8 22 18 36 14 20 22 34 22 52 0 20-18 34-56 34S32 128 32 108c0-18 8-32 22-52 10-14 17-22 18-36l2-8Z" fill="#f8f5ff" stroke="#7b61ff" strokeWidth="3" />
        <path d="M48 96c8 22 22 34 42 34s34-12 42-34c-12 10-26 16-42 16s-30-6-42-16Z" fill="#7b61ff" />
        <ellipse cx="90" cy="98" rx="36" ry="8" fill="#a78bfa" />
        <circle cx="72" cy="108" r="3" fill="#fff" opacity="0.9" />
        <circle cx="104" cy="112" r="2.2" fill="#efe9ff" />
        <circle cx="88" cy="84" r="3" fill="#c4b5fd" />
      </svg>
    );
  }

  if (subjectId === "physics") {
    return (
      <svg viewBox="0 0 180 150" aria-hidden="true">
        <ellipse cx="90" cy="75" rx="64" ry="22" fill="none" stroke="#3b82f6" strokeWidth="3.5" />
        <ellipse cx="90" cy="75" rx="64" ry="22" fill="none" stroke="#60a5fa" strokeWidth="3.5" transform="rotate(60 90 75)" />
        <ellipse cx="90" cy="75" rx="64" ry="22" fill="none" stroke="#93c5fd" strokeWidth="3.5" transform="rotate(120 90 75)" />
        <circle cx="90" cy="75" r="9" fill="#3b82f6" />
        <circle cx="154" cy="75" r="5" fill="#3b82f6" />
        <circle cx="58" cy="20" r="5" fill="#60a5fa" />
        <circle cx="58" cy="130" r="5" fill="#93c5fd" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 180 150" aria-hidden="true">
      <ellipse cx="90" cy="76" rx="62" ry="48" fill="#e7f6ee" stroke="#4caf7d" strokeWidth="3.5" />
      <ellipse cx="90" cy="76" rx="50" ry="36" fill="#d7f3e6" />
      <circle cx="98" cy="72" r="16" fill="#7dcea0" />
      <circle cx="103" cy="68" r="6" fill="#3d9b72" />
      <circle cx="58" cy="62" r="6" fill="#b7e4d0" />
      <circle cx="124" cy="96" r="5" fill="#8fd4ae" />
      <circle cx="68" cy="98" r="4" fill="#a7e3ca" />
    </svg>
  );
}