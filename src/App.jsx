import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import SubjectHub from "./pages/BiologyHub";
import ChapterQuiz from "./pages/ChapterQuiz";
import ChapterResults from "./pages/ChapterResults";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/:subjectId" element={<SubjectHub />} />
      <Route path="/:subjectId/chapter/:chapterId" element={<ChapterQuiz />} />
      <Route path="/:subjectId/chapter/:chapterId/results" element={<ChapterResults />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
