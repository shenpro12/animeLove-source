import { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import { isLogin } from "../../app/reducer/userSlice";
import Avatar from "../profile/Avatar";
import Styles from "./Comment.module.css";
import SubCommentItem from "./SubCommentItem";
import SubCommentInput from "./SubCommentInput";
import ImageComment from "./ImageComment";
import { getTime } from "../../util/helper";
function CommentItem({ data }) {
  const initSubComment = () => {
    let temp = [];
    for (let i = data.subComment.length - 1; i >= 0; i--) {
      temp.push(data.subComment[i]);
    }
    return temp;
  };
  const checkLogin = useSelector(isLogin);
  const [subCommentRenderCount, setSubCommentRenderCount] = useState(
    data.subComment.length <= 2 ? data.subComment.length : 2
  );
  const [collapse, setCollapse] = useState(true);
  const [collapseBtn, setCollapseBtn] = useState(false);
  const [repComment, setRepComment] = useState(false);
  const [subCommentData, setSubCommentData] = useState(initSubComment);

  useEffect(() => {
    setSubCommentData(initSubComment);
    setSubCommentRenderCount(
      subCommentRenderCount === 0 ? 2 : subCommentRenderCount
    );
  }, [data.subComment]);

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
  const expandCommentHandle = () => {
    if (subCommentRenderCount + 5 <= subCommentData.length) {
      setSubCommentRenderCount(subCommentRenderCount + 5);
    } else {
      setSubCommentRenderCount(subCommentData.length);
    }
  };

  return (
    <div className="mb-2 flex">
      <div className="w-12">
        <Avatar
          url={data.info.avatar}
          className="w-12 h-12 object-cover rounded-sm"
        />
      </div>
      <div className="flex-1 ml-3">
        <h1 className=" font-bold text-base mt-0 mb-1 text-sky-700 break-all">
          {data.info.name}
        </h1>
        <h1
          id={`commentShow_${data._id}`}
          className={`text-black text-sm break-all ${
            collapse && Styles.collapse
          }`}
        >
          {data.comment}
        </h1>
        {data.image && <ImageComment src={data.image} />}
        <h1
          className={`text-black text-sm break-all ${Styles.commentHidden}`}
          id={`commentHidden_${data._id}`}
        >
          {data.comment}
        </h1>
        <h1 className="text-black/70 text-xs mt-1 inline-block mr-3">
          {getTime(data.createdAt)}
        </h1>
        {collapseBtn && (
          <p
            className="text-sky-600 text-xs mt-1 hover:cursor-pointer hover:text-sky-400 inline-block mr-3 font-semibold"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? "Xem thêm" : "Thu gọn"}
          </p>
        )}
        {checkLogin && (
          <p
            className="text-sky-600 text-xs mt-1 hover:cursor-pointer hover:text-sky-400 inline-block font-semibold"
            onClick={() => setRepComment(!repComment)}
          >
            {repComment ? "Hủy" : "Phản hồi"}
          </p>
        )}

        <div className="border-l-2 border-dashed border-sky-900/20 mt-2">
          {subCommentData.map((i, index) => {
            if (index <= subCommentRenderCount - 1) {
              return <SubCommentItem key={i._id} data={i} />;
            }
          })}
        </div>
        {repComment && <SubCommentInput commentId={data._id} />}
        {subCommentRenderCount < data.subComment.length && (
          <div className="flex justify-between">
            <h1
              className="text-black/60 hover:cursor-pointer hover:text-black/80 text-xs font-bold ml-5"
              onClick={expandCommentHandle}
            >
              {`Xem thêm ${
                subCommentRenderCount + 5 <= data.subComment.length
                  ? "5"
                  : data.subComment.length - subCommentRenderCount
              } phản hồi`}
            </h1>
            <h1 className="text-black/60 font-bold -mt-22 text-xs">
              {subCommentRenderCount}/{data.subComment.length}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
export default CommentItem;
