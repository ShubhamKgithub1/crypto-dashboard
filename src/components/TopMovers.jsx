import { useSelector } from "react-redux";
import CardSkeleton from "./CardSkeleton";
import {
  selectTopGainers,
  selectTopLosers,
} from "../features/snapshotSelectors";

const TopMovers = ({ status }) => {
  const gainers = useSelector(selectTopGainers);
  const losers = useSelector(selectTopLosers);

  return (
    <div className="flex-1 flex flex-col justify-between h-full w-full gap-3 lg:gap-6">
      {status === "loading" || status === "idle" ? (
        <CardSkeleton className={"h-[45%]"} />
      ) : (
        <div className="flex-1 bg-white dark:bg-card-dark p-3 lg:p-4 rounded-xl shadow-md hover:shadow-lg transition animate-fadeIn">
          <h1 className="font-semibold lg:font-bold lg:text-lg mb-2">Top Gainers</h1>
          {gainers.map((coin, index) => (
            <div key={index} className="flex justify-between text-sm py-1">
              <div className="flex items-center gap-2">
                <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                <span className="text-gray-600 dark:text-gray-200">{coin.name}</span>
                <span className="text-gray-400">({coin.symbol})</span>
              </div>
              <span className="text-green-500">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      )}
      {status === "loading" || status === "idle" ? (
        <CardSkeleton className={"h-[45%]"} />
      ) : (
        <div className="flex-1 bg-white dark:bg-card-dark p-3 lg:p-4 rounded-xl shadow-md hover:shadow-lg transition animate-fadeIn">
          <h1 className="font-semibold lg:font-bold lg:text-lg mb-2">Top Losers</h1>
          {losers.map((coin, index) => (
            <div key={index} className="flex justify-between text-sm py-1">
              <div className="flex items-center gap-2">
                <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                <span className="text-gray-600 dark:text-gray-200">{coin.name}</span>
                <span className="text-gray-400">({coin.symbol})</span>
              </div>
              <span className="text-red-500">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopMovers;
