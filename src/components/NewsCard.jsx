import { Calendar } from "lucide-react";
import { formatDateTime } from "../utils/FormatDateTime";
import { useDispatch } from "react-redux";
import { openNewsModal } from "../features/newsModalSlice";

const NewsCard = ({ article }) => {
  const dispatch = useDispatch();
  const { title, description, pubDate, image_url, source_url, source_id } = article;
  return (
    <div className="flex w-full gap-0 bg-white dark:bg-card-dark rounded-md shadow-sm hover:shadow-lg transition-all cursor-pointer animate-fadeIn" onClick={()=>dispatch(openNewsModal(article))}>
      <div className="flex flex-1 aspect-video rounded-l-md overflow-hidden">
        {image_url ? <img src={image_url} className="aspect-video animate-fadeIn" />: <div className="w-full h-full bg-gray-300 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-300 font-semibold text-sm">
            No Image
          </div>}
      </div>
      <div className="flex flex-col gap-1 w-[75%] px-4 py-3">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
          <span>
            <Calendar size={12} className="" />
          </span>
          <span className="text-xs font-semibold">
            {formatDateTime(pubDate)}
          </span>
        </div>
        <h1 className="text-xl text-gray-700 dark:text-text-dark font-semibold">{title}</h1>
          {description && <p className={`text-sm text-gray-500 dark:text-gray-400 font-semibold`}>
            {description.length > 400 ? description.slice(0, 400) + "...":description}
          </p>}
        <div className="mt-1">
          <span className="text-sm text-gray-600 dark:text-text-dark font-semibold">Source : </span>
          {source_url ? (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 bg-blue-100 dark:bg-blue-600 dark:text-blue-100 font-semibold rounded px-1 p-[2px] hover:underline"
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
