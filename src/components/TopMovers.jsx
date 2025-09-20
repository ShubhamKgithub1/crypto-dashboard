import { useSelector } from "react-redux";
import { selectMoversSliceData } from "../features/moversSlice";

const TopMovers = () => {
  const coins = useSelector(selectMoversSliceData);

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

  if (!coins) {
    return;
  }

  return (
    <div className="flex flex-col justify-between h-full w-full gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Gainers</h1>
        {gainers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <div className="flex gap-1">
              <span className="text-gray-600">{coin.name}</span>
              <span className="text-gray-400">({coin.symbol})</span>
            </div>
            <span className="text-green-500">
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="font-semibold mb-2">Top Losers</h1>
        {losers.map((coin, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <div className="flex gap-1">
              <span className="text-gray-600">{coin.name}</span>
              <span className="text-gray-400">({coin.symbol})</span>
            </div>
            <span className="text-red-500">
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
