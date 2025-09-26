import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { selectGlobalStats } from "../features/marketSlice";
import StatCard from "../components/StatCard";
import { formatNumber } from "../utils/formatNumber";
import TopCoinsVolumeChart from "../components/TopCoinsVolumeChart";
import MarketCapTrendChart from "../components/MarketCapTrendChart";
import MarketDominanceChart from "../components/MarketDominanceChart";
import SparklineCard from "../components/SparklineCard";

const Analytics = () => {
  const globalStats = useSelector(selectGlobalStats);
  const mockSparkline = [
    { day: "Mon", price: 64000 },
    { day: "Tue", price: 64500 },
    { day: "Wed", price: 63800 },
    { day: "Thu", price: 65000 },
    { day: "Fri", price: 65500 },
    { day: "Sat", price: 64800 },
    { day: "Sun", price: 66000 },
  ];
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
    <div className="flex-1 flex flex-col p-4 gap-4">
      <header>
        <Navbar title="Analytics" />
        <p className="text-gray-500">Detailed crypto insights and trends</p>
      </header>
      <div className="grid grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left Column */}
        <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Top Coins in 24h</h2>
          <TopCoinsVolumeChart />
        </div>

        {/* Right Column */}
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Global Market Cap</h2>
          <MarketCapTrendChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 min-h-[100px] grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col col-span-3">
          <h2 className="text-lg font-semibold mb-4">Market Dominance</h2>
          <MarketDominanceChart />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <SparklineCard title={"btc price"} value={"$2135"} data={mockSparkline} color={"#6d28d9"}/>
          <SparklineCard title={"btc price"} value={"$2135"} data={mockSparkline} color={"#00f2fe"}/>
          <SparklineCard title={"btc price"} value={"$2135"} data={mockSparkline} color={"#f7931a"}/>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
