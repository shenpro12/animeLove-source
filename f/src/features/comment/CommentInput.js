import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrin,
  faClose,
  faCameraAlt,
} from "@fortawesome/free-solid-svg-icons";
import { isLogin, getProfile } from "../../app/reducer/userSlice";
import Avatar from "../profile/Avatar";
import Styles from "./Comment.module.css";
import request from "../../util/index";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import FormData from "form-data";

function CommentInput({ animeId }) {
  const params = useParams();
  const checkLogin = useSelector(isLogin);
  const profile = useSelector(getProfile);
  const [comment, setComment] = useState("");
  const [deleteImageBtn, setDeleteImageBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendBtn, setSendBtn] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState();
  //console.log(file);
  const textArea = useRef();
  const img = useRef();
  const fileInput = useRef();
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  useEffect(() => {
    setEmojiPicker(false);
    setSendBtn(false);
    setComment("");
  }, [params]);

  const sendCommentHandle = async () => {
    if (comment || file) {
      setEmojiPicker(false);
      setLoading(true);
      let form = new FormData();
      form.append("image", file);
      form.append("comment", comment);
      form.append("profile", JSON.stringify(profile));
      form.append("animeId", animeId);
      const res = await request.post("api/comment", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setComment("");
      delteteImageCommnetHandle();
      document.getElementById("comment_input").focus();
      if (res.data.message) {
        setStatus(res.data.message);
      }
    }
    textArea.current.style.height = "max-content";
  };
  function pasteEventhandle(e) {
    const clipboardItems = e.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) {
      return;
    }

    const item = items[0];
    // Get the blob of image
    const blob = item.getAsFile();
    img.current.src = URL.createObjectURL(blob);
    setDeleteImageBtn(true);
    setFile(blob);
  }
  const focusInputHandle = () => {
    textArea.current.addEventListener("paste", pasteEventhandle);
  };
  const focusOutInputHandle = () => {
    textArea.current.removeEventListener("paste", pasteEventhandle);
  };

  const delteteImageCommnetHandle = () => {
    img.current.src = "";
    setDeleteImageBtn(false);
    setFile("");
  };
  const chooseImageFromDevice = () => {
    fileInput.current.click();
  };
  return checkLogin ? (
    <div className="mb-1 flex">
      <div className="w-12">
        <Avatar
          url={profile.info.avatar}
          className="w-12 h-12 object-cover rounded-sm"
        />
      </div>
      <div className="flex-1 mb-5 relative">
        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/10 ml-3 z-10 flex flex-col items-center justify-center py-1">
            <img
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif"
              className="w-16 h-9"
            />
            <h1 className="font-mono text-black text-xs mt-2">Đang gửi...</h1>
          </div>
        )}
        <div className="flex-1 flex-col ml-3 border border-black/20 focus-within:border-sky-600 px-2 py-4">
          <textarea
            ref={textArea}
            id="comment_input"
            className={`w-full text-black outline-none resize-none overflow-hidden break-all`}
            rows={1}
            value={comment}
            placeholder="Viết bình luận..."
            onInput={(e) => {
              auto_grow(e.target);
              setComment(e.target.value);
            }}
            onClick={() => {
              setSendBtn(true);
              setEmojiPicker(false);
            }}
            onFocus={focusInputHandle}
            onBlur={focusOutInputHandle}
          ></textarea>
          <div className="flex-1 flex justify-between">
            <img ref={img} className="mt-3 w-44 max-h-72 object-cover" />
            {deleteImageBtn && (
              <div>
                <div
                  className="bg-black/20 rounded-full w-6 h-6 flex justify-center items-center hover:cursor-pointer hover:bg-black/30"
                  onClick={delteteImageCommnetHandle}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-sm text-black/70 "
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {sendBtn && (
          <div className="relative ml-3 flex justify-end bg-zinc-300/20 px-3 py-2 border-l border-r border-b border-black/20">
            <div className="flex-1 items-center flex">
              <h1 className=" text-red-500 text-sm font-mono">{status}</h1>
            </div>
            <input
              ref={fileInput}
              accept=".jpg, .png"
              type="file"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                img.current.src = URL.createObjectURL(e.target.files[0]);
                setDeleteImageBtn(true);
              }}
            />
            <p
              title="Thêm ảnh"
              className="text-black flex p-2 justify-center items-center mr-2 hover:cursor-pointer bg-black/10 rounded-sm hover:bg-black/20"
              onClick={chooseImageFromDevice}
            >
              <FontAwesomeIcon icon={faCameraAlt} className="text-base" />
            </p>
            <p
              title="Emoji"
              className="text-black flex p-2 justify-center items-center mr-2 hover:cursor-pointer bg-black/10 rounded-sm hover:bg-black/20"
              onClick={() => {
                setEmojiPicker(!emojiPicker);
                document.getElementById("comment_input").focus();
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
                    document.getElementById("comment_input").focus();
                  }}
                />
              </div>
            )}
            <h1
              className={`text-white py-1 px-3 rounded-sm font-bold ${
                comment || file
                  ? " hover:cursor-pointer hover:bg-sky-600 bg-sky-700"
                  : "bg-sky-100"
              }`}
              onClick={sendCommentHandle}
            >
              Gửi
            </h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-black mb-5">
      Vui lòng{" "}
      <Link className=" bg-yellow-400 py-1 px-3 rounded" to={"/login"}>
        Đăng nhập
      </Link>{" "}
      để viết bình luận!
    </h1>
  );
}
export default CommentInput;
