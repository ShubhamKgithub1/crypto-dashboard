import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "../features/newsSlice";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const NewsSidebar = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectCategory);
  const [isExpanded, setIsExpanded] = useState(false);
  const categories = [
    "crypto",
    "business",
    "technology",
    "politics",
    "science",
    "world",
    "environment",
    "sports",
  ];
  const Icon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="h-fit w-full flex flex-col bg-white dark:bg-card-dark shadow-md rounded-md lg:rounded-lg p-2 lg:p-3 animate-fadeIn">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <h2 className="text-sm lg:text-lg font-semibold text-gray-700 dark:text-text-dark">
          Categories
        </h2>
        <Icon className="size-4 lg:size-5"/>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}>
        <div
          className={`flex flex-wrap py-2 lg:py-3 gap-3 lg:gap-4`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 shadow-sm lg:shadow-md"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
