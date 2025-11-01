import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  fetchGlobalData,
  selectGlobalStats,
  selectGlobalStatus,
} from "../features/marketSlice";
import StatCard from "../components/StatCard";
import { formatNumber } from "../utils/formatNumber";
import MarketCapTrendChart from "../components/MarketCapTrendChart";
import MarketDominanceChart from "../components/MarketDominanceChart";
import SparklineCard from "../components/SparklineCard";
import { fetchPriceHistoryData, selectCoinsHistory, selectCoinsHistoryStatus } from "../features/historySlice";
import TopCoinsChart from "../components/TopCoinsChart";
import { selectSnapshotStatus, selectTopCoinsDaily } from "../features/snapshotSelectors";
import { useEffect } from "react";
import AnalyticsShimmer from "./AnalyticsShimmer";
import { fetchMarketsSnapshot } from "../features/marketsSnapshotSlice";

const Analytics = () => {
  const dispatch = useDispatch();
  const marketStatus = useSelector(selectSnapshotStatus);
  const globalStats = useSelector(selectGlobalStats);
  const globalStatus = useSelector(selectGlobalStatus);
  const coinsHistory = useSelector(selectCoinsHistory);
  const historyStatus = useSelector(selectCoinsHistoryStatus);
  const topCoins24h = useSelector(selectTopCoinsDaily);
  const kpiCards = [
    {
      name: "Total Market Cap",
      price: `$${formatNumber(globalStats.totalMarketCap)}`,
    },
    { name: "24h Volume", price: `$${formatNumber(globalStats.totalVolume)}` },
    {
      name: "BTC Dominance",
      price: `${globalStats.btcDominance?.toFixed(2)}%`,
    },
    {
      name: "ETH Dominance",
      price: `${globalStats.ethDominance?.toFixed(2)}%`,
    },
    { name: "Active Markets", price: formatNumber(globalStats.markets) },
  ];

  useEffect(() => {
    if (globalStatus === "idle") {
      dispatch(fetchGlobalData());
    }
    if (historyStatus === "idle") {
          dispatch(fetchPriceHistoryData());
        }
         if (marketStatus === "idle") {
              dispatch(fetchMarketsSnapshot());
            }
  });
const isEmptyObject = (obj) =>
  !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);

if (
  isEmptyObject(coinsHistory) ||
  isEmptyObject(globalStats) ||
  !topCoins24h?.length
) {
  return <AnalyticsShimmer title="Analytics" />;
}

  return (
    <div className="flex-1 flex flex-col p-2 md:p-4 gap-3 xl:gap-6">
      <header>
        <Navbar
          title="Analytics"
          subHeader={"Detailed crypto insights and trends"}
          showLiveStatus={true}
        />
      </header>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 xl:gap-6">
        {kpiCards.map((card, id) => (
          <StatCard
            key={id}
            name={card.name}
            price={card.price}
            change={null}
            changeType={null}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6 lg:flex-1 lg:min-h-0">
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-md hover:shadow-lg transition flex animate-fadeIn">
          <TopCoinsChart
            data={topCoins24h}
            header={"Top Coins in 24h by Volume"}
            dataKey="total_volume"
            title="Volume"
            formatter={(value) => `$${(value / 1e9).toFixed(2)}B`}
          />
        </div>
        <div className="bg-white dark:bg-card-dark h-[300px] lg:h-auto p-3 lg:p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col animate-fadeIn">
          <MarketCapTrendChart />
        </div>
      </div>
      <div className="flex-1 min-h-[100px] flex flex-col-reverse lg:grid lg:grid-cols-4 gap-3 xl:gap-6">
        <div className="bg-white dark:bg-card-dark p-3 lg:p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-2 lg:gap-4 lg:col-span-3 animate-fadeIn">
          <h2 className="lg:text-lg font-semibold lg:font-bold">Market Dominance</h2>
          <MarketDominanceChart/>
        </div>
        {coinsHistory != null && (
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-1 w-full gap-3 xl:gap-6">
            <SparklineCard
              title="Bitcoin"
              history={coinsHistory.bitcoin}
              color="#f97316"
            />
            <SparklineCard
              title="Ethereum"
              history={coinsHistory.ethereum}
              color="#3b82f6"
            />
            <SparklineCard
              title="Solana"
              history={coinsHistory.solana}
              color="#00ffb9"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
