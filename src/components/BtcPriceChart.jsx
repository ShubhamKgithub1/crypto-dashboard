import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useSelector } from "react-redux";
import { selectCoinsHistory, selectTimeRange } from "../features/historySlice";
import { sliceData } from "../utils/sliceData";
import TimeRangeDropdown from "./TimeRangeDropdown";

function BtcPriceChart() {
  const range = useSelector(selectTimeRange);
  const data = useSelector(selectCoinsHistory);
  const rawPrices = data?.bitcoin?.prices;
  const filteredPrices = sliceData(rawPrices, range); // 👈 Apply filter here

  const chartData = filteredPrices?.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: price,
  }));

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Bitcoin Price ({range})</h2>
        <TimeRangeDropdown />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="5"
                floodColor="#000000"
                floodOpacity="0.3"
              />
            </filter>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
            <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
            </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
          tick={{ textAnchor: "start", dx: -50 }}
            dataKey="price"
            axisLine={false}
            tickLine={false}
            domain={["dataMin", "dataMax"]}
            padding={{ bottom: 20 }}
            tickFormatter={(value) =>
              value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
            }
          />
          <Tooltip
            cursor={{ stroke: "transparent" }}
            formatter={(value) => [
              value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`,
              "Price",
            ]}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="url(#lineGradient)"
            fill="url(#gradient-fill)"
            filter="url(#glow)"
            strokeWidth={3}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BtcPriceChart;
