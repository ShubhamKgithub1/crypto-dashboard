import {
  ArrowLeft,
  ArrowRight,
  Layers,
  LayoutDashboard,
  Newspaper,
  PieChart,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`${
        isCollapsed ? "w-12 lg:w-16" : "w-24 lg:w-40"
      } flex flex-col items-center h-screen bg-slate-800 dark:bg-card-dark text-white overflow-hidden transition-all duration-200`}
    >
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="m-4">
        {isCollapsed ? <ArrowRight size={26} /> : <ArrowLeft size={26} />}
      </button>
      <nav className="flex flex-col gap-6 mt-4 w-full">
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:text-blue-500"
        >
          <LayoutDashboard size={28} />
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            Dashboard
          </span>
        </Link>

        <Link
          to="/analytics"
          className="flex flex-col items-center text-white hover:text-blue-500"
        >
          <PieChart size={28} />
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            Analytics
          </span>
        </Link>

        <Link
          to="/news"
          className="flex flex-col items-center text-white hover:text-blue-500"
        >
          <Newspaper size={28} />
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            News
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
