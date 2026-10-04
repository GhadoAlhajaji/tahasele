import BiologyDecor from "./BiologyDecor";
import ChemistryDecor from "./ChemistryDecor";
import PhysicsDecor from "./PhysicsDecor";
import { SUBJECT_IDS } from "../config/app";

const decorBySubject = {
  [SUBJECT_IDS.biology]: BiologyDecor,
  [SUBJECT_IDS.chemistry]: ChemistryDecor,
  [SUBJECT_IDS.physics]: PhysicsDecor,
};

export default function SubjectDecor({ subjectId }) {
  const Decor = decorBySubject[subjectId] ?? BiologyDecor;
  return <Decor />;
}
