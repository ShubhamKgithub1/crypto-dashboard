import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MarketCapChart = () => {
  const data = [
    { name: "BTC", marketCap: 850 },
    { name: "ETH", marketCap: 400 },
    { name: "BNB", marketCap: 90 },
    { name: "SOL", marketCap: 80 },
    { name: "XRP", marketCap: 70 },
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
            tickFormatter={(value) => `${value}B`}
          />
          <Tooltip
            formatter={(value) => [`$${value}B`, "Market Cap"]}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="marketCap"
            fill="url(#barGradient)"
            barSize={40}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketCapChart;
