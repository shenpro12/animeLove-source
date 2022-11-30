import { useState, useEffect, memo, useRef, createContext } from "react";
import { io } from "socket.io-client";
import Styles from "./Comment.module.css";
import Header from "./Header";
import RequestLoading from "../loading/RequestLoading";
import CommentContent from "./CommentContent";
import CommentInput from "./CommentInput";
import request from "../../util/index";

const socket = io("http://localhost:3005");
export const SocketContext = createContext();
function Comment({ animeId }) {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState([]);
  //console.log(comment);
  const [status, setStatus] = useState("");
  const currentAnimeId = useRef(animeId);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await request.post("api/anime/comment", {
        data: {
          animeId,
        },
      });
      setLoading(false);

      if (res.data.comment) {
        // let temp = [...res.data.comment];
        // let tem1 = [...temp[0].subComment];
        // for (let i = 0; i <= 10; i++) {
        //   tem1.push(res.data.comment[1]);
        // }
        // temp[0].subComment = tem1;
        setComment(res.data.comment.reverse());
      } else {
        setComment("");
        setStatus("Không có bình luận!");
      }
    })();
  }, [animeId]);

  useEffect(() => {
    socket.emit("leaveRoom", {
      id: currentAnimeId.current,
    });
    socket.emit("joinRoom", {
      id: animeId,
    });
    currentAnimeId.current = animeId;
    return () => {
      socket.emit("leaveRoom", {
        id: currentAnimeId.current,
      });
    };
  }, [animeId]);

  useEffect(() => {
    socket.on("newComment", (commentData) => {
      setComment([commentData, ...comment]);
    });
    socket.on("newSubComment", (commentData) => {
      let temp = [...comment];
      temp = temp.map((item) => {
        if (item._id === commentData.commentId) {
          let data = {
            comment: commentData.comment,
            info: commentData.info,
            userId: commentData.userId,
            _id: commentData._id,
          };
          item.subComment = [...item.subComment, data];
        }
        return item;
      });
      setComment(temp);
    });
    return () => {
      socket.removeListener("newComment");
      socket.removeListener("newSubComment");
    };
  });

  return (
    <div
      className={`${Styles.comment_container} bg-white px-2 py-3 rounded -mr-15`}
      id="comment"
    >
      <Header total={comment && !loading ? comment.length : 0} />
      <CommentInput animeId={animeId} />
      {loading ? (
        <RequestLoading
          styles={{
            position: "absolute",
            z_Index: "10",
            width: "80px",
            height: "180px",
            border_radius: "5px",
            top: "65px",
            bg: "white",
          }}
          text="Loading..."
          url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif"
        />
      ) : comment ? (
        <SocketContext.Provider value={socket}>
          <CommentContent comment={comment} />
        </SocketContext.Provider>
      ) : (
        <h1 className="text-black/60 mb-3 font-bold text-center">{status}</h1>
      )}
    </div>
  );
}
export default memo(Comment);
