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
        <Navbar title="News" subHeader={"Latest Crypto News.."} showLiveStatus={false} />
      </header>
      <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar">
        {articles ?
          (articles.map((article) => (
            <NewsCard
              key={article.article_id}
              article={article}
              isExpanded={expandedId === article.article_id}
              onToggle={() =>
                setExpandedId(expandedId === article.article_id ? null : article.article_id)
              }
            />
          ))):(Array(10).fill(0).map((_,i)=><CardSkeleton key={i}/>))}
      </div>
    </div>
  );
};

export default NewsPage;
