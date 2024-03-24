import { Link } from "react-router-dom";

import { LearnovateLogo } from "@/components/icons/Logo";

export const Header = () => {
  return (
    <div className="container flex items-center gap-4">
      <Link to="/">
        <LearnovateLogo className="h-12" />
      </Link>
      <h1 className="text-3xl font-bold text-dark-navy">Edit Profile</h1>
    </div>
  );
};
