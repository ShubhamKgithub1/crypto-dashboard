import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { selectTopCoins } from "../features/topCoinsSlice";

function VolumeChart() {
  const data = useSelector(selectTopCoins);
  const topCoins = data.slice(0, 4);
  if(!topCoins) return;
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={topCoins}
            dataKey="total_volume"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65} // makes it a donut instead of a pie
            outerRadius={100}
            paddingAngle={2} // spacing between slices
             label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            content={({ payload }) => (
              <div className="flex justify-center gap-6 mt-4">
                {payload.map((entry, index) => (
                  <div
                    key={`item-${index}`}
                    className="flex items-center gap-2"
                  >
                    {/* Circle indicator */}
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-sm font-medium text-gray-700">
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

export default VolumeChart;
