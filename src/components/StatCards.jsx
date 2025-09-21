import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StatCard = ({ name, price, change, changeType }) => {
  const percent = parseFloat(change); // from "2.5%" → 2.5
  const value = isNaN(percent) ? 0 : percent;
  const Icon = changeType === "positive" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white px-4 py-2 rounded-xl shadow-md transition hover:shadow-lg flex justify-between items-center">
      <div>
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
      <div className="w-14 h-14">
        <CircularProgressbar
          value={Math.abs(value)}
          text={`${value}%`}
          styles={buildStyles({
            textSize: "24px",
            textColor: "#333",
            pathColor: changeType === "positive" ? "#22c55e" : "#ef4444",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
    </div>
  );
};

export default StatCard;
