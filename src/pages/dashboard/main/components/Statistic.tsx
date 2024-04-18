import { HiTrendingUp } from "react-icons/hi";
import { HiTrendingDown } from "react-icons/hi";
import { IconType } from "react-icons/lib";

type StatisticProps = {
  Icon: IconType;
  title: string;
  value: number;
  color: string;
  trend: number;
};

export function Statistic({ Icon, title, value, color, trend }: StatisticProps) {
  const TrendIcon = trend > 0 ? HiTrendingUp : HiTrendingDown;
  const trendColor = trend > 0 ? "#00B69B" : "#F93C65";
  return (
    <div className=" p-3 shadow-custom rounded-xl">
      <main className=" flex justify-between ">
        <div>
          <span className=" text-gray-500">{title}</span>
          <h1 className="text-3xl font-semibold">{value}</h1>
        </div>
        <div className={` flex items-center rounded-2xl gap-2 px-4 py-1 bg-[${color}]/20  text-[${color}]`}>
          <Icon size={26} />
        </div>
      </main>
      <footer className="flex gap-2 justify-start items-center text-sm pt-2">
        <TrendIcon style={{ color: trendColor }} size={20} />
        <span>
          <span style={{ color: trendColor }}>8.5% </span>
          from last month
        </span>
      </footer>
    </div>
  );
}
