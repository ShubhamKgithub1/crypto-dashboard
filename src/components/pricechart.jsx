import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const data = [
  { name: "Mon", price: 400 },
  { name: "Tue", price: 300 },
  { name: "Wed", price: 500 },
  { name: "Thu", price: 200 },
  { name: "Fri", price: 600 },
  { name: "Sat", price: 800 },
  { name: "Sun", price: 700 },
];

function PriceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
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
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis dataKey="price" axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ stroke: "transparent" }}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          filter="url(#shadow)"
          dot={false} // remove dots, looks cleaner for price trend
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;
