import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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
        <BarChart data={data} barSize={60}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="volume" radius={[8, 8, 0, 0]}>
            <Cell fill="#facc15" /> {/* Bitcoin - yellow */}
            <Cell fill="#3b82f6" /> {/* Ethereum - blue */}
            <Cell fill="#f97316" /> {/* Dogecoin - orange */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
