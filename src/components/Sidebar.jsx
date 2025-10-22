import {
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  Newspaper,
  PieChart,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`${
        isCollapsed ? "w-10 md:w-16" : "w-20 md:w-40"
      } flex flex-col items-center h-screen bg-slate-800 dark:bg-card-dark text-white overflow-hidden transition-all duration-200`}
    >
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="m-4">
        {isCollapsed ? <ArrowRight className="lg:size-7"/> : <ArrowLeft className="lg:size-7" />}
      </button>
      <nav className="flex flex-col gap-4 lg:gap-6 mt-3 lg:mt-4 w-full">
        <NavLink
          to="/"
          className={({isActive})=>`flex flex-col items-center hover:text-blue-500 ${isActive ? "text-blue-500" : "text-white"}`}
        >
          <LayoutDashboard className="md:size-7" />
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({isActive})=>`flex flex-col items-center hover:text-blue-500 ${isActive ? "text-blue-500" : "text-white"}`}
        >
          <PieChart className="md:size-7"/>
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            Analytics
          </span>
        </NavLink>

        <NavLink
          to="/news"
          className={({isActive})=>`flex flex-col items-center hover:text-blue-500 ${isActive ? "text-blue-500" : "text-white"}`}
        >
          <Newspaper className="md:size-7"/>
          <span
            className={`text-sm mt-1 transition-all duration-200 ${
              isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
            News
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
