import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";

const StatCard = ({ name, price, change, changeType,data }) => {
  const dispatch = useDispatch();
  const percent = change ? parseFloat(change) : null;
  const isPositive = changeType === "positive";
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div onClick={()=>dispatch(openModal(data))}
    className="bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg flex justify-between items-center cursor-pointer">
      <div>
        <h2 className="text-gray-500 text-sm">{name}</h2>
        <p className="text-xl font-bold">{price}</p>
         {change && changeType && (
          <div className="flex items-center gap-1">
            <Icon
              className={`w-4 h-4 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            />
            <span
              className={`text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      {change && (
        <div className="w-14 h-14">
          <CircularProgressbar
            value={Math.abs(percent)}
            text={`${percent}%`}
            styles={buildStyles({
              textSize: "24px",
              textColor: "#333",
              pathColor: isPositive ? "#22c55e" : "#ef4444",
              trailColor: "#e5e7eb",
            })}
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;