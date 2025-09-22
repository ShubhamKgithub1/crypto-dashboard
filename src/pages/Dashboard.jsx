import StatCard from "../components/StatCards";
import BtcPriceChart from "../components/BtcPriceChart";
import VolumeChart from "../components/VolumeChart";
import TopCoinsTable from "../components/TopCoinsTable";
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {marketStatus === "loading"
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
      <div className="grid grid-cols-4 gap-6 min-h-[250px]">
        <div className="col-span-2 bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {btcStatus === "loading" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">Bitcoin Price</h2>
              <BtcPriceChart />
            </div>
          )}
        </div>
        <div className="  bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {topCoinsStatus === "loading" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">
                Top Coins by Volume
              </h2>
              <VolumeChart />
            </div>
          )}
        </div>
        <div className="">
          <TopMovers />
        </div>
      </div>
      <div className="flex-1 min-h-0 bg-white rounded-xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col">
        {topCoinsStatus === "loading"?( <ChartSkeleton className={"h-full"} />):(
          <div className="flex flex-col flex-1 p-4"><h2 className="text-lg font-semibold mb-4">Top coins</h2>
        <div className="flex-1 min-h-0">
          <TopCoinsTable />
        </div></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
