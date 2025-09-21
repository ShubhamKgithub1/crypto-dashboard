import { ArrowLeft, ArrowRight, Layers, LayoutDashboard, Newspaper, PieChart, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
   const [isCollapsed, setIsCollapsed] = useState(false);
    
  return (
    <div className={`${isCollapsed?"min-w-16":"min-w-40"} flex flex-col items-center h-screen bg-white overflow-hidden transition-[min-width] duration-300`}>
      <button onClick={()=> setIsCollapsed(!isCollapsed)} className="m-4">{isCollapsed ? <ArrowRight size={26}/> : <ArrowLeft size={26}/> }</button>
       <nav className="flex flex-col gap-6 mt-4 w-full">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <LayoutDashboard size={28} />
          {!isCollapsed && <span className="text-sm mt-1">Dashboard</span>}
        </Link>

        <Link
          to="/analytics"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <PieChart size={28} />
          {!isCollapsed && <span className="text-sm mt-1">Analytics</span>}
        </Link>

        <Link
          to="/layers"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <Layers size={28} />
          {!isCollapsed && <span className="text-sm mt-1">Layers</span>}
        </Link>

        <Link
          to="/news"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <Newspaper size={28} />
          {!isCollapsed && <span className="text-sm mt-1">News</span>}
        </Link>

        <Link
          to="/settings"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <Settings size={28} />
          {!isCollapsed && <span className="text-sm mt-1">Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
