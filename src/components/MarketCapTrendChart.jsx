import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MarketCapTrendChart = () => {
  const mockMarketCapTrend = [
    { date: "Day 1", marketCap: 3850 },
    { date: "Day 2", marketCap: 3900 },
    { date: "Day 3", marketCap: 3925 },
    { date: "Day 4", marketCap: 3880 },
    { date: "Day 5", marketCap: 3950 },
    { date: "Day 6", marketCap: 4000 },
    { date: "Day 7", marketCap: 4050 },
  ];
  return (
<div className="flex-1">
  <ResponsiveContainer width="100%" height="100%">
  <AreaChart
    data={mockMarketCapTrend}
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
