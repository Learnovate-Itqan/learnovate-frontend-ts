import { mentor } from "@/db/mentor";

import { ViewerHeader } from "./components/mentorViewHeader";

export const MentorPage = () => {
  return (
    <>
      <ViewerHeader {...mentor} />
    </>
  );
};
