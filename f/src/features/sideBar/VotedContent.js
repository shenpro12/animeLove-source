import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClockRotateLeft,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
function VotedContent({ query }) {
  const animeList = useSelector(selectAnimeList).animeList;
  const [dataRender, setDataRender] = useState(() => {
    let temp = [];
    queryData(queryData(dataFormat(animeList), query), "week").map(
      (item, index) => {
        if (index <= 4) {
          temp.push(item);
        }
      }
    );
    return temp;
  });
  useEffect(() => {
    setDataRender(() => {
      let temp = [];
      queryData(queryData(dataFormat(animeList), query), "week").map(
        (item, index) => {
          if (index <= 4) {
            temp.push(item);
          }
        }
      );
      return temp;
    });
  }, [query]);
  return (
    <div className="w-full">
      {dataRender.length
        ? dataRender.map((item, index) => {
            if (index <= 4) {
              return (
                <div key={item._id} className="flex py-3 px-1">
                  <div className="overflow-hidden w-12 h-16">
                    <div className="absolute bg-lime-500">
                      <h1 className="text-black text-xs font-mono font-bold p-1">
                        #{index + 1}
                      </h1>
                    </div>
                    <Link
                      to={`/anime/${
                        item.name.jp || item.name.en || item.name.vn
                      }-${item._id}`}
                    >
                      <img
                        src={item.thumb_url}
                        className="w-full h-full object-cover rounded-sm"
                        alt="post"
                      />
                    </Link>
                  </div>
                  <div className="py-1 px-2 flex-1">
                    <Link
                      to={`/anime/${
                        item.name.jp || item.name.en || item.name.vn
                      }-${item._id}`}
                    >
                      <h1 className="text-medium text-base hover:text-lime-400 duration-200">
                        {item.name.jp || item.name.en || item.name.vn}
                      </h1>
                    </Link>
                    <div className="flex">
                      <div className="mx-1 flex items-center text-white/50 mt-1">
                        <FontAwesomeIcon
                          className="text-xs"
                          icon={faCalendarDays}
                        />
                        <h1 className="mx-1 font-medium">
                          {item.total_episode.length}/{item.total_ep}
                        </h1>
                      </div>
                      <div className="mx-1 flex items-center text-white/50 mt-1">
                        <FontAwesomeIcon
                          className="text-xs"
                          icon={faClockRotateLeft}
                        />
                        <h1 className="mx-1 font-medium">
                          {item.release_year}{" "}
                        </h1>
                      </div>
                      <div className="mx-1 flex items-center text-white/50 mt-1">
                        <FontAwesomeIcon className="text-xs" icon={faEye} />
                        <h1 className="mx-1 font-medium">
                          {item.views.week.total}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        : ""}
    </div>
  );
}
export default VotedContent;
