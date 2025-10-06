import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { formatNumber } from "../utils/formatNumber";

const SparklineCard = ({ title, history, color }) => {

  const data =
    history?.prices?.slice(-14).map(([timestamp, price]) => ({
      time: timestamp,
      price,
    })) || [];
    console.log(data);
  // Latest price (last element)
  const latestPrice = data.length > 0 ? data[data.length - 1].price : null;

  return (
    <div className="flex-1 flex justify-between items-center p-3 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
      <div className="flex flex-col">
        <h1 className="text-sm font-medium text-gray-600">{title}</h1>
        {latestPrice && (
          <p className="text-lg font-bold text-gray-900">
            ${formatNumber(latestPrice)}
          </p>
        )}
      </div>
      <div className="h-full w-[80%]">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data}>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <XAxis hide />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={3}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SparklineCard;
