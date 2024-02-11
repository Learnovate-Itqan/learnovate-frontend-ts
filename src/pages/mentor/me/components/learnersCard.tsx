import { Learners } from "@/components/icons/Learners";

export const LearnersCard = () => {
  return (
    <div className="shadow-xl flex flex-col items-center gap-y-2 p-6 rounded-md">
      <Learners className="w-32" fill="#3498DB" />
      <h5 className="text-royal-blue text-xl">Learners</h5>
      <p className="text-3xl">203</p>
    </div>
  );
};
