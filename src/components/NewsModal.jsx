import { useDispatch, useSelector } from "react-redux";
import { selectNewsModalState } from "../features/newsModalSlice";
import { closeNewsModal } from "../features/newsModalSlice";
import { Calendar, X } from "lucide-react";
import { formatDateTime } from "../utils/FormatDateTime";

const NewsModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedArticle } = useSelector(selectNewsModalState);

  if (!isOpen) return null;

  const { title, description, image_url, pubDate, source_url, source_id } =
    selectedArticle;

  const handleBackdropClick = (e) => {
    if (e.target.id === "newsModalBackdrop") dispatch(closeNewsModal());
  };

  return (
    <div
      id="newsModalBackdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="flex flex-col bg-white w-[90%] max-w-2xl rounded-xl overflow-auto hide-scrollbar shadow-lg relative animate-fadeIn">
        <button
          onClick={() => dispatch(closeNewsModal())}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <div className="min-h-[30dvh] h-[35dvh] overflow-hidden w-full bg-slate-200">
          {image_url && (
          <img
            src={image_url}
            className="w-full object-center max-h-[40dvh]"
          />
        )}
        </div>

        <div className="flex-1 flex flex-col p-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={14} />
            <span>{formatDateTime(pubDate)}</span>
          </div>

          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            {description.length>300? description.slice(0,300)+"...":description || "No description available."}
          </p>

          {source_url && (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              🔗 Read Full Article on{" "}
              {source_id || new URL(source_url).hostname.replace("www.", "")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
