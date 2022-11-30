import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
import PageControl from "./PageControl";
import PageContent from "./PageContent";
function AnimePaging({ year }) {
  const params = useParams();
  const animeList = useSelector(selectAnimeList).animeList;
  const [pageNow, setPageNow] = useState(1);
  const [renderData, setRenderData] = useState(
    queryData(dataFormat(animeList), {
      category: params.type === "all" ? "all" : params.type.split("+"),
      year,
    })
  );
  //console.log(pageNow);
  useLayoutEffect(() => {
    setRenderData(
      queryData(dataFormat(animeList), {
        category: params.type === "all" ? "all" : params.type.split("+"),
        year,
      })
    );
    setPageNow(1);
  }, [params]);
  //console.log("renderData:", renderData);

  return (
    <div>
      <PageControl
        total={renderData.length}
        page={pageNow}
        onClick={(page) => {
          setPageNow(page);
        }}
      />
      <PageContent data={renderData} page={pageNow} />
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
export default AnimePaging;
