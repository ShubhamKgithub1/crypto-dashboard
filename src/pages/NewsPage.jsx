import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import {
  selectNewsData,
  selectNewsState,
  fetchNewsData,
  selectCategory,
} from "../features/newsSlice";
import { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import CardSkeleton from "../components/CardSkeleton";
import NewsSidebar from "../components/NewsSidebar";
const NewsPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectNewsState);
  const articles = useSelector(selectNewsData);
  const category = useSelector(selectCategory);
  useEffect(() => {
    if (status === "idle" || category) {
      dispatch(fetchNewsData(category));
    }
  }, [dispatch, category]);
  return (
    <div className="flex flex-col p-4 h-[100dvh] gap-4">
      <header>
        <Navbar
          title="News"
          subHeader={"Latest Crypto News.."}
          showLiveStatus={false}
        />
      </header>
      <div className="flex-1 grid grid-cols-4 gap-4 overflow-auto">
        <div className="col-span-3 flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
          {articles
            ? articles.map((article) => (
                <NewsCard key={article.article_id} article={article} />
              ))
            : Array(10)
                .fill(0)
                .map((_, i) => <CardSkeleton key={i} />)}
        </div>
        {articles && <NewsSidebar />}
      </div>
    </div>
  );
};

export default NewsPage;
