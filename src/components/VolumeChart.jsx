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
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
