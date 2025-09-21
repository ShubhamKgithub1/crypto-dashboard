import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { selectTopCoins } from "../features/topCoinsSlice";

const TopCoinsTable = () => {
  const topCoins = useSelector(selectTopCoins);
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topCoins}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`} // billions
          />
          <Tooltip
            formatter={(value) => [`$${(value / 1e9).toFixed(1)}B`, "Market Cap"]}
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="market_cap"
            fill="url(#barGradient)"
            barSize={40}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoinsTable;
