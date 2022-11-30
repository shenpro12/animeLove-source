import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faComments,
  faLightbulb,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FavoredButton from "../detailPage/FavoredButton";
import ReportButton from "./ReportButton";
function VideoBehavorControl({ total_episode }) {
  const params = useParams();

  const [nextEp, setNextEp] = useState(
    params.episode.split("-")[1] === total_episode.toString() ? false : true
  );
  const [light, setLight] = useState(false);
  const lightBehavorHandle = () => {
    setLight(!light);
    if (!light) {
      document.getElementById("bannerDetail").classList.add("z-20");
      document.getElementById("bannerDetail").classList.remove("z-30");
      //
      let emojiPicker = document.querySelectorAll("#emojiPicker");
      if (emojiPicker.length) {
        for (let i = 0; i < emojiPicker.length; i++) {
          emojiPicker[i].classList.remove("z-30");
          emojiPicker[i].classList.add("z-10");
        }
      }
    } else {
      document.getElementById("bannerDetail").classList.add("z-30");
      document.getElementById("bannerDetail").classList.remove("z-20");
      //
      let emojiPicker = document.querySelectorAll("#emojiPicker");
      if (emojiPicker.length) {
        for (let i = 0; i < emojiPicker.length; i++) {
          emojiPicker[i].classList.remove("z-10");
          emojiPicker[i].classList.add("z-30");
        }
      }
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("video").offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }, [light]);
  useEffect(() => {
    setNextEp(
      params.episode.split("-")[1] === total_episode.toString() ? false : true
    );
  }, [params.episode]);
  const scrollToComment = () => {
    window.scrollTo({
      top: document.getElementById("comment").offsetTop - 10,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-11/12 flex justify-center flex-wrap z-0 mx-auto">
      {light && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black z-20"
          onClick={lightBehavorHandle}
        ></div>
      )}
      <Link
        className="z-20"
        to={
          nextEp &&
          `/anime/${params.name}/episode-${
            parseInt(params.episode.split("-")[1]) + 1
          }`
        }
      >
        <div
          className={`${
            nextEp
              ? "hover:bg-white/10 hover:cursor-pointer"
              : "hover:cursor-not-allowed"
          } flex items-center py-3 px-3 mx-1`}
        >
          <FontAwesomeIcon className="text-white/40" icon={faForwardStep} />
          <h1 className="ml-2 font-medium text-sm font-mono">Tập tiếp</h1>
        </div>
      </Link>
      <div
        className="flex items-center hover:bg-white/10 hover:cursor-pointer py-3 px-3 mx-1 z-20"
        onClick={scrollToComment}
      >
        <FontAwesomeIcon className="text-white/40" icon={faComments} />
        <h1 className="ml-2 font-medium text-sm font-mono">Bình luận</h1>
      </div>
      <FavoredButton
        containerClassName="flex items-center hover:bg-white/10 hover:cursor-pointer py-3 px-3 mx-1 z-20"
        textClassName="font-medium text-sm font-mono"
      />
      <div
        className="flex items-center hover:bg-white/10 hover:cursor-pointer py-3 px-3 mx-1 z-20"
        onClick={lightBehavorHandle}
      >
        <FontAwesomeIcon className="text-white/40" icon={faLightbulb} />
        <h1 className="ml-2 font-medium text-sm font-mono">
          {light ? "Bật đèn" : "Tắt đèn"}
        </h1>
      </div>
      <ReportButton />
      <Link className="z-20" to="/anime/watched">
        <div className="flex items-center hover:bg-white/10 hover:cursor-pointer py-3 px-3 mx-1 ">
          <FontAwesomeIcon className="text-white/40" icon={faClockRotateLeft} />
          <h1 className="ml-2 font-medium text-sm font-mono">Lịch sử xem</h1>
        </div>
      </Link>
    </div>
  );
}
export default VideoBehavorControl;
