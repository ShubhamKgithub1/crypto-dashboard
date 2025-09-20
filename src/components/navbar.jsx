import { useSelector } from "react-redux";
import { selectMarketLastUpdated } from "../features/marketSlice";
import { useEffect, useState } from "react";
import formatRelativeTime from "../utils/time";

const Navbar = () => {
  const lastUpdated = useSelector(selectMarketLastUpdated);
  const [relativeTime, setRelativeTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      setRelativeTime(formatRelativeTime(lastUpdated));
    };

    updateTime();

    const interval = setInterval(updateTime, 60000); // update every 1 min

    return () => clearInterval(interval); // cleanup when unmounted
  }, [lastUpdated]);

  return (
    <div className="flex p-4 justify-between items-center">
      <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
      <div className="">
        <span className="text-gray-400 font-semibold">Last Updated: </span>
        <span className="text-green-600 font-semibold">{relativeTime}</span>
        {/* <button className="px-4 py-2 rounded bg-gray-200">Settings</button> */}
      </div>
    </div>
  );
};

export default Navbar;
