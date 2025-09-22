import { useSelector } from "react-redux";
import { selectMoversSliceData, selectMoversSliceStatus } from "../features/moversSlice";
import CardSkeleton from "./CardSkeleton";

const TopMovers = () => {
  const coins = useSelector(selectMoversSliceData);
  const status = useSelector(selectMoversSliceStatus);

  const gainers = [...coins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 3);

  const losers = [...coins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 3);


  return (
    <div className="flex flex-col justify-between h-full w-full gap-6">
      {status === "loading"?(<CardSkeleton className={"h-[50%]"}/>):(
        <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Gainers</h1>
        {gainers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <div className="flex items-center gap-2">
              <span className="bg-green-500 w-2 h-2 rounded-full"></span>
              <span className="text-gray-600">{coin.name}</span>
              <span className="text-gray-400">({coin.symbol})</span>
            </div>
            <span className="text-green-500">
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      ) }
      {status === "loading"?(<CardSkeleton className={"h-[50%]"}/>):(
        <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Losers</h1>
        {losers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <div className="flex items-center gap-2">
              <span className="bg-red-500 w-2 h-2 rounded-full"></span>
              <span className="text-gray-600">{coin.name}</span>
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
