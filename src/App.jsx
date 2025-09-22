import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMarketData } from "./features/marketSlice";
import { fetchTopCoinsData } from "./features/topCoinsSlice";
import { fetchPriceHistoryData } from "./features/priceHistorySlice";
import { fetchMoversData } from "./features/moversSlice";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketData());
    dispatch(fetchTopCoinsData());
    dispatch(fetchPriceHistoryData());
    dispatch(fetchMoversData());

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
        {/* <Navbar/> */}
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
