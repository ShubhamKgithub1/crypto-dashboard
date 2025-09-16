import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const data = [
  { name: "Bitcoin", volume: 1200 },
  { name: "Ethereum", volume: 900 },
  { name: "Dogecoin", volume: 400 },
];

function VolumeChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="volume"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65} // makes it a donut instead of a pie
            outerRadius={100}
            paddingAngle={2} // spacing between slices
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#facc15", "#3b82f6", "#f97316"][index]}
              />
            ))}
          </Pie>
          <Tooltip
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
