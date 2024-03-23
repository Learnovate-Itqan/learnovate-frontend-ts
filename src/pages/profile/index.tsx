import { Navbar } from "@/layouts/Navbar";

import { MentorMePage } from "../mentor/me";
import StudentProfilePage from "./StudentProfilePage";

const UserType = {
  mentor: <MentorMePage />,
  student: <StudentProfilePage />,
};

export default function Profile() {
  const userRole = "student";
  return (
    <>
      <Navbar />
      {userRole && UserType[userRole]}
    </>
  );
}
