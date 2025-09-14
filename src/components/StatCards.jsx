import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ name, price, change, changeType }) => {
      const Icon = changeType === "positive" ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
      <h2 className="text-gray-500 text-sm">{name}</h2>
      <p className="text-2xl font-bold">{price}</p>
       <div className="flex items-center gap-1">
        <Icon
          className={`w-4 h-4 ${
            changeType === "positive" ? "text-green-500" : "text-red-500"
          }`}
        />
        <span
          className={`text-sm ${
            changeType === "positive" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
