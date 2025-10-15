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
import { getChartColors } from "../utils/chartColors";

const MarketDominanceChart = () => {
  const dominanceData = useSelector(selectDominanceHistory);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const chartColors = getChartColors(isDark);
  if (!dominanceData) {
    return null;
  }
  return (
    <div className="lg:flex-1 h-[300px] w-full">
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
            tick={{fill: chartColors.text}}
          />
          <YAxis
            tick={{ fill: chartColors.text, textAnchor: "start", dx: -40 }}
            tickFormatter={(val) => `${val}%`}
            tickLine={false}
            axisLine={false}
            padding={{ bottom: 20, top: 0, left: 0, right: 0 }}
          />
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
             backgroundColor: chartColors.bg,
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketDominanceChart;
