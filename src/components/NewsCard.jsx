import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";

const NewsCard = ({ article, isExpanded, onToggle }) => {
  const { title, description, published_at } = article;
  const contentRef = useRef(null);
  return (
    <div className="flex flex-col p-4 bg-white rounded-md shadow-sm hover:shadow-lg transition-all cursor-pointer">
      <div className="flex justify-between cursor-pointer" onClick={onToggle}>
        <h3 className="font-semibold">{title}</h3>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>
      <div
      ref={contentRef}
      style={{ maxHeight: isExpanded ? contentRef.current?.scrollHeight : 0,}}
        className={`transition-all duration-300 overflow-hidden`}
      >
        <p className={`text-sm text-gray-500 font-semibold`}>{description}</p>
      </div>
      <div>
        <span className="text-sm text-gray-800 font-semibold">Published: </span>
        <span className="text-sm text-gray-600">
          {formatDistanceToNow(new Date(published_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
