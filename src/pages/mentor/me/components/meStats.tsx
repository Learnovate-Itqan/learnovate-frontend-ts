import { SocialCard } from "./SocialCard";
import { LearnersCard } from "./learnersCard";
import { StatsCard } from "./visitsCard";

export const MeStats = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex gap-6 flex-col lg:flex-row">
        <LearnersCard />
        <SocialCard />
      </div>
      <StatsCard />
    </div>
  );
};
