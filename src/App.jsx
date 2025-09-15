import "./App.css";
import Sidebar from "./components/sidebar";
import StatCard from "./components/StatCards";
import PriceChart from "./components/pricechart";
import VolumeChart from "./components/VolumeChart";
import TopCoinsTable from "./components/TopCoinsTable";

function App() {
  return (
    <div className="flex bg-slate-200 h-[100dvh]">
      <Sidebar />
      <main className="p-6 flex-1 min-w-0 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            name="Bitcoin"
            price="$43,250"
            change="+2.5%"
            changeType="positive"
          />
          <StatCard
            name="Ethereum"
            price="$2,950"
            change="-1.2%"
            changeType="negative"
          />
          <StatCard
            name="Dogecoin"
            price="$0.074"
            change="+0.8%"
            changeType="positive"
          />
        </div>
        <div className="flex gap-6">
          <div className="flex-[2] flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Bitcoin Price (Demo)</h2>
            <PriceChart />
          </div>
          <div className="flex-[1] flex flex-col justify-between items-center bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Top Coins by Volume (Demo)
            </h2>
            <VolumeChart />
          </div>
        </div>
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Top coins table</h2>
          <div className="flex-1 min-h-0">
            <TopCoinsTable />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
