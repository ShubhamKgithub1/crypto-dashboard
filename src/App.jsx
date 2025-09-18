import "./App.css";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCards";
import BtcPriceChart from "./components/BtcPriceChart";
import VolumeChart from "./components/VolumeChart";
import TopCoinsTable from "./components/TopCoinsTable";
import TopMovers from "./components/TopMovers";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketData, selectMarketCoins } from "./features/marketSlice";
import { fetchTopCoinsData } from "./features/topCoinsSlice";
import { fetchPriceHistoryData } from "./features/priceHistorySlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const coins = useSelector(selectMarketCoins);

  useEffect(() => {
    dispatch(fetchMarketData());
    dispatch(fetchTopCoinsData());
    dispatch(fetchPriceHistoryData());
  }, [dispatch]);

  return (
    <div className="flex bg-slate-200 h-[100dvh]">
      <Sidebar />
      <main className="p-6 flex-1 min-w-0 flex flex-col gap-6">
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
        <div className="flex gap-6">
          <div className="flex-[1.5] flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Bitcoin Price</h2>
            <BtcPriceChart />
          </div>
          <div className="flex-[0.8] flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Top Coins by Volume</h2>
            <VolumeChart />
          </div>
          <div className="flex-[0.8]">
            <TopMovers />
          </div>
        </div>
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Top coins</h2>
          <div className="flex-1 min-h-0">
            <TopCoinsTable />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
