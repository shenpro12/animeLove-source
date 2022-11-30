import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat } from "../../util/queryDataHelper";
function NewAnime() {
  const animeList = useSelector(selectAnimeList).animeList;
  const [renderData, setRenderData] = useState(dataFormat(animeList));
  return (
    <div className="w-full -bg-custom1 rounded mt-5 p-2">
      <h1 className="uppercase font-mono font-medium">Anime mới cập nhật</h1>
      <div className="mt-2 flex flex-row items-end">
        <div className="w-10 h-1 bg-lime-400"></div>
        <div className="h-px flex-1 bg-zinc-700"></div>
      </div>
      <div className="mt-3 mb-1">
        {renderData.map((item, index) =>
          index <= 10 && item.total_episode.length ? (
            <Link
              key={index}
              to={`/anime/${item.name.jp || item.name.en || item.name.vn}-${
                item._id
              }`}
            >
              <div className="flex duration-100 justify-between border-b-2 border-b-black/60 py-1 text-sm hover:cursor-pointer hover:border-l-4 hover:border-l-red-500 border-l-red-500 p-1">
                <h1 className="flex-1 text-red-300 font-medium truncate mr-3 hover:text-white">
                  {item.name.jp || item.name.en || item.name.vn}
                </h1>
                <h1 className="italic font-light text-neutral-300/60">
                  Tập {item.total_episode.length}
                </h1>
              </div>
            </Link>
          ) : (
            ""
          )
        )}
        <Link to={`/category/all`}>
          <div className="flex duration-100 justify-between border-b-2 border-b-black/60 py-1 text-sm hover:cursor-pointer hover:border-l-4 hover:border-l-red-500 p-1">
            <h1 className="flex-1 text-white font-medium truncate mr-3">
              Xem thêm...
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default NewAnime;
