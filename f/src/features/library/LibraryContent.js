import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import {
  dataFormat,
  queryData,
  sortWithName,
} from "../../util/queryDataHelper";
import PageControl from "../animePaging/PageControl";
import PageContent from "./PageContent";
function LibraryContent({ query, category }) {
  const animeList = dataFormat(useSelector(selectAnimeList).animeList);
  const initData = () => {
    if (category.length) {
      let temp = queryData(animeList, { category: category });
      return sortWithName(temp, query);
    } else {
      let temp = queryData(animeList, { category: "all" });
      return sortWithName(temp, query);
    }
  };
  const [pageNow, setPageNow] = useState(1);
  const [dataRender, setDataRender] = useState(initData);
  useEffect(() => {
    setDataRender(initData);
    window.scrollTo({
      top: document.getElementById("libHeader").offsetTop - 10,
      left: 0,
      behavior: "smooth",
    });
  }, [query, category]);
  return (
    <div className="mt-5">
      <PageContent data={dataRender} page={pageNow} />
      <PageControl
        total={dataRender.length}
        page={pageNow}
        onClick={(page) => {
          setPageNow(page);
        }}
      />
    </div>
  );
}
export default LibraryContent;
