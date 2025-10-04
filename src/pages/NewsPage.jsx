import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import {
  selectNewsData,
  selectNewsState,
  fetchNewsData,
} from "../features/newsSlice";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import CardSkeleton from "../components/CardSkeleton";
const NewsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const status = useSelector(selectNewsState);
  const articles = useSelector(selectNewsData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNewsData());
    }
  });
  return (
    <div className="flex flex-col p-4 h-[100dvh] gap-4">
      <header>
        <Navbar title="News" showLiveStatus={false} />
        <p className="text-gray-500">Latest Crypto News..</p>
      </header>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {articles ?
          (articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isExpanded={expandedId === article.id}
              onToggle={() =>
                setExpandedId(expandedId === article.id ? null : article.id)
              }
            />
          ))):(Array(10).fill(0).map((_,i)=><CardSkeleton key={i}/>))}
      </div>
    </div>
  );
};

export default NewsPage;
