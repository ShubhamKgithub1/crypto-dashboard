import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { selectGlobalStats } from "../features/marketSlice";
import StatCard from "../components/StatCard";
import { formatNumber } from "../utils/formatNumber";
import MarketCapTrendChart from "../components/MarketCapTrendChart";
import MarketDominanceChart from "../components/MarketDominanceChart";
import SparklineCard from "../components/SparklineCard";
import { selectCoinsHistory } from "../features/historySlice";
import TopCoinsChart from "../components/TopCoinsChart";
import { selectTopCoinsDaily } from "../features/snapshotSelectors";

const Analytics = () => {
  const globalStats = useSelector(selectGlobalStats);
  const coinsHistory = useSelector(selectCoinsHistory);
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
    { name: "Active Markets", price: formatNumber(globalStats.markets) },
  ];
  return (
    <div className="flex-1 flex flex-col p-4 gap-6">
      <header>
        <Navbar title="Analytics" showLiveStatus={true}/>
        <p className="text-gray-500">Detailed crypto insights and trends</p>
      </header>
      <div className="grid grid-cols-4 gap-6">
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
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left Column */}
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Top Coins in 24h by Volume</h2>
          <TopCoinsChart
            data={topCoins24h}
            dataKey="total_volume"
            title="Volume"
            formatter={(value) => `$${(value / 1e9).toFixed(2)}B`}
          />
        </div>

        {/* Right Column */}
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Global Market Cap</h2>
          <MarketCapTrendChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 min-h-[100px] grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col col-span-3">
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
