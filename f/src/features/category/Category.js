import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState, useLayoutEffect, useEffect } from "react";
import Styles from "./Category.module.css";
import AnimePaging from "../animePaging/AnimePaging";
import FilterOption from "./FilterOption";
function Category() {
  const params = useParams();
  const [filter, setFilter] = useState(false);
  const [categoryQuery, setCategoryQuery] = useState(params.type.split("+"));
  const [yearQuery, setYearQuery] = useState(false);
  useLayoutEffect(() => {
    setCategoryQuery(params.type.split("+"));
  }, [params]);
  useEffect(() => {
    document.title = `Thể loại | ${categoryQuery.map((i) => `${i} `)}`;
  });
  function transformParams() {
    if (params.type.includes("name=")) {
      return params.type.replace(/name=/g, "");
    } else {
      return params.type;
    }
  }
  return (
    <div className={`${Styles.category_container} flex-1 mb-5`}>
      <h1 className="mb-4 text-sm font-medium">
        <FontAwesomeIcon icon={faHouse} className="mr-1" />
        <Link to={"/"} className="hover:text-lime-400">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to={"/"} className="hover:text-lime-400">
          Thể loại
        </Link>{" "}
        /{" "}
        <Link className="hover:text-lime-400" to={`/category/${params.type}`}>
          {transformParams()}
        </Link>
      </h1>
      <div className="flex">
        <h1 className="flex-1 uppercase px-3 font-bold py-3 bg-lime-500 rounded -mr-15 text-black font-mono text-lg">
          Danh sách Anime{" "}
          {params.type.includes("name=")
            ? "có tên khớp với từ khóa"
            : "thuộc thể loại"}
          :{" "}
          {params.type.split("+").map((item, index) => {
            if (index === 0) {
              return item.replace(/name=/g, "");
            } else {
              return ` + ${item.replace(/name=/g, "")}`;
            }
          })}
        </h1>
        <div className="flex items-end">
          <h1
            className="py-2 px-4 text-xs -mr-15 bg-white text-neutral-700 rounded font-medium hover:cursor-pointer"
            onClick={() => setFilter(!filter)}
          >
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
          yearQuery={yearQuery}
          onChoose={(year) => {
            setFilter(false);
            setYearQuery(year);
          }}
        />
      )}
      <AnimePaging year={yearQuery} />
    </div>
  );
}
export default Category;
