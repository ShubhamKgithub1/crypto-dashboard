import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { selectMarketCapHistory } from "../features/historySlice";
import { useSelector } from "react-redux";

const MarketCapTrendChart = () => {
    const data = useSelector(selectMarketCapHistory);
  const chartData = data?.map(([timestamp, cap]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", { weekday: "short" }),
    marketCap: cap,
  }));

  return (
<div className="flex-1">
  <ResponsiveContainer width="100%" height="100%">
  <AreaChart
    data={chartData}
    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
  >
    <defs>
      {/* Neon line gradient */}
      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6d28d9" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>

      {/* Softer area fill */}
      <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.3} />
        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.05} />
      </linearGradient>

      {/* Glow effect using SVG filter */}
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
    />
    <YAxis
      tickLine={false}
      axisLine={false}
      domain={["dataMin", "dataMax"]}
      padding={{ bottom: 20 }}
       tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
    />
    <Tooltip
      cursor={{ stroke: "transparent" }}
      contentStyle={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    />

    <Area
      type="monotone"
      dataKey="marketCap"
      fill="url(#gradient-fill)"
      stroke="url(#lineGradient)"
      strokeWidth={3}
      filter="url(#glow)"   // neon glow on the line
      dot={false}
    />
  </AreaChart>
</ResponsiveContainer>

</div>

  );
};

export default MarketCapTrendChart;
