import { Area, AreaChart, ResponsiveContainer } from "recharts";

const SparklineCard = ({ title, value, data, color }) => {
    console.log(data);
  return (
    <div className="flex-1 flex justify-between items-center p-4 rounded-2xl shadow-lg bg-white ">
       <div className="flex flex-col">
        <h1 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h1>
        <p className="text-lg font-bold">{value}</p>
      </div>
      <div className="h-full w-[60%]">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data}>
            <Area dataKey="price" stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
              dot={false}></Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SparklineCard;
