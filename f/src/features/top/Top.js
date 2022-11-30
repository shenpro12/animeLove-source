import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./Top.module.css";
import Header from "./Header";
import VotedAnimeList from "./VotedAnimeList";
function Top() {
  const [query, setQuery] = useState("day");
  const headerSelectHandle = (type) => {
    setQuery(type);
  };
  useEffect(() => {
    document.title = `Bảng xếp hạng | ${query}`;
  });
  return (
    <div className={Styles.topPage_container}>
      <h1 className="mb-4 text-sm font-medium">
        <FontAwesomeIcon icon={faHouse} className="mr-1" />
        <Link to={"/"} className="hover:text-lime-400">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to={"/voted"} className="hover:text-lime-400">
          Bảng xếp hạng
        </Link>
      </h1>
      <Header onChoose={headerSelectHandle} active={query} />
      <h1 className="font-mono text-3xl p-2 text-lime-500 font-medium uppercase mt-3 mb-3">
        Bảng xếp hạng Anime xem nhiều trong {query === "day" && "Ngày"}
        {query === "week" && "Tuần"}
        {query === "month" && "Tháng"}
      </h1>
      <VotedAnimeList query={query} />
    </div>
  );
}

export default Top;
