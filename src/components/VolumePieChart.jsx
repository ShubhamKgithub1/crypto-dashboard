import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { getChartColors } from "../utils/chartColors";

function VolumePieChart({ data }) {
  const topCoins = data.slice(0, 4);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const chartColors = getChartColors(isDark);
  return (
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={topCoins}
            dataKey="total_volume"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {topCoins.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#facc15", "#3b82f6", "#f97316", "#111"][index]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              `$${(value / 1e9).toFixed(1)}B`,
              "Market Cap",
            ]}
            contentStyle={{
              backgroundColor: chartColors.bg,
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
            labelStyle={{
              color: chartColors.text, // fixes label text color
            }}
            itemStyle={{
              color: chartColors.text, // fixes value text color
            }}
          />
          <Legend
            content={({ payload }) => (
              <div className="flex justify-between mt-4">
                {payload.map((entry, index) => (
                  <div
                    key={`item-${index}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumePieChart;
