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
    <div className="flex-1 flex flex-col p-4 gap-6">
      <header>
        <Navbar
          title="Analytics"
          subHeader={"Detailed crypto insights and trends"}
          showLiveStatus={true}
        />
      </header>
      <div className="grid grid-cols-5 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition flex animate-fadeIn">
          <TopCoinsChart
            data={topCoins24h}
            header={"Top Coins in 24h by Volume"}
            dataKey="total_volume"
            title="Volume"
            formatter={(value) => `$${(value / 1e9).toFixed(2)}B`}
          />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col animate-fadeIn">
          <MarketCapTrendChart />
        </div>
      </div>
      <div className="flex-1 min-h-[100px] grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col col-span-3 animate-fadeIn">
          <h2 className="text-lg font-semibold mb-4">Market Dominance</h2>
          <MarketDominanceChart />
        </div>
        {coinsHistory != null && (
          <div className="flex-1 flex flex-col gap-6">
            <SparklineCard
              title="Bitcoin"
              history={coinsHistory.bitcoin}
              color="#f7931a"
            />
            <SparklineCard
              title="Ethereum"
              history={coinsHistory.ethereum}
              color="#3c3c3d"
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
