import { useState, useContext, useEffect } from "react";
import CommentItem from "./CommentItem";
import { SocketContext } from "./Comment";
function CommentContent({ comment }) {
  //console.log(comment);
  const socket = useContext(SocketContext);
  const [commentRenderCount, setCommentRenderCount] = useState(
    comment.length <= 10 ? comment.length : 10
  );
  const [reRender, setReRender] = useState(true);
  const reRenderLoop = setInterval(() => {
    setReRender(!reRender);
  }, 60000);
  useEffect(() => {
    return () => {
      clearInterval(reRenderLoop);
    };
  });
  const expandCommentHandle = () => {
    if (commentRenderCount + 5 <= comment.length) {
      setCommentRenderCount(commentRenderCount + 5);
    } else {
      setCommentRenderCount(comment.length);
    }
  };
  const scrollToCommentHeader = () => {
    let comment_input = document.getElementById("comment_input");
    if (comment_input) {
      comment_input.click();
      comment_input.focus();
    }
    let comment = document.getElementById("comment");
    comment.scrollIntoView({
      behavior: "auto",
    });
  };
  useEffect(() => {
    socket.on("newComment", (commentData) => {
      setCommentRenderCount(commentRenderCount + 1);
    });
  });
  return (
    <div>
      {comment.map((i, index) => {
        if (index <= commentRenderCount - 1) {
          return <CommentItem key={i._id} data={i} />;
        }
      })}
      {commentRenderCount < comment.length && (
        <div className="flex justify-between">
          <h1
            className="text-black/60 hover:cursor-pointer hover:text-black/80 text-sm font-bold"
            onClick={expandCommentHandle}
          >
            {`Xem thêm ${
              commentRenderCount + 5 <= comment.length
                ? "5"
                : comment.length - commentRenderCount
            } bình luận`}
          </h1>
          <h1 className="text-black/60 font-bold -mt-22">
            {commentRenderCount}/{comment.length}
          </h1>
        </div>
      )}
      <h1
        className="text-black/70 hover:cursor-pointer hover:text-black/60 mt-2 font-bold inline-block"
        onClick={scrollToCommentHeader}
      >
        Viết bình luận...
      </h1>
    </div>
  );
}
export default CommentContent;
