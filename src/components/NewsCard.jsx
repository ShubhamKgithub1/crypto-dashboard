import { Calendar } from "lucide-react";
import { formatDateTime } from "../utils/FormatDateTime";
import { useDispatch } from "react-redux";
import { openNewsModal } from "../features/newsModalSlice";

const NewsCard = ({ article, isExpanded, onToggle }) => {
  const dispatch = useDispatch();
  const { title, description, pubDate, image_url, source_url, source_id } = article;
  return (
    <div className="flex w-full gap-0 bg-white rounded-md shadow-sm hover:shadow-lg transition-all cursor-pointer animate-fadeIn" onClick={()=>dispatch(openNewsModal(article))}>
      <div className="flex flex-1 aspect-video bg-gray-300 rounded-l-md overflow-hidden">
        {image_url ? <img src={image_url} className="aspect-video animate-fadeIn" />: <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>}
      </div>
      <div className="flex flex-col w-[90%] px-4 py-1">
        <div className="flex items-center gap-1">
          <span>
            <Calendar size={12} className="text-gray-500" />
          </span>
          <span className="text-xs font-semibold text-gray-500">
            {formatDateTime(pubDate)}
          </span>
        </div>
        <div className="flex justify-between cursor-pointer" onClick={onToggle}>
          <h1 className="text-xl text-gray-700 font-semibold">{title}</h1>
          <span>{isExpanded ? "▲" : "▼"}</span>
        </div>
        <div className={`transition-all duration-300 overflow-hidden`}>
          <p className={`text-sm text-gray-500 font-semibold`}>
            {description.slice(0, 150) + "..."}
          </p>
        </div>
        <div className="">
          <span className="text-sm text-gray-600 font-semibold">Source :</span>
          {source_url ? (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 bg-blue-100 font-semibold rounded px-2 py-[2px] hover:underline"
            >
              {source_id || new URL(source_url).hostname.replace("www.", "")}
            </a>
          ) : (
            <span className="text-xs text-gray-500">Unknown</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
