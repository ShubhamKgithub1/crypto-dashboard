import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import NewsPage from "./pages/NewsPage";
import Modal from "./components/Modal";
import NewsModal from "./components/NewsModal";

function App() {


  return (
    <Router>
      <div className="flex h-[100dvh]">
      <Sidebar/>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-200">
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
