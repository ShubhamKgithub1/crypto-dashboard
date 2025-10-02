import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGlobalData } from "./features/marketSlice";
// import { fetchTopCoinsOverall, fetchTopCoinsDaily } from "./features/topCoinsSlice";
import { fetchPriceHistoryData } from "./features/historySlice";
// import { fetchMoversData } from "./features/moversSlice";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import { fetchMarketsSnapshot } from "./features/marketsSnapshotSlice";
import NewsPage from "./pages/NewsPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketsSnapshot());
    dispatch(fetchPriceHistoryData());
    dispatch(fetchGlobalData());

    //  const interval = setInterval(() => {
    //   // dispatch(fetchMarketData());
    //   dispatch(fetchTopCoinsData());
    //   dispatch(fetchPriceHistoryData());
    //   dispatch(fetchMoversData());
    //   console.log("refreshed..");
    // }, 60000);

    // return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <div className="flex h-[100dvh]">
      <Sidebar/>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-200">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/layers" element={<Analytics/>} />
            <Route path="/news" element={<NewsPage/>} />
          </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
