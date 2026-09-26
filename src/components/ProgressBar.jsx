export default function ProgressBar({ value, max, label }) {
  const safeMax = max || 1;
  const percent = Math.min(100, Math.round((value / safeMax) * 100));

  return (
    <div className="progress-block">
      {label ? <div className="progress-label-row">{label}</div> : null}
      <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-meta">
        {value} من {max}
      </p>
    </div>
  );
}
