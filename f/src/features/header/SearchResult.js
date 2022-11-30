import { Link } from "react-router-dom";
function SearchResult({ data, text, onChoose }) {
  return (
    <div className="w-full bg-neutral-700 -z-35 absolute right-0 mt-11 rounded overflow-hidden">
      {data.length
        ? data.map(
            (item, index) =>
              index < 6 && (
                <Link
                  key={item._id}
                  to={`/anime/${item.name.jp || item.name.vn || item.name.en}-${
                    item._id
                  }`}
                  onClick={onChoose}
                >
                  <div className="flex border-b-2 border-black/30 hover:cursor-pointer hover:bg-white/10 duration-100 py-1">
                    <div className="w-10 mt-1 ml-2 mb-2 overflow-hidden">
                      <img src={item.thumb_url} alt="poster" />
                    </div>
                    <div className="flex-1 ml-2 mr-2">
                      <h1 className="text-white/80 font-medium">
                        {item.name.jp || item.name.vn || item.name.en}
                      </h1>
                      <h1 className="text-sm italic text-white/50">
                        {item.total_episode.length
                          ? `Tập ${item.total_episode.length}`
                          : "PV/Trailer"}
                      </h1>
                    </div>
                  </div>
                </Link>
              )
          )
        : ""}
      {data.length > 6 && (
        <Link to={`/category/name=${text}`} onClick={onChoose}>
          <h1 className=" bg-red-600 text-white font-bold hover:cursor-pointer hover:bg-red-500 text-center py-3">
            Xem thêm
          </h1>
        </Link>
      )}
    </div>
  );
}
export default SearchResult;
