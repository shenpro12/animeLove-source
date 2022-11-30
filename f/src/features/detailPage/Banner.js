import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClockRotateLeft,
  faEye,
  faCalendarDays,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { selectAnimeList } from "../../app/reducer/animeSlice";

import Styles from "./DetailPage.module.css";
import { getAnimeSeason } from "../../util/queryDataHelper";
import Rate from "./Rate";
import FavoredButton from "./FavoredButton";
const particlesOptions = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#fff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 15,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 0.3,
        opacity: 1,
        speed: 3,
      },
      repulse: {
        distance: 200,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "transparent",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};
function Banner({ data }) {
  const [unavailableAler, setUnavailableAler] = useState(false);
  const params = useParams();
  const animeList = useSelector(selectAnimeList).animeList;
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div
      id="banner"
      className={Styles.banner_container}
      style={{
        backgroundImage: `url(${data.background_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {unavailableAler && (
        <div
          className="fixed flex flex-col justify-center top-0 bottom-0 left-0 right-0 bg-black/90 z-50"
          onClick={() => setUnavailableAler(false)}
        >
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
          <FontAwesomeIcon
            icon={faClose}
            className="text-white/70 hover:cursor-pointer text-3xl hover:text-white absolute top-5 right-5"
          />
          <div>
            <img
              alt="gif"
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669691394/menhera-sad_qccttq.gif"
              className="mx-auto w-64 my-auto"
            />
          </div>
          <div className="w-full flex justify-center mt-10">
            <h1 className="text-2xl font-semibold font-mono text-center uppercase mx-3">
              Anime hiện đang cập nhật! Vui lòng chờ đợi!
            </h1>
          </div>
        </div>
      )}
      <div className={Styles.overlay}></div>
      {!params.episode ? (
        <div className={Styles.headerImageContainer}>
          <div
            className={`absolute -w-180 -h-260 flex hover:bg-black/40 hover:cursor-pointer ${Styles.headerImageOverlay}`}
          >
            <FavoredButton
              containerClassName="absolute flex items-center py-1 px-2 bg-black/70 rounded top-2 left-2 hover:bg-black/90"
              textClassName="text-xs font-semibold"
            />
            <Link
              to={
                data.total_episode.length
                  ? `/anime/${data.name.jp || data.name.en || data.name.vn}-${
                      data._id
                    }/episode-1`
                  : ""
              }
              onClick={() => {
                if (!data.total_episode.length) {
                  setUnavailableAler(true);
                }
              }}
              className="flex w-full"
            >
              <div className="w-14 h-14 bg-transparent border-2 rounded-full border-white m-auto flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-white text-2xl"
                />
              </div>

              <p className="py-3 w-full bg-red-700/90 absolute text-center bottom-0 mb-4 uppercase font-medium">
                {data.total_episode.length ? "Xem phim" : "Sắp chiếu"}
              </p>
            </Link>
          </div>
          <div className={Styles.imageContainer}>
            <img
              src={data.thumb_url}
              width="180px"
              height="260px"
              className={Styles.headerImage}
              alt="poster"
            />
          </div>
        </div>
      ) : (
        <div className={Styles.headerImageContainer}>
          <div
            className={`absolute -w-180 -h-260 flex hover:bg-black/40 hover:cursor-pointer ${Styles.headerImageOverlay}`}
          >
            <div className="w-14 h-14 bg-transparent border-2 rounded-full border-white m-auto flex justify-center items-center">
              <FontAwesomeIcon icon={faPlay} className="text-white text-2xl" />
            </div>
          </div>
          <div className={Styles.imageContainer}>
            <img
              src={data.thumb_url}
              width="180px"
              height="260px"
              className={Styles.headerImage}
              alt="poster"
            />
          </div>
        </div>
      )}
      <div className="py-4 px-5 z-30 flex-1" id="bannerDetail">
        <h1 className="font-medium text-3xl text-lime-400">
          {data.name.jp || data.name.en || data.name.vn}
        </h1>
        <h1 className={Styles.description}>{data.description}</h1>
        <div className="w-full mt-6 mb-3 flex justify-center">
          <div className="mx-4 flex justify-center items-center">
            <FontAwesomeIcon
              className=" text-lime-400/50 text-xs"
              icon={faClockRotateLeft}
            />
            <h1 className="mx-2 font-medium text-sm">
              {data.total_episode.length ? data.total_episode.length : "??"}/
              {data.total_ep ? data.total_ep : "??"}
            </h1>
          </div>
          <div className="mx-4 flex justify-center items-center">
            <FontAwesomeIcon
              className="text-lime-400/50 text-xs"
              icon={faCalendarDays}
            />
            <h1 className="mx-2 font-medium text-sm">{data.release_year} </h1>
          </div>
          <div className="mx-4 flex justify-center items-center">
            <FontAwesomeIcon
              className="text-lime-400/50 text-xs"
              icon={faEye}
            />
            <h1 className="mx-2 font-medium text-sm">
              {data.views.total_view}
            </h1>
          </div>
        </div>
        <Rate rate={data.star} />
        <div>
          {getAnimeSeason(animeList, data._id).map((item) => (
            <Link key={item._id} to={`/anime/${item.name}-${item._id}`}>
              <h1
                className={`px-3 border-2 mx-2 mb-2 border-white inline-block font-bold text-sm ${
                  params.name === `${item.name}-${item._id}`
                    ? "bg-lime-500 text-zinc-800"
                    : ""
                }`}
              >
                {item.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
