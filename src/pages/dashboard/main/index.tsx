import { BsFillPeopleFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { RiPresentationLine } from "react-icons/ri";
import { z } from "zod";

import { mentorSchema } from "@/schemas/mentorSchema";

import { Statistic } from "./components/Statistic";
import { TopMentors } from "./components/TopMentors";
import { TopTracksChart } from "./components/TopTracksChart";
import { TopUsers } from "./components/TopUsers";

const topTracks = [
  { name: "Data Science", value: 900 },
  { name: "Front end", value: 500 },
  { name: "Back end", value: 600 },
  { name: "Security", value: 300 },
  { name: "Other", value: 100 },
];
const totalUsers = [
  {
    name: "Jan",
    user: 6816,
  },
  {
    name: "Feb",
    user: 4511,
  },
  {
    name: "Mar",
    user: 5992,
  },
  {
    name: "Apr",
    user: 4588,
  },
  {
    name: "May",
    user: 4001,
  },
  {
    name: "Jun",
    user: 9795,
  },
  {
    name: "Jul",
    user: 1385,
  },
  {
    name: "Aug",
    user: 6224,
  },
  {
    name: "Sep",
    user: 6360,
  },
  {
    name: "Oct",
    user: 2933,
  },
  {
    name: "Nov",
    user: 4288,
  },
  {
    name: "Dec",
    user: 4394,
  },
];

const TOP_MENTORS: z.infer<typeof mentorSchema>[] = [];
export function DashboardMain() {
  return (
    <main>
      <section className=" grid grid-cols-4 gap-3">
        <Statistic
          Icon={BsFillPeopleFill}
          title="Learners"
          value={1200}
          IconClassName={"bg-[#3D42DF]/20 text-[#3D42DF]"}
          trend={8.5}
        />
        <Statistic
          Icon={RiPresentationLine}
          title="Mentors"
          value={1200}
          IconClassName={"bg-[#C94E08]/20 text-[#C94E08]"}
          trend={8.5}
        />
        <Statistic
          Icon={PiBooksBold}
          title="Courses"
          value={1200}
          IconClassName={"bg-[#3498DB]/20 text-[#3498DB]"}
          trend={8.5}
        />
        <Statistic
          Icon={FaMoneyCheckDollar}
          title="Profits"
          value={1200}
          IconClassName={"bg-[#2ECC71]/20 text-[#2ECC71]"}
          trend={-8.5}
        />
      </section>
      <section className="py-4 grid grid-cols-[1.5fr_2fr] gap-3">
        <TopTracksChart data={topTracks} />
        <TopUsers data={totalUsers} />
      </section>
      <section>
        <TopMentors mentors={TOP_MENTORS} />
      </section>
    </main>
  );
}
