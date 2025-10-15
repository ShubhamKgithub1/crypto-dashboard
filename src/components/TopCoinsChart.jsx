import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getChartColors } from "../utils/chartColors";

const TopCoinsChart = ({
  data,
  dataKey = "market_cap",
  header,
  title = "Market Cap",
  formatter,
}) => {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const chartColors = getChartColors(isDark);
  return (
    <div className="w-full flex flex-col gap-2 lg:gap-4 p-3 lg:p-4 h-[300px] lg:h-full">
      <h2 className="lg:text-lg font-semibold lg:font-bold">{header}</h2>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={`text-gray-600`}
      >
        <BarChart data={data} margin={{ left: 15 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.gradientFrom} />
              <stop offset="100%" stopColor={chartColors.gradientTo} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            padding={{ left: -20 }}
            tick={{ fill: chartColors.text }}
          />
          <YAxis
            tick={{ fill: chartColors.text, textAnchor: "start", dx: -65 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatter}
          />
          <Tooltip
            formatter={(value) => [formatter(value), title]}
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: chartColors.bg,
              color: chartColors.text,
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient)"
            barSize={20}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCoinsChart;
