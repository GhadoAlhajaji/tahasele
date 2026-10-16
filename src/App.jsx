import { useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LaunchSplash from "./components/LaunchSplash";
import Home from "./pages/Home";
import Heroines from "./pages/Heroines";
import Subjects from "./pages/Subjects";
import SubjectHub from "./pages/BiologyHub";
import ChapterQuiz from "./pages/ChapterQuiz";
import ChapterResults from "./pages/ChapterResults";

export default function App() {
  const [showLaunch, setShowLaunch] = useState(true);
  const audioRef = useRef(null);

  const playLaunchAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const playback = audio.play();
    if (playback) playback.catch(() => {});
  };

  return (
    <>
      <audio
        ref={audioRef}
        className="launch-audio"
        src="/collaboration.mp3"
        preload="auto"
        playsInline
        aria-hidden="true"
      />
      <div inert={showLaunch}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heroines" element={<Heroines />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/:subjectId" element={<SubjectHub />} />
          <Route path="/:subjectId/chapter/:chapterId" element={<ChapterQuiz />} />
          <Route path="/:subjectId/chapter/:chapterId/results" element={<ChapterResults />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showLaunch ? <LaunchSplash onPlay={playLaunchAudio} onDone={() => setShowLaunch(false)} /> : null}
    </>
  );
}
