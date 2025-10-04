import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeRange, selectTimeRange } from "../features/historySlice";

const ranges = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
];

const TimeRangeDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const timeRange = useSelector(selectTimeRange);

  const handleSelect = (value) => {
    dispatch(setTimeRange(value));
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-28 px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
      >
        <span className="text-sm font-medium">
          {ranges.find((r) => r.value === timeRange)?.label}
        </span>
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {ranges.map((range) => (
            <div
              key={range.value}
              onClick={() => handleSelect(range.value)}
              className={`px-3 py-1.5 text-sm cursor-pointer rounded-md ${
                timeRange === range.value
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeRangeDropdown;
