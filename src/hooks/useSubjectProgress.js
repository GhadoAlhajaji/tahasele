import { useEffect, useState } from "react";
import {
  getSubjectProgress,
  subscribeProgress,
} from "../storage/progressStore";

export function useSubjectProgress(subjectId) {
  const [progress, setProgress] = useState(() => getSubjectProgress(subjectId));

  useEffect(() => {
    return subscribeProgress(() => {
      setProgress(getSubjectProgress(subjectId));
    });
  }, [subjectId]);

  return progress;
}
