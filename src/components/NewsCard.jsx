import { Calendar } from "lucide-react";
import { formatDateTime } from "../utils/FormatDateTime";
import { useDispatch } from "react-redux";
import { openNewsModal } from "../features/newsModalSlice";

const NewsCard = ({ article }) => {
  const dispatch = useDispatch();
  const { title, description, pubDate, image_url, source_url, source_id } = article;
  return (
    <div className="flex flex-col gap-0 h-fit bg-white dark:bg-card-dark rounded-md shadow-sm hover:shadow-lg transition-all cursor-pointer animate-fadeIn" onClick={()=>dispatch(openNewsModal(article))}>
      <div className="flex aspect-video min-h-[60%] max-h-[60%] rounded-t-md overflow-hidden bg-gray-300 dark:bg-slate-800">
        {image_url ? <img src={image_url} className="aspect-video animate-fadeIn" />: <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300 font-semibold text-sm">
            No Image
          </div>}
      </div>
      <div className="flex flex-1 min-h-0 flex-col gap-1 p-3 lg:p-4">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
          <span>
            <Calendar size={12}/>
          </span>
          <span className="text-xs font-semibold">
            {formatDateTime(pubDate)}
          </span>
        </div>
        <h1 className="lg:text-xl text-gray-700 dark:text-text-dark font-semibold">{title}</h1>
          {description && <p className={`text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed`}>
            {description.length > 150 ? description.slice(0, 150) + "...":description}
          </p>}
        <div>
          <span className="text-xs lg:text-sm text-gray-600 dark:text-text-dark font-semibold">Source : </span>
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
