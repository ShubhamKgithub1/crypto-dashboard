import StatCard from "../components/StatCard";
import BtcPriceChart from "../components/BtcPriceChart";
import VolumePieChart from "../components/VolumePieChart";
import TopCoinsChart from "../components/TopCoinsChart";
import TopMovers from "../components/TopMovers";
import { useSelector } from "react-redux";
import { selectCoinsHistoryStatus } from "../features/historySlice";
import ChartSkeleton from "../components/ChartSkeleton";
import CardSkeleton from "../components/CardSkeleton";
import Navbar from "../components/Navbar";
import { selectSnapshotStatus, selectMarketsSnapshot } from "../features/snapshotSelectors";
import { selectTopCoinsOverall } from "../features/snapshotSelectors";

const Dashboard = () => {
  const coins = useSelector(selectMarketsSnapshot);
  const marketStatus = useSelector(selectSnapshotStatus);
  const btcStatus = useSelector(selectCoinsHistoryStatus);
  const topCoinsOverall = useSelector(selectTopCoinsOverall);

  return (
    <div className="flex flex-col flex-1 min-h-0 p-4 gap-6">
      <Navbar title={"Crypto Dashboard"} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {marketStatus === "loading" || marketStatus === "failed"
          ? Array(4)
              .fill(0)
              .map((_, i) => <CardSkeleton key={i} />)
          : coins
              ?.slice(0, 4)
              ?.map((coin) => (
                <StatCard
                  key={coin.id}
                  name={coin.name}
                  price={`$${coin.current_price.toLocaleString()}`}
                  change={`${coin.price_change_percentage_24h.toFixed(2)}%`}
                  changeType={
                    coin.price_change_percentage_24h >= 0
                      ? "positive"
                      : "negative"
                  }
                />
              ))}
      </div>
      <div className="grid grid-cols-4 gap-6 min-h-[300px]">
        <div className="col-span-2 bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {btcStatus === "loading" ||
          btcStatus === "idle" ||
          btcStatus === "failed" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">Bitcoin Price</h2>
              <BtcPriceChart />
            </div>
          )}
        </div>
        <div className="  bg-white rounded-xl shadow-md transition hover:shadow-lg">
          {marketStatus === "loading" || marketStatus === "failed" ? (
            <ChartSkeleton className={"h-full"} />
          ) : (
            <div className="flex flex-col h-full p-4">
              <h2 className="text-lg font-semibold mb-4">
                Top Coins by Volume
              </h2>
              <VolumePieChart data={topCoinsOverall}/>
            </div>
          )}
        </div>
        <div className="">
          <TopMovers status={marketStatus}/>
        </div>
      </div>
      <div className="flex-1 min-h-0 w-[75%] bg-white rounded-xl shadow-md transition hover:shadow-lg flex flex-col">
        {marketStatus === "loading" || marketStatus === "failed" ? (
          <ChartSkeleton className={"h-full"} />
        ) : (
          <div className="flex flex-col flex-1 p-4">
            <h2 className="text-lg font-semibold mb-4">Top coins</h2>
            <div className="flex-1 min-h-0">
              <TopCoinsChart
                data={topCoinsOverall}
                dataKey="market_cap"
                title="Market Cap"
                formatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
