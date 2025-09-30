import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { selectDominanceHistory } from "../features/historySlice";

const MarketDominanceChart = () => {
  const dominanceData = useSelector(selectDominanceHistory);
  console.log(dominanceData);
  if (!dominanceData) {
    return null;
  }
  return (
    <div className="flex-1 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dominanceData}
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
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tickFormatter={(ts) =>
              new Date(ts).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis tickFormatter={(val) => `${val}%`} tickLine={false} axisLine={false} padding={{bottom:20, top:0, left:0, right:0}}/>
          <Area
            type="monotone"
            dataKey="bitcoin"
            stroke="#00f2fe"
            fill="url(#colorBTC)"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="ethereum"
            stroke="#38bdf8"
            fill="url(#colorETH)"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="solana"
            stroke="#6d28d9"
            fill="url(#colorOthers)"
            stackId="1"
          />
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString("en-US", {
                weekday: "short", // Mon, Tue, etc.
                month: "short", // Jan, Feb
                day: "numeric", // 1, 2, 3...
              });
            }}
            cursor={{ stroke: "transparent" }}
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
