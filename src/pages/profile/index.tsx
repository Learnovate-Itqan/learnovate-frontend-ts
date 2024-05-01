import { MentorMePage } from "../mentor/me";
import { StudentProfilePage } from "./StudentProfilePage";

const UserType = {
  mentor: <MentorMePage />,
  student: <StudentProfilePage />,
};

export default function Profile() {
  const userRole = "student";
  return <>{userRole && UserType[userRole]}</>;
}
