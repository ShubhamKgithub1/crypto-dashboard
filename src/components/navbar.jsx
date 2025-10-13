import { useSelector } from "react-redux";
import { selectSnapshotLastUpdated } from "../features/marketsSnapshotSlice";
import { useEffect, useState } from "react";
import formatRelativeTime from "../utils/time";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = ({title,subHeader  , showLiveStatus}) => {
  const lastUpdated = useSelector(selectSnapshotLastUpdated);
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
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">{subHeader}</p>
      </div>
<div className="flex items-center gap-4">
        {showLiveStatus && <div className="">
        <span className="text-gray-400 font-semibold">Last Updated: </span>
        <span className="text-green-600 font-semibold">{relativeTime}</span>
      </div>}
      <ThemeSwitcher/>
</div>
      
    </div>
  );
};

export default Navbar;
