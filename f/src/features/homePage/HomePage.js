import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Styles from "./HomePage.module.css";
import HomePageHeader from "./HomePageHeader";
import AnimeList from "./AnimeList";
import Slider from "./Slider";

function HomePage() {
  const params = useParams();
  const [query, setQuery] = useState("all");
  const [topQuery, setTopQuery] = useState("day");
  const queryHandle = (type) => {
    setQuery(type);
  };
  const topQueryHandle = (type) => {
    setTopQuery(type);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    document.title = "AnimeLove";
  }, [params]);
  return (
    <div className={Styles.homePage_container}>
      <Slider />
      <HomePageHeader
        query={query}
        title="Mới cập nhật"
        items={[
          { name: "Tất cả", type: "all" },
          { name: "Anime bộ", type: "tv/series" },
          { name: "Phim lẻ", type: "movie/ova" },
        ]}
        onChange={queryHandle}
      />
      <AnimeList query={query} />
      <HomePageHeader title="Sắp chiếu" />
      <AnimeList query="upComming" />
      <HomePageHeader
        query={topQuery}
        title="Đề cử"
        items={[
          { name: "Xem nhiều hôm nay", type: "day" },
          { name: "Xem nhiều trong tuần", type: "week" },
          { name: "Xem nhiều trong tháng", type: "month" },
        ]}
        onChange={topQueryHandle}
      />
      <AnimeList query={topQuery} />
    </div>
  );
}

export default HomePage;
