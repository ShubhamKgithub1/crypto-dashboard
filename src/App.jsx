import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import NewsPage from "./pages/NewsPage";
import Modal from "./components/Modal";
import NewsModal from "./components/NewsModal";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const themeMode = useSelector((state)=>state.theme.mode);
  useEffect(()=>{
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    };
  },[themeMode]);

  return (
    <Router>
      <div className="flex h-[100dvh] bg-slate-200 text-slate-700 dark:text-text-dark">
      <Sidebar/>
      <main className="flex-1 flex flex-col h-[100dvh] min-w-0 overflow-auto overflow-x-hidden lg:overflow-hidden  dark:bg-[#0D1117] transition-all duration-200 hide-scrollbar">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/news" element={<NewsPage/>} />
          </Routes>
      </main>
      <Modal/>
      <NewsModal/>
    </div>
    </Router>
  );
}

export default App;
