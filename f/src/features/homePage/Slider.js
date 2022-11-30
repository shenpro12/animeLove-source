import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faVideo,
  faClapperboard,
  faPlay,
  faEye,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Styles from "./HomePage.module.css";
import "./HomePage.css";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
function Slider() {
  const animeList = useSelector(selectAnimeList).animeList;
  const [renderData, setRenderData] = useState(() => {
    let temp = [];
    for (let i = 0; i <= 9; i++) {
      temp.push(queryData(dataFormat(animeList), "all")[i]);
    }
    return temp.filter((i) => (i ? true : false));
  });
  useEffect(() => {
    setRenderData(() => {
      let temp = [];
      for (let i = 0; i <= 4; i++) {
        temp.push(queryData(dataFormat(animeList), "all")[i]);
      }
      return temp.filter((i) => (i ? true : false));
    });
  }, [animeList]);
  useEffect(() => {
    const paga = document.getElementsByClassName("swiper-pagination")[0];
    paga.style.textAlign = "right";
    paga.style.padding = "0px 20px 0px 0px";
  });

  return (
    <div className="bg-white rounded mb-5 relative">
      <div className="w-full relative h-80 flex items-center">
        <div className="w-full absolute">
          <Swiper
            grabCursor={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
          >
            {renderData.length
              ? renderData.reverse().map((i) => (
                  <SwiperSlide key={i._id}>
                    <div
                      className="h-80 rounded-sm"
                      style={{
                        backgroundImage: `url(${i.background_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="sliderItemContent p-5">
                        <h1
                          className={`text-lime-500 text-4xl font-semibold ${Styles.name}`}
                        >
                          {i.name.jp || i.name.en || i.name.vn}
                        </h1>
                        <div className="w-full h-10 flex flex-wrap">
                          <div className="mx-1 flex justify-center items-center">
                            <FontAwesomeIcon
                              className=" text-white/60 text-sm"
                              icon={faCalendarDays}
                            />
                            <h1 className="mx-2 font-medium text-sm text-white">
                              {i.total_episode.length}/{i.total_ep}
                            </h1>
                          </div>
                          <div className="mx-1 flex justify-center items-center">
                            <FontAwesomeIcon
                              className="text-white/60 text-sm"
                              icon={faClockRotateLeft}
                            />
                            <h1 className="mx-2 font-medium text-sm text-white">
                              {i.release_year}{" "}
                            </h1>
                          </div>
                          <div className="mx-1 flex justify-center items-center">
                            <FontAwesomeIcon
                              className="text-white/60 text-sm"
                              icon={faEye}
                            />
                            <h1 className="mx-2 font-medium text-sm text-white">
                              {i.views.total_view}
                            </h1>
                          </div>
                        </div>
                        <h1 className={Styles.description}>{i.description}</h1>
                        <div className="flex mt-3">
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="mt-auto mb-auto mr-2 text-lime-400/70 text-sm"
                          />
                          <h1 className="text-lime-500 text-sm truncate">
                            <span className="font-bold text-white">
                              Studio:
                            </span>{" "}
                            {i.studio}
                          </h1>
                        </div>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faClapperboard}
                            className="mt-auto mb-auto mr-2 text-lime-400/70 text-sm"
                          />
                          <h1 className="text-lime-500 text-sm truncate">
                            <span className="font-bold text-white">
                              Thể loại:
                            </span>{" "}
                            {i.category.map((item, index) => (
                              <div className="inline-block" key={index}>
                                <Link
                                  className="hover:text-white/80"
                                  to={`/category/${item}`}
                                >{`${item}`}</Link>
                                ,{" "}
                              </div>
                            ))}
                          </h1>
                        </div>
                        <div>
                          <Link
                            to={`/anime/${
                              i.name.jp || i.name.en || i.name.vn
                            }-${i._id}`}
                          >
                            <h1 className="py-2 px-3 bg-red-700 rounded-sm inline-block items-center hover:cursor-pointer hover:bg-slate-900 duration-300 mt-5">
                              <FontAwesomeIcon icon={faPlay} className="mr-2" />
                              Xem phim
                            </h1>
                          </Link>
                        </div>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
export default memo(Slider);
