import { MentorEditProfile } from "./MentorEditProfile";
import { StudentEditProfile } from "./StudentEditProfile";

const UserType = {
  mentor: <MentorEditProfile />,
  student: <StudentEditProfile />,
};

export function EditProfile() {
  const userRole = "mentor";

  return <>{userRole && UserType[userRole]}</>;
}
