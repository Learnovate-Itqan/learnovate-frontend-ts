import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

const data = [
  { name: "1 Feb", visits: 0 },
  { name: "2 Feb", visits: 1398 },
  { name: "3 Feb", visits: 9800 },
  { name: "4 Feb", visits: 3908 },
  { name: "5 Feb", visits: 4800 },
  { name: "6 Feb", visits: 3800 },
  { name: "7 Feb", visits: 4300 },
  { name: "8 Feb", visits: 2400 },
  { name: "9 Feb", visits: 1398 },
  { name: "10 Feb", visits: 9800 },
  { name: "11 Feb", visits: 3908 },
  { name: "12 Feb", visits: 4800 },
  { name: "13 Feb", visits: 3800 },
  { name: "14 Feb", visits: 4300 },
  { name: "15 Feb", visits: 4300 },
  { name: "16 Feb", visits: 4300 },
  { name: "17 Feb", visits: 4300 },
  { name: "18 Feb", visits: 4300 },
  { name: "19 Feb", visits: 4300 },
  { name: "20 Feb", visits: 1398 },
  { name: "21 Feb", visits: 4300 },
  { name: "22 Feb", visits: 2908 },
  { name: "23 Feb", visits: 4300 },
  { name: "24 Feb", visits: 6000 },
  { name: "25 Feb", visits: 4300 },
  { name: "26 Feb", visits: 4300 },
  { name: "27 Feb", visits: 4300 },
  { name: "28 Feb", visits: 0 },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const day = payload[0].payload.name;
    return (
      <div className="bg-white p-4 shadow-xl rounded-md text-center">
        <h6 className="font-medium">{day}</h6>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498DB" stopOpacity={1} />
            <stop offset="95%" stopColor="#3498DB" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="visits" stroke="#3498DB" strokeWidth={2.5} fill="url(#colorVisits)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const StatsCard = () => {
  return (
    <div className="shadow-xl p-6 rounded-md space-y-2">
      <div>
        <h5 className="font-medium text-xl">profile visits</h5>
        <span>last 30 days</span>
      </div>
      <Chart />
    </div>
  );
};
