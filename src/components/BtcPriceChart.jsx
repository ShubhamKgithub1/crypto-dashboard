import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { useSelector } from "react-redux";
import { selectCoinsHistory } from "../features/historySlice";

function BtcPriceChart() {
  const data = useSelector(selectCoinsHistory);
  const priceHistory = data?.bitcoin;
  const rawPrices = priceHistory.prices;
  const chartData = rawPrices?.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", { weekday: "short" }),
    price: price,
  }));


  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
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
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
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
          formatter={(value) =>
             [value >= 1000 ?`$${(value / 1000).toFixed(0)}k` : `$${value}`, "price"]
          }        
            // formatter={(value) => [`$${(value / 1e9).toFixed(1)}B`, "Market Cap"]}
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
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default BtcPriceChart;
