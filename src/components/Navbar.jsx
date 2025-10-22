import { useSelector } from "react-redux";
import { selectSnapshotLastUpdated } from "../features/marketsSnapshotSlice";
import { useEffect, useState } from "react";
import formatRelativeTime from "../utils/time";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = ({ title, subHeader, showLiveStatus }) => {
  const lastUpdated = useSelector(selectSnapshotLastUpdated);
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setRelativeTime(formatRelativeTime(lastUpdated));
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="flex justify-between items-center animate-fadeIn">
      <div>
        <h1 className="text-lg lg:text-2xl font-bold">{title}</h1>
        <p className="hidden md:block text-gray-600 text-xs md:text-sm lg:text-base font-semibold dark:text-gray-300">{subHeader}</p>
      </div>
      <div className="flex items-center gap-1 lg:gap-4">
        {showLiveStatus && (
          <div className="text-xs md:text-sm lg:text-base font-semibold">
            <span className="text-gray-400">Last Updated: </span>
            <span className="text-green-600">{relativeTime}</span>
          </div>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
