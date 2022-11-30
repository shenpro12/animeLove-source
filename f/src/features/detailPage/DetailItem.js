import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Styles from "./DetailPage.module.css";
import DetailOption from "./DetailOption";
import DetailContent from "./DetailContent";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat } from "../../util/queryDataHelper";
import Comment from "../comment/Comment";
function DetailItem() {
  const animeList = useSelector(selectAnimeList).animeList;
  const params = useParams();
  const [dataRender, setDataRender] = useState(
    dataFormat(animeList).find(
      (item) =>
        item._id === params.name.split("-")[params.name.split("-").length - 1]
    )
  );
  const [contentType, setContentType] = useState("info");
  useEffect(() => {
    setDataRender(
      dataFormat(animeList).find(
        (item) =>
          item._id === params.name.split("-")[params.name.split("-").length - 1]
      )
    );
  }, [params]);
  const displayContentType = (type) => {
    setContentType(type);
  };
  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("banner").offsetTop - 10,
      left: 0,
      behavior: "smooth",
    });
  }, [params.name]);
  useEffect(() => {
    document.title = `${
      dataRender.name.jp || dataRender.name.jp || dataRender.name.jp
    }`;
  });
  return (
    <div className={`${Styles.detailItem_container}`}>
      <DetailOption active={contentType} onChange={displayContentType} />
      <DetailContent data={dataRender} type={contentType} />
      <Comment animeId={dataRender._id} />
    </div>
  );
}

export default DetailItem;
