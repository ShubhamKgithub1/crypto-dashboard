import StatCard from "../components/StatCard";
import BtcPriceChart from "../components/BtcPriceChart";
import VolumePieChart from "../components/VolumePieChart";
import TopCoinsChart from "../components/TopCoinsChart";
import TopMovers from "../components/TopMovers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPriceHistoryData,
  selectCoinsHistoryStatus,
} from "../features/historySlice";
import Navbar from "../components/Navbar";
import {
  selectSnapshotStatus,
  selectMarketsSnapshot,
} from "../features/snapshotSelectors";
import { selectTopCoinsOverall } from "../features/snapshotSelectors";
import DashboardShimmer from "./DashboardShimmer";
import { fetchMarketsSnapshot } from "../features/marketsSnapshotSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const coins = useSelector(selectMarketsSnapshot);
  const marketStatus = useSelector(selectSnapshotStatus);
  const historyStatus = useSelector(selectCoinsHistoryStatus);
  const topCoinsOverall = useSelector(selectTopCoinsOverall);
  const dispatch = useDispatch();

  useEffect(() => {
    if (marketStatus === "idle") {
      dispatch(fetchMarketsSnapshot());
    }
    if (historyStatus === "idle") {
      dispatch(fetchPriceHistoryData());
    }
  });
  if (!coins.length > 0 || historyStatus === "loading") {
    return <DashboardShimmer/>;
  }
  return (
    <div className="flex flex-col flex-1 p-2 md:p-4 gap-3 lg:gap-6">
      <Navbar title={"Crypto Dashboard"} showLiveStatus={true} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6">
        {coins?.slice(0, 4)?.map((coin) => (
          <StatCard
            key={coin.id}
            name={coin.name}
            data={coin}
            price={`$${coin.current_price.toLocaleString()}`}
            change={`${coin.price_change_percentage_24h.toFixed(2)}%`}
            changeType={
              coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
            }
          />
        ))}
      </div>
      <div className="grid lg:grid-cols-4 gap-3 lg:gap-6 lg:min-h-[300px]">
        <div className="lg:col-span-2 bg-white dark:bg-card-dark rounded-xl shadow-md transition hover:shadow-lg animate-fadeIn">
          <TopCoinsChart
            data={topCoinsOverall}
            dataKey="market_cap"
            title="Market Cap"
            header="Top Coins"
            formatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
          />
        </div>
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-md transition hover:shadow-lg animate-fadeIn">
          {
            <div className="flex flex-col h-full gap-2 lg:gap-4 p-3 lg:p-4">
              <h2 className="lg:text-lg font-semibold lg:font-bold">
                Top Coins by Volume
              </h2>
              <VolumePieChart data={topCoinsOverall} />
            </div>
          }
        </div>
        <div>
          <TopMovers status={marketStatus} />
        </div>
      </div>
      <div className="lg:flex-1 lg:min-h-0 bg-white dark:bg-card-dark rounded-xl shadow-md transition hover:shadow-lg flex flex-col animate-fadeIn">
          <BtcPriceChart/>
      </div>
    </div>
  );
};

export default Dashboard;
