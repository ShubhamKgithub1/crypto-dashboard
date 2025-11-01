import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modalSlice";

const StatCard = ({ name, price, change, changeType, data }) => {
  const theme = useSelector((state)=>state.theme.mode);
  const isDarkMode = theme === "dark";
  const dispatch = useDispatch();
  const textColor = isDarkMode ?"#e2e8f0":"#e2e8f0";
  const percent = change ? parseFloat(change) : null;
  const isPositive = changeType === "positive";
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      onClick={() => dispatch(openModal(data))}
      className="bg-indigo-600 text-white dark:bg-slate-700 px-2 py-2 md:py-4 md:px-4 rounded-lg lg:rounded-xl shadow-md transition hover:shadow-lg flex justify-between items-center cursor-pointer animate-fadeIn"
    >
      <div>
        <h2 className="text-gray-300 dark:text-gray-400 text-xs lg:text-sm font-semibold">{name}</h2>
        <p className="text-base lg:text-xl font-semibold lg:font-bold">{price}</p>
        {change && changeType && (
          <div className="flex items-center gap-1">
            <Icon
              className={`w-3 h-3 lg:w-4 lg:h-4 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            />
            <span
              className={`text-xs md:text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      {change && (
        <div className="w-10 h-10 lg:w-14 lg:h-14">
          <CircularProgressbar
            value={Math.abs(percent)}
            text={`${percent}%`}
            styles={buildStyles({
              textSize: "24px",
              textColor: textColor,
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
