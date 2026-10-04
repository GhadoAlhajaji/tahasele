export default function SubjectMark({ subjectId }) {
  if (subjectId === "chemistry") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M26 8h12M29 8v16L16 48a10 10 0 0 0 8.6 15h14.8A10 10 0 0 0 48 48L35 24V8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 40h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="27" cy="46" r="2" fill="currentColor" />
        <circle cx="36" cy="48" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  if (subjectId === "physics") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="5" fill="currentColor" />
        <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120 32 32)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 50V16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 44c-14-4-18-18 0-28 18 10 14 24 0 28Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
