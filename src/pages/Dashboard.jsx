import StatCard from "../components/StatCard";
import BtcPriceChart from "../components/BtcPriceChart";
import VolumePieChart from "../components/VolumePieChart";
import TopCoinsChart from "../components/TopCoinsChart";
import TopMovers from "../components/TopMovers";
import { useSelector } from "react-redux";
import { selectMarketCoins, selectMarketStatus } from "../features/marketSlice";
import { selectPriceHistoryStatus } from "../features/priceHistorySlice";
import ChartSkeleton from "../components/ChartSkeleton";
import { selectTopCoinsStatus } from "../features/topCoinsSlice";
import CardSkeleton from "../components/CardSkeleton";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const coins = useSelector(selectMarketCoins);
  const marketStatus = useSelector(selectMarketStatus);
  const btcStatus = useSelector(selectPriceHistoryStatus);
  const topCoinsStatus = useSelector(selectTopCoinsStatus);

  return (
    <div className="flex flex-col flex-1 min-h-0 p-4 gap-4">
      <Navbar title={"Crypto Dashboard"}/>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketStatus === "loading" || marketStatus === "failed"
    ? Array(4)
        .fill(0)
        .map((_, i) => <CardSkeleton key={i}/>)
    : coins?.slice(0, 4)?.map((coin) => (
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
      <div className="grid grid-cols-4 gap-4 min-h-[300px]z">
        <div className="col-span-2 bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {btcStatus === "loading" || btcStatus === "failed" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">Bitcoin Price</h2>
              <BtcPriceChart/>
            </div>
          )}
        </div>
        <div className="  bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {topCoinsStatus === "loading" || topCoinsStatus === "failed" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">
                Top Coins by Volume
              </h2>
              <VolumePieChart />
            </div>
          )}
        </div>
        <div className="">
          <TopMovers />
        </div>
      </div>
      <div className="flex-1 min-h-0 w-[75%] bg-white rounded-xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col">
        {topCoinsStatus === "loading" || topCoinsStatus === "failed"?( <ChartSkeleton className={"h-full"} />):(
          <div className="flex flex-col flex-1 p-4"><h2 className="text-lg font-semibold mb-4">Top coins</h2>
        <div className="flex-1 min-h-0">
          <TopCoinsChart/>
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
