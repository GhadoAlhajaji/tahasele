import { companion } from "../config/app";

const POSES = {
  idle: "/characters/student-idle.png",
  happy: "/characters/student-happy.png",
  think: "/characters/student-think.png",
  graduate: "/characters/student-graduate.png",
};

export default function Character({
  pose = "idle",
  size = "md",
  celebrating = false,
  caption,
}) {
  return (
    <figure className={`character character-${size} ${celebrating ? "is-celebrating" : ""}`}>
      <div className="character-frame">
        <img src={POSES[pose] ?? POSES.idle} alt={`${companion.name}، طالبة ثانوية في رحلة التحصيلي`} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
