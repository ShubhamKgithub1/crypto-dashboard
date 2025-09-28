import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TopCoinsChart = ({data, dataKey = "market_cap", title ="Market Cap", formatter}) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false}/>
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatter} // billions
          />
          <Tooltip
            formatter={(value)=>[formatter(value),title]}
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient)"
            barSize={40}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoinsChart;
