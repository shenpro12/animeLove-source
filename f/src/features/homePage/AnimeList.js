import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faVideo,
  faClapperboard,
  faUser,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, memo } from "react";
import Styles from "./HomePage.module.css";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
import { initStar } from "../detailPage/Rate";
function AnimeList({ query }) {
  const animeList = useSelector(selectAnimeList).animeList;
  const [renderData, setRenderData] = useState(() => {
    let temp = [];
    for (let i = 0; i <= 9; i++) {
      temp.push(queryData(dataFormat(animeList), query)[i]);
    }
    return temp.filter((i) => (i ? true : false));
  });
  useEffect(() => {
    setRenderData(() => {
      let temp = [];
      for (let i = 0; i <= 9; i++) {
        temp.push(queryData(dataFormat(animeList), query)[i]);
      }
      return temp.filter((i) => (i ? true : false));
    });
  }, [query]);
  return (
    <>
      <div className="w-full mt-5 grid gap-x-4 gap-y-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {renderData.length ? (
          renderData.map((item, index) => (
            <div
              key={index}
              className={Styles.item}
              style={{
                backgroundImage: `url(${item.thumb_url})`,
                backgroundSize: "cover",
              }}
            >
              {query === "upComming" ? (
                <div className="flex justify-center">
                  <h1 className="absolute py-2 text-xs bg-red-600 text-center top-0 px-1 rounded-b-lg font-bold">
                    Sắp chiếu
                  </h1>
                  <h1 className="absolute top-1/3 text-center w-full py-1 bg-black/60 font-medium font-mono text-3xl">
                    {item.release_year}
                  </h1>
                </div>
              ) : (
                ""
              )}
              <Link
                to={`anime/${item.name.jp || item.name.vn || item.name.en}-${
                  item._id
                }`}
              >
                <div
                  className={`${Styles.tooltip_wrap} flex justify-center items-center absolute w-full -mt-170 rounded-sm -pt-142 opacity-0 hover:opacity-100 hover:bg-black/50 hover:cursor-pointer`}
                >
                  <div
                    className={`flex relative justify-center items-center lg:w-10 lg:h-10 md:w-11 md:h-11 sm:w-13 sm:h-13 w-14 h-14 bg-transparent -mt-142 rounded-full border-2 border-white`}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    <div
                      className={`${Styles.tooltip} duration-200 flex justify-start items-center`}
                    >
                      <div className="w-3 h-3 bg-lime-300 rotate-45"></div>
                      <div className={Styles.tooltipContent}>
                        <h1 className=" font-bold uppercase text-stone-900/80">
                          {item.name.jp || item.name.vn || item.name.en}
                        </h1>
                        <div className="mt-1 flex flex-wrap">
                          <div className="flex mr-1.5">
                            <FontAwesomeIcon
                              icon={faStarHalfStroke}
                              className=" text-yellow-500 text-sm mr-1"
                            />
                            <h1 className="text-lime-500 text-sm font-semibold">
                              {initStar(item.star).ratePoint === 0
                                ? "??"
                                : initStar(item.star).ratePoint}
                            </h1>
                          </div>
                          <div className="flex mx-1.5">
                            <FontAwesomeIcon
                              icon={faClock}
                              className=" text-black/40 text-sm mr-1"
                            />
                            <h1 className="text-lime-500 text-sm font-semibold">
                              {item.total_episode.length
                                ? item.total_episode.length
                                : "??"}
                              /{item.total_ep ? item.total_ep : "??"}
                            </h1>
                          </div>
                          <div className="flex mx-1.5">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className=" text-black/40 text-sm mr-1"
                            />
                            <h1 className="text-lime-500 text-sm font-semibold">
                              {item.release_year}
                            </h1>
                          </div>
                        </div>
                        <h1
                          className={`mt-1 text-slate-500 text-sm mb-3 ${Styles.textLine}`}
                        >
                          {item.description}
                        </h1>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="mt-auto mb-auto mr-2 text-lime-400/70 text-sm"
                          />
                          <h1 className="text-black/80 text-sm truncate">
                            <span className="font-bold text-slate-500">
                              Studio:
                            </span>{" "}
                            {item.studio}
                          </h1>
                        </div>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faClapperboard}
                            className="mt-auto mb-auto mr-2 text-lime-400/70 text-sm"
                          />
                          <h1 className="text-black/80 text-sm truncate">
                            <span className="font-bold text-slate-500">
                              Thể loại:
                            </span>{" "}
                            {item.category.map((item) => `${item}, `)}
                          </h1>
                        </div>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="mt-auto mb-auto mr-2 text-lime-400/70 text-sm"
                          />
                          <h1 className="text-black/80 text-sm truncate">
                            <span className="font-bold text-slate-500">
                              Đạo diễn:
                            </span>{" "}
                            {item.director}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {query !== "upComming" ? (
                <>
                  <div
                    className={`rounded-full w-10 h-10 bg-red-700 absolute z-10 right-0 text-center flex flex-col justify-center items-center ${Styles.episode}`}
                  >
                    <h1 className={`${Styles.episodeText} uppercase mt-2`}>
                      Tập
                    </h1>
                    <h1 className="text-base font-extrabold">
                      {item.total_episode.length}
                    </h1>
                  </div>
                  <div
                    className={`rounded-3xl py-1 px-3 bg-black/60 absolute z-10 left-1 text-center flex justify-center items-center ${Styles.episode}`}
                  >
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
                      className=" text-yellow-300 text-xs mr-1"
                    />
                    <h1 className="text-yellow-300 text-xs font-semibold">
                      {initStar(item.star).ratePoint === 0
                        ? "?"
                        : initStar(item.star).ratePoint}
                    </h1>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="bg-black/80 p-1  rounded-t-lg">
                <h1 className="w-full text-center mt-1 font-medium text-sm truncate pl-2 pr-2">
                  {item.name.jp || item.name.vn || item.name.en}
                </h1>
                <h1 className="w-full text-center mt-1 font-light text-stone-300 text-xs truncate pl-2 pr-2">
                  {query !== "upComming"
                    ? `Lượt xem: ${item.views.total_view}`
                    : "-"}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy!</p>
        )}
      </div>
      <Link
        to={`${
          query === "tv/series"
            ? "/category/Anime bộ"
            : query === "movie/ova"
            ? "/category/Anime lẻ"
            : query === "upComming"
            ? "/category/Anime sắp chiếu"
            : query === "all"
            ? "/category/all"
            : "/voted"
        }`}
      >
        <div className="w-full flex justify-center hover:cursor-pointer ">
          <h1 className="bg-stone-800 uppercase w-2/4 py-2 text-center mt-5 mb-5 inline-block hover:bg-red-600 rounded text-sm">
            Xem thêm...
          </h1>
        </div>
      </Link>
    </>
  );
}

export default memo(AnimeList);
