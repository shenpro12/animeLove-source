import { useState, useRef, useEffect } from "react";
import FileSaver from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faDownload,
  faArrowRotateLeft,
  faArrowRotateRight,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Comment.module.css";
function ImageComment({ src }) {
  const [fullScreenView, setFullScreenView] = useState(false);
  const [deg, setDeg] = useState(0);
  const [scale, setScale] = useState(1);

  const image = useRef();
  const imageContainer = useRef();
  const saveImageHandle = () => {
    FileSaver.saveAs(
      src,
      src.split("/")[src.split("/").length - 1].split(".")[0] + ".jpg"
    );
  };
  const rotateLeft = (type) => {
    const currentHeight = imageContainer.current.offsetHeight;
    image.current.style.transform = `rotate(${deg - 90}deg)`;
    if (((deg - 90) / 90) % 2 === 0) {
      image.current.style.maxWidth = `100%`;
    } else {
      image.current.style.maxWidth = `${currentHeight - 50}px`;
    }
    setDeg(deg - 90);
    setScale(1);
  };
  const rotateRight = (type) => {
    const currentHeight = imageContainer.current.offsetHeight;
    image.current.style.transform = `rotate(${deg + 90}deg)`;
    if (((deg + 90) / 90) % 2 === 0) {
      image.current.style.maxWidth = `100%`;
    } else {
      image.current.style.maxWidth = `${currentHeight - 50}px`;
    }
    setDeg(deg + 90);
    setScale(1);
  };
  const removeFullScreen = () => {
    setFullScreenView(false);
    setDeg(0);
    setScale(1);
    image.current.style.maxWidth = `100%`;
    image.current.style.transform = `scale(1,1)`;
  };
  const zoomIn = () => {
    image.current.style.transform = `scale(${scale + 1},${scale + 1})`;
    setScale(scale + 1);
  };
  const zoomOut = () => {
    if (scale > 1) {
      image.current.style.transform = `scale(${scale - 1},${scale - 1})`;
      setScale(scale - 1);
    }
  };
  return (
    <div
      className={
        fullScreenView
          ? Styles.commentImageFullSreen
          : Styles.commentImage_container
      }
    >
      <div
        className={`w-full h-full flex overflow-scroll ${
          fullScreenView ? " justify-center" : " justify-start"
        } items-center ${Styles.imageContainer}`}
        ref={imageContainer}
      >
        {fullScreenView && (
          <FontAwesomeIcon
            icon={faClose}
            className=" text-3xl text-white/80 hover:cursor-pointer hover:text-white absolute top-5 right-5"
            onClick={removeFullScreen}
          />
        )}
        <img
          ref={image}
          alt="commentIMG"
          draggable="true"
          src={src}
          className={`${Styles.commentImage} hover:cursor-pointer ${
            fullScreenView
              ? "rounded-none hover:cursor-default"
              : " rounded-md hover:cursor-pointer"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!fullScreenView) {
              setFullScreenView(true);
            }
          }}
        />
      </div>

      {fullScreenView && (
        <div className="flex-1 items-end justify-end">
          <div className="mt-6 flex items-end justify-center bg-white/10 px-3 py-2 rounded-sm ">
            <div className="mx-3">
              <FontAwesomeIcon
                title="Tải xuống"
                icon={faDownload}
                className=" text-2xl text-white/80 hover:cursor-pointer hover:text-white"
                onClick={saveImageHandle}
              />
            </div>
            <div className="mx-3" onClick={rotateLeft}>
              <FontAwesomeIcon
                title="Xoay trái"
                icon={faArrowRotateLeft}
                className=" text-2xl text-white/80 hover:cursor-pointer hover:text-white"
              />
            </div>
            <div className="mx-3">
              <FontAwesomeIcon
                title="Xoay phải"
                icon={faArrowRotateRight}
                className=" text-2xl text-white/80 hover:cursor-pointer hover:text-white"
                onClick={rotateRight}
              />
            </div>
            <div className="mx-3">
              <FontAwesomeIcon
                title="Zoom in"
                icon={faMagnifyingGlassPlus}
                className=" text-2xl text-white/80 hover:cursor-pointer hover:text-white"
                onClick={zoomIn}
              />
            </div>
            <div className="mx-3">
              <FontAwesomeIcon
                title="Zoom out"
                icon={faMagnifyingGlassMinus}
                className=" text-2xl text-white/80 hover:cursor-pointer hover:text-white"
                onClick={zoomOut}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ImageComment;
