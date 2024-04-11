import { Navbar } from "@/layouts/Navbar";

import { MentorEditProfile } from "./MentorEditProfile";
import { StudentEditProfile } from "./StudentEditProfile";

const UserType = {
  mentor: <MentorEditProfile />,
  student: <StudentEditProfile />,
};

export function EditProfile() {
  const userRole = "mentor";

  return (
    <>
      <Navbar />
      {userRole && UserType[userRole]}
    </>
  );
}
