import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrin } from "@fortawesome/free-solid-svg-icons";
import { isLogin, getProfile } from "../../app/reducer/userSlice";
import Avatar from "../profile/Avatar";
import Styles from "./Comment.module.css";
import request from "../../util/index";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
function SubCommentInput({ commentId }) {
  const params = useParams();
  const checkLogin = useSelector(isLogin);
  const profile = useSelector(getProfile);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [sendBtn, setSendBtn] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [status, setStatus] = useState("");
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  useEffect(() => {
    setEmojiPicker(false);
    setSendBtn(false);
    setComment("");
  }, [params]);
  useEffect(() => {
    let subComment_input = document.getElementById(
      `subComment_input_${commentId}`
    );
    subComment_input.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const sendCommentHandle = async () => {
    if (comment) {
      setEmojiPicker(false);
      setLoading(true);
      let form = new FormData();
      form.append("commentId", commentId);
      form.append("comment", comment);
      form.append("profile", JSON.stringify(profile));
      form.append(
        "animeId",
        params.name.split("-")[params.name.split("-").length - 1]
      );
      const res = await request.post("api/comment", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setComment("");
      document.getElementById("subCommentInput").focus();
      if (res.data.message) {
        setStatus(res.data.message);
      }
    }
  };
  return checkLogin ? (
    <div
      className="mb-2 flex ml-1 mt-3 border-2 border-white"
      id={`subComment_input_${commentId}`}
    >
      <div className="w-9">
        <Avatar
          url={profile.info.avatar}
          className="w-9 h-9 object-cover rounded-sm"
        />
      </div>
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/10 ml-3 z-10 flex flex-col items-center justify-center py-1">
            <img
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif"
              className="w-16 h-9"
            />
            <h1 className="font-mono text-black text-xs mt-2">Đang gửi...</h1>
          </div>
        )}
        <div className="flex-1 ml-3 border border-black/20 focus-within:border-sky-600 flex items-center px-2 py-4">
          <textarea
            id="subCommentInput"
            autoFocus
            className={`w-full text-black outline-none resize-none overflow-hidden break-all text-xs`}
            rows={1}
            value={comment}
            placeholder="Viết phản hồi..."
            onInput={(e) => {
              auto_grow(e.target);
              setComment(e.target.value);
            }}
            onClick={() => {
              setSendBtn(true);
              setEmojiPicker(false);
            }}
          ></textarea>
        </div>
        {sendBtn && (
          <div className="ml-3 flex justify-end bg-zinc-300/20 px-3 py-2 border-l border-r border-b border-black/20">
            <p
              className="text-black flex p-2 justify-center items-center mr-2 hover:cursor-pointer bg-black/10 rounded-sm hover:bg-black/20"
              onClick={() => {
                setEmojiPicker(!emojiPicker);
              }}
            >
              <FontAwesomeIcon icon={faFaceGrin} className="text-base" />
            </p>
            {emojiPicker && (
              <div className={`${Styles.emojiPicker} z-30`} id="emojiPicker">
                <Picker
                  theme="light"
                  previewPosition="none"
                  skin="2"
                  data={data}
                  onEmojiSelect={(e) => {
                    setComment(comment + e.native);
                  }}
                />
              </div>
            )}
            <h1
              className="text-white py-1 px-3 rounded-sm hover:cursor-pointer hover:bg-sky-600 bg-sky-700 font-bold"
              onClick={sendCommentHandle}
            >
              Phản hồi
            </h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
export default memo(SubCommentInput);
