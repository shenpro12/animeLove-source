import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
function VotedAnimeList({ query }) {
  const animeList = useSelector(selectAnimeList).animeList;
  const [dataRender, setDataRender] = useState(
    queryData(dataFormat(animeList), query)
  );
  useEffect(() => {
    setDataRender(queryData(dataFormat(animeList), query));
    window.scrollTo({
      top: document.getElementById("votedHeader").offsetTop - 10,
      left: 0,
      behavior: "smooth",
    });
  }, [query]);
  return (
    <div className="w-full bg-zinc-900 rounded-sm">
      {dataRender.length
        ? dataRender.map((item, index) => {
            if (index === 0) {
              return (
                <div
                  key={item._id}
                  className="w-full h-56 bg-slate-300 flex items-center relative"
                  style={{
                    backgroundImage: `url(${item.background_url})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 z-0"></div>
                  <div className="mx-2 p-2 flex justify-center items-center z-10">
                    <h1 className="text-5xl font-bold font-mono text-red-500">
                      {index + 1}
                    </h1>
                  </div>
                  <Link
                    to={`/anime/${
                      item.name.jp || item.name.en || item.name.vn
                    }-${item._id}`}
                    className="z-10"
                  >
                    <div className="w-24 h-34 overflow-hidden rounded">
                      <img
                        src={item.thumb_url}
                        className="object-cover h-full"
                        alt="post"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 p-2 flex items-center ml-5 z-10">
                    <Link
                      to={`/anime/${
                        item.name.jp || item.name.en || item.name.vn
                      }-${item._id}`}
                    >
                      <h1 className="font-bold uppercase text-4xl hover:text-yellow-300 duration-200">
                        {item.name.jp || item.name.en || item.name.vn}
                      </h1>
                    </Link>
                  </div>
                </div>
              );
            } else if (index < 39) {
              return (
                <div
                  key={item._id}
                  className="flex p-2 border-b-2 border-black/50"
                >
                  <div className="mx-2 p-2 flex justify-center items-center">
                    <h1
                      className={`${
                        index <= 4 && "text-yellow-400"
                      } text-4xl font-medium font-mono`}
                    >
                      {index + 1}
                    </h1>
                  </div>
                  <div className="flex flex-1 ml-2">
                    <div className="w-12 h-16 overflow-hidden mr-4">
                      <Link
                        to={`/anime/${
                          item.name.jp || item.name.en || item.name.vn
                        }-${item._id}`}
                      >
                        <img
                          src={item.thumb_url}
                          className="object-cover"
                          alt="post"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 p-2 flex items-center">
                      <Link
                        to={`/anime/${
                          item.name.jp || item.name.en || item.name.vn
                        }-${item._id}`}
                      >
                        <h1 className="font-medium text-lg hover:text-yellow-300 duration-200">
                          {item.name.jp || item.name.en || item.name.vn}
                        </h1>
                      </Link>
                    </div>
                  </div>
                  <div className="ml-2 p-2 flex justify-center items-center">
                    <h1 className="text-white/60">
                      {item.done ? "Full" : `Tập ${item.total_episode.length}`}
                    </h1>
                  </div>
                </div>
              );
            }
          })
        : ""}
    </div>
  );
}
export default VotedAnimeList;
