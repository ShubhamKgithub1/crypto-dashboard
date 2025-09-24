import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TopVolumeBarChart = () => {
  const mockTopVolumeData = [
    { name: "Bitcoin", volume: 23.5 },
    { name: "Ethereum", volume: 18.2 },
    { name: "Tether", volume: 12.1 },
    { name: "Solana", volume: 9.8 },
    { name: "XRP", volume: 6.4 },
    { name: "BNB", volume: 5.7 },
    { name: "Dogecoin", volume: 4.2 },
    { name: "Toncoin", volume: 3.8 },
    { name: "Cardano", volume: 3.2 },
    { name: "TRON", volume: 2.9 },
  ];
  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockTopVolumeData} margin={{top:20, right:0, left:-10, bottom:0}} >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Bar
            dataKey="volume"
            fill="url(#barGradient)"
            barSize={40}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopVolumeBarChart;
