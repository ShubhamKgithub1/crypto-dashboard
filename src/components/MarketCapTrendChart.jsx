import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  selectMarketCapHistory,
  selectTimeRange,
} from "../features/historySlice";
import { useSelector } from "react-redux";
import { sliceData } from "../utils/sliceData";
import TimeRangeDropdown from "./TimeRangeDropdown";
import { getChartColors } from "../utils/chartColors";

const MarketCapTrendChart = () => {
  const range = useSelector(selectTimeRange);
  const data = useSelector(selectMarketCapHistory);
    const theme = useSelector((state) => state.theme.mode);
    const isDark = theme === "dark";
    const chartColors = getChartColors(isDark);
  const filteredData = sliceData(data, range);
  const chartData = filteredData?.map(([timestamp, cap]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    marketCap: cap,
  }));

  return (
    <div className="flex-1 flex flex-col gap-2 lg:gap-4">
      <div className="flex justify-between">
        <h2 className="lg:text-lg font-semibold lg:font-bold">
          Global Market Cap ({range})
        </h2>
        <TimeRangeDropdown />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 0, left: 15, bottom: 0 }}
        >
          <defs>
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
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tick={{ fill: chartColors.text }}
          />
          <YAxis
            orientation="left"
            tickLine={false}
            axisLine={false}
            domain={["dataMin", "dataMax"]}
            padding={{ bottom: 20 }}
            tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
            tick={{ fill: chartColors.text }}
          />
          <Tooltip
            cursor={{ stroke: "transparent" }}
            formatter={(value) => [
              `$${(value / 1e9).toFixed(2)}B`,
              "Market Cap",
            ]}
            contentStyle={{
              backgroundColor: chartColors.bg,
              color: chartColors.text,
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          />

          <Area
            type="monotone"
            dataKey="marketCap"
            fill="url(#gradient-fill)"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            filter="url(#glow)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketCapTrendChart;
