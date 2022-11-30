import { useState, useEffect } from "react";
import PageContent from "../animePaging/PageContent";
import PageControl from "../animePaging/PageControl";
function InventoryContent({ data }) {
  const [renderData, setRenderData] = useState(data);
  const [pageNow, setPageNow] = useState(1);
  useEffect(() => {
    setRenderData(data);
  }, [data]);
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
export default InventoryContent;
