import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MarketDominanceChart = () => {
  const mockMarketDominance = [
    { date: "Day 1", btc: 48, eth: 18, others: 34 },
    { date: "Day 2", btc: 49, eth: 17, others: 34 },
    { date: "Day 3", btc: 47, eth: 19, others: 34 },
    { date: "Day 4", btc: 50, eth: 18, others: 32 },
    { date: "Day 5", btc: 51, eth: 17, others: 32 },
    { date: "Day 6", btc: 49, eth: 18, others: 33 },
    { date: "Day 7", btc: 48, eth: 19, others: 33 },
  ];

  return (
    <div className="flex-1 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockMarketDominance}
          margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorOthers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6d28d9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6d28d9" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
          <Area
            type="monotone"
            dataKey="btc"
            stroke="#00f2fe"
            fill="url(#colorBTC)"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="eth"
            stroke="#38bdf8"
            fill="url(#colorETH)"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="others"
            stroke="#6d28d9"
            fill="url(#colorOthers)"
            stackId="1"
          />
          <Tooltip
            formatter={(value, name) => [`${value}%`, name.toUpperCase()]}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketDominanceChart;
