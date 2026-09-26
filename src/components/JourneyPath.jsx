import { journeyStages } from "../config/app";
import { getJourneyStageIndex } from "../storage/progressStore";

export default function JourneyPath({ completedChapters = 0, compact = false }) {
  const activeIndex = getJourneyStageIndex(completedChapters);

  return (
    <section className={`journey-path ${compact ? "is-compact" : ""}`} aria-label="رحلتي في الأحياء">
      <ol className="journey-track">
        {journeyStages.map((stage, index) => {
          const state =
            index < activeIndex ? "done" : index === activeIndex ? "current" : "upcoming";
          return (
            <li key={stage.id} className={`journey-node is-${state}`}>
              <span className="journey-emoji" aria-hidden="true">
                {stage.emoji}
              </span>
              <span className="journey-label">{stage.label}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
