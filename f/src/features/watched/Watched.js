import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../video/Video";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { getAnimeById, dataFormat } from "../../util/queryDataHelper";
import Styles from "./Watched.module.css";
import PageControl from "../animePaging/PageControl";
import PageContent from "../animePaging/PageContent";
function Watched() {
  const animeList = useSelector(selectAnimeList).animeList;
  const watchedHeader = useRef();
  const [pageNow, setPageNow] = useState(1);
  const [renderData, setRenderData] = useState(
    getCookie("viewsHistory")
      ? getAnimeById(
          dataFormat(animeList),
          JSON.parse(getCookie("viewsHistory"))
        )
      : []
  );
  //console.log(renderData);
  useEffect(() => {
    watchedHeader.current.scrollIntoView({
      behavior: "smooth",
    });
    document.title = `Lịch sử xem phim`;
  });
  const removeWatchedAnime = (id) => {
    let temp = JSON.parse(getCookie("viewsHistory")).filter(
      (i) => i.animeId !== id
    );
    document.cookie = `viewsHistory=${JSON.stringify(temp)}`;
    setRenderData(renderData.filter((i) => i._id !== id));
  };
  return (
    <div className={`flex-1 ${Styles.watchedContainer}`}>
      <h1 className="mb-2 text-sm font-medium">
        <FontAwesomeIcon icon={faHouse} className="mr-1" />
        <Link to={"/"} className="hover:text-lime-400">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to={"/anime/watched"} className="hover:text-lime-400">
          Lịch sử xem phim
        </Link>
      </h1>
      <div className="flex justify-between flex-wrap" ref={watchedHeader}>
        <div className="flex-1 mr-3">
          <h1 className="uppercase px-2 py-2 mt-2 bg-sky-500 inline-block rounded font-mono font-bold text-lg mb-1">
            Lịch sử xem phim{" "}
            {getCookie("viewsHistory") &&
            JSON.parse(getCookie("viewsHistory")).length
              ? `- Bạn đã xem ${
                  JSON.parse(getCookie("viewsHistory")).length
                }  Anime gần
            đây`
              : ""}
          </h1>
        </div>
        <div className="flex items-end">
          <div
            className="flex items-center px-4 py-2 bg-red-700 rounded text-xs hover:cursor-pointer hover:bg-red-800 mb-1"
            onClick={() => {
              setRenderData([]);
              document.cookie = `viewsHistory=${JSON.stringify([])}; path=/`;
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
            <h1>Xóa toàn bộ lịch sử</h1>
          </div>
        </div>
      </div>
      <h1 className="px-3 py-1 bg-red-500 rounded text-white font-mono mb-2 text-xs inline-block mt-2">
        LƯU Ý: Lịch sử xem lưu trên trình duyệt của máy bạn, không lưu lại trong
        tài khoản của bạn!
      </h1>
      <PageControl
        total={renderData.length}
        page={pageNow}
        onClick={(page) => {
          setPageNow(page);
        }}
      />
      <PageContent
        data={renderData}
        page={pageNow}
        onRemoveWatched={removeWatchedAnime}
      />
      <PageControl
        total={renderData.length}
        page={pageNow}
        onClick={(page) => {
          setPageNow(page);
        }}
      />
    </div>
  );
}
export default Watched;
