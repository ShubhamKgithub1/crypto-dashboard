import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setCategory } from "../features/newsSlice";

const NewsSidebar = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectCategory);
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

  return (
    <div className="h-fit w-full flex flex-col gap-4 bg-white shadow-md rounded-lg p-4 animate-fadeIn">
      <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setCategory(cat))}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 shadow-md"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsSidebar;
