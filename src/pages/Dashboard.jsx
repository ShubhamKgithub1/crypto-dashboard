import StatCard from "../components/StatCards";
import BtcPriceChart from "../components/BtcPriceChart";
import VolumeChart from "../components/VolumeChart";
import TopCoinsTable from "../components/TopCoinsTable";
import TopMovers from "../components/TopMovers";
import { useSelector } from "react-redux";
import { selectMarketCoins } from "../features/marketSlice";

const Dashboard = () => {
  const coins = useSelector(selectMarketCoins);

  if (!coins) return;
  return (
    <div className="flex flex-col flex-1 min-h-0 p-4 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {coins.slice(0, 4).map((coin) => (
          <StatCard
            key={coin.id}
            name={coin.name}
            price={`$${coin.current_price.toLocaleString()}`}
            change={`${coin.price_change_percentage_24h.toFixed(2)}%`}
            changeType={
              coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-2 flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Bitcoin Price</h2>
          <BtcPriceChart />
        </div>
        <div className=" flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Top Coins by Volume</h2>
          <VolumeChart />
        </div>
        <div className="">
          <TopMovers />
        </div>
      </div>
      <div className="flex-1 min-h-0 bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Top coins</h2>
        <div className="flex-1 min-h-0">
          <TopCoinsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
