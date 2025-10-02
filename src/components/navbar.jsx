import { useSelector } from "react-redux";
import { selectMarketLastUpdated } from "../features/marketSlice";
import { useEffect, useState } from "react";
import formatRelativeTime from "../utils/time";

const Navbar = ({title, showLiveStatus}) => {
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
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {showLiveStatus && <div className="">
        <span className="text-gray-400 font-semibold">Last Updated: </span>
        <span className="text-green-600 font-semibold">{relativeTime}</span>
      </div>}
    </div>
  );
};

export default Navbar;
