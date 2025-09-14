import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis  axisLine={false} tickLine={false}/>
          <Tooltip
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
            stroke="#4f46e5"
            strokeWidth={2.5}
            dot={false}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </LineChart>
      </ResponsiveContainer>
  );
}

export default PriceChart;
