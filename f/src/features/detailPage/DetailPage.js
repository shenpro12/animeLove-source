import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Banner from "./Banner";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat } from "../../util/queryDataHelper";
import { Link } from "react-router-dom";

import Styles from "./DetailPage.module.css";
import Slider from "./Slider";
function DetailPage() {
  const animeList = useSelector(selectAnimeList).animeList;

  const params = useParams();
  const [dataRender, setDataRender] = useState(
    dataFormat(animeList).find(
      (item) =>
        item._id === params.name.split("-")[params.name.split("-").length - 1]
    )
  );
  useEffect(() => {
    setDataRender(
      dataFormat(animeList).find(
        (item) =>
          item._id === params.name.split("-")[params.name.split("-").length - 1]
      )
    );
  }, [params]);
  return (
    <div className="flex flex-col flex-1">
      <h1 className="mb-4 text-xs font-medium text-white/80 flex flex-wrap">
        <Link to={"/"} className="hover:text-lime-400 flex items-center mx-1">
          <FontAwesomeIcon icon={faHouse} />
          <h1 className="ml-1">Trang chủ</h1>
        </Link>{" "}
        /{" "}
        <Link
          className="hover:text-lime-400 mx-1"
          to={`/anime/${
            dataRender.name.jp || dataRender.name.en || dataRender.name.vn
          }-${dataRender._id}`}
        >
          {dataRender.name.jp || dataRender.name.en || dataRender.name.vn}
        </Link>{" "}
        /{" "}
        {dataRender.category.map((item, index) => (
          <div key={index}>
            <Link
              to={`/category/${item}`}
              className="hover:text-lime-400 mx-1"
            >{`${item}`}</Link>
            /
          </div>
        ))}{" "}
        <span className="font-normal text-neutral-400/60 ml-1">
          {params.episode ? "Xem phim" : "Thông tin"}
        </span>
      </h1>
      <div
        className={`${Styles.detailPage_container} ${
          params.episode && Styles.flex_col_reverse
        }`}
      >
        <Banner data={dataRender} />
        <Outlet />
      </div>
      <Slider data={[dataRender.category[0]]} itemId={dataRender._id} />
    </div>
  );
}

export default DetailPage;
