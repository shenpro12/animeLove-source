import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Styles from "./Category.module.css";
const categoryData = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Harem",
  "School",
  "Shoujo",
  "Romance",
  "Samurai",
  "Music",
  "Mecha",
  "Yuri",
  "Yaoi",
  "Shounen",
  "LiveAction",
  "Game",
  "Isekai",
  "Magic",
];
const typeData = ["Anime bộ", "Anime lẻ", "Anime sắp chiếu"];
const yearData = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];
function FilterOption({ yearQuery, onChoose }) {
  const params = useParams();
  const [category, setCategory] = useState(
    params.type.split("+").filter((i) => (i === "all" ? false : true))
  );
  //console.log(category);
  const [year, setYear] = useState(yearQuery);
  //console.log(year);
  function getLink() {
    let link = "/category/";
    let slug = "";
    category.map((item, index) => {
      if (index === 0 && item && item.indexOf("name=") === -1) {
        slug += item;
      } else if (item && item.indexOf("name=") === -1) {
        slug += `+${item}`;
      }
    });
    if (slug[0] === "+") {
      slug = slug.replace("+", "");
    }
    if (!slug) {
      slug = "all";
    }
    return link + slug;
  }
  useEffect(() => {
    setCategory(
      params.type.split("+").filter((i) => (i === "all" ? false : true))
    );
  }, [params]);
  return (
    <div className={`bg-white -mr-15 p-3 ${Styles.filter_container}`}>
      <div>
        <h1 className="text-sky-500 font-medium">Loại</h1>
        <div className="flex flex-wrap py-2">
          <div className="flex items-center px-3 py-2">
            <input
              type={"radio"}
              className="hover:cursor-pointer"
              checked={
                !category.includes("Anime bộ") &&
                !category.includes("Anime lẻ") &&
                !category.includes("Anime sắp chiếu")
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory([
                    ...category.filter((i) =>
                      i === "Anime bộ" ||
                      i === "Anime lẻ" ||
                      i === "Anime sắp chiếu"
                        ? false
                        : true
                    ),
                  ]);
                }
              }}
            />
            <h1 className="text-black ml-2 text-sm">Tất cả</h1>
          </div>
          {typeData.map((item, index) => (
            <div key={index} className="flex items-center px-3 py-2">
              <input
                type={"radio"}
                className="hover:cursor-pointer"
                checked={category.includes(item)}
                onChange={(e) => {
                  if (e.target.checked && !category.includes(item)) {
                    setCategory([
                      ...category.filter((i) =>
                        i === "Anime bộ" ||
                        i === "Anime lẻ" ||
                        i === "Anime sắp chiếu"
                          ? false
                          : true
                      ),
                      item,
                    ]);
                  }
                }}
              />
              <h1 className="text-black ml-2 text-sm">{item}</h1>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-sky-500 font-medium">Thể loại</h1>
        <div className="flex flex-wrap py-2">
          {categoryData.map((item, index) => {
            return (
              <div key={index} className="flex items-center px-3 py-2">
                <input
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  checked={category.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked && !category.includes(item)) {
                      setCategory([...category, item]);
                    } else {
                      setCategory(
                        category.filter((i) => (i === item ? false : true))
                      );
                    }
                  }}
                />
                <h1 className="text-black ml-2 text-sm">{item}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-sky-500 font-medium">Năm phát hành</h1>
        <div className="flex flex-wrap py-2">
          <div className="flex items-center px-3 py-2">
            <input
              type={"radio"}
              className="hover:cursor-pointer"
              checked={year === false}
              onChange={(e) => {
                setYear(false);
              }}
            />
            <h1 className="text-black ml-2 text-sm">Tất cả</h1>
          </div>
          {yearData.map((item, index) => {
            return (
              <div key={index} className="flex items-center px-3 py-2">
                <input
                  type={"radio"}
                  className="hover:cursor-pointer"
                  checked={year === item}
                  onChange={() => {
                    setYear(item);
                  }}
                />
                <h1 className="text-black ml-2 text-sm">{item}</h1>
              </div>
            );
          })}
          <div className="flex items-center px-3 py-2">
            <input
              type={"radio"}
              className="hover:cursor-pointer"
              checked={year === "old"}
              onChange={() => {
                setYear("old");
              }}
            />
            <h1 className="text-black ml-2 text-sm">Cũ hơn</h1>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Link
          to={getLink()}
          onClick={() => {
            onChoose(year);
          }}
        >
          <h1 className="bg-red-600 text-sm font-mono font-medium py-2 px-3 rounded hover:cursor-pointer">
            Lọc Anime
          </h1>
        </Link>
      </div>
    </div>
  );
}
export default FilterOption;
