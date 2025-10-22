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
import NewsCardSkeleton from "../components/NewsCardSkeleton";
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
    <div className="flex flex-col p-2 md:p-4 h-[100dvh] gap-3 lg:gap-4">
      <header>
        <Navbar
          title="News"
          subHeader={"Latest Crypto News.."}
          showLiveStatus={false}
        />
      </header>
      <div className="flex-1 flex flex-col-reverse lg:grid lg:grid-cols-4 gap-3 lg:gap-4 overflow-auto">
        <div className="lg:col-span-3 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 overflow-y-auto hide-scrollbar">
          {articles
            ? articles.map((article) => (
                <NewsCard key={article.article_id} article={article} />
              ))
            : Array(10)
                .fill(0)
                .map((_, i) => <NewsCardSkeleton key={i} className={"h-[400px]"}/>)}
        </div>
        {articles && <NewsSidebar />}
      </div>
    </div>
  );
};

export default NewsPage;
