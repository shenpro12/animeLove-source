import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Styles from "./Library.module.css";
import Header from "./Header";
import FilterOption from "./FilterOption";
import LibraryContent from "./LibraryContent";

function Library() {
  const [query, setQuery] = useState("A");
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    document.title = `Thư viện Anime | ${query}`;
  });
  return (
    <div className={Styles.libraryPage_container}>
      <h1 className="mb-4 text-sm font-medium">
        <FontAwesomeIcon icon={faHouse} className="mr-1" />
        <Link to={"/"} className="hover:text-lime-400">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to={"/library"} className="hover:text-lime-400">
          Thư viện
        </Link>
      </h1>
      <div className="flex justify-between flex-wrap">
        <h1 className="uppercase px-2 py-2 mt-5 bg-sky-500 inline-block rounded font-mono font-bold text-lg mb-1">
          Thư viện Anime
        </h1>
        <div className="flex items-end mb-1" onClick={() => setFilter(!filter)}>
          <h1 className="py-2 px-4 text-xs bg-white text-neutral-700 rounded font-medium hover:cursor-pointer">
            <FontAwesomeIcon icon={faSort} className="mr-2" />
            Lọc Anime
          </h1>
        </div>
      </div>
      <h1 className="px-3 py-1 bg-red-500 rounded -mr-15 text-white font-mono mb-2 text-xs inline-block mt-2">
        MẸO: Sử dụng chức năng Lọc Anime trên thanh công cụ để lọc những phim
        bạn đang cần xem chính xác nhất.
      </h1>
      {filter && (
        <FilterOption
          onChoose={(data) => {
            setCategory(data);
            setFilter(false);
          }}
        />
      )}
      <Header
        query={query}
        onClick={(type) => {
          setQuery(type);
          setCategory([]);
        }}
      />
      <LibraryContent query={query} category={category} />
    </div>
  );
}

export default Library;
