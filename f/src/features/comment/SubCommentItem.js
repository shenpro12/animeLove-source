import { useState, useLayoutEffect, useEffect } from "react";
import Avatar from "../profile/Avatar";
import Styles from "./Comment.module.css";
import { getTime } from "../../util/helper";
function SubCommentItem({ data }) {
  const [collapse, setCollapse] = useState(true);
  const [collapseBtn, setCollapseBtn] = useState(false);
  const [reRender, setReRender] = useState(true);
  const reRenderLoop = setInterval(() => {
    setReRender(!reRender);
  }, 60000);
  useEffect(() => {
    return () => {
      clearInterval(reRenderLoop);
    };
  });
  useLayoutEffect(() => {
    let commentHidden = document.getElementById(`commentHidden_${data._id}`);
    let commentShow = document.getElementById(`commentShow_${data._id}`);
    if (
      commentHidden &&
      commentHidden.offsetHeight > commentShow.offsetHeight
    ) {
      setCollapseBtn(true);
      commentHidden.remove();
    }
  });

  return (
    <div className="flex ml-1">
      <div className="w-9">
        <Avatar
          url={data.info.avatar}
          className="w-9 h-9 border object-cover rounded-sm"
        />
      </div>
      <div className="flex-1 ml-2">
        <h1 className=" font-bold text-sm mt-0 mb-1 text-sky-700 break-all">
          {data.info.name}
        </h1>
        <h1
          className={`text-black text-sm break-all ${
            collapse && Styles.collapse
          }`}
          id={`commentShow_${data._id}`}
        >
          {data.comment}
        </h1>
        <h1
          className={`text-black text-sm break-all ${Styles.commentHidden}`}
          id={`commentHidden_${data._id}`}
        >
          {data.comment}
        </h1>
        <h1 className="text-black/70 text-xs mt-1 hover:cursor-pointer hover:text-sky-400 inline-block mr-3">
          {getTime(data.createdAt)}
        </h1>
        {collapseBtn && (
          <p
            className="text-sky-600 text-xs mt-1 hover:cursor-pointer hover:text-sky-400 inline-block mr-3"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? "Xem thêm" : "Thu gọn"}
          </p>
        )}
      </div>
    </div>
  );
}
export default SubCommentItem;
