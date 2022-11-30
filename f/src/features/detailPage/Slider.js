import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Autoplay, Grid } from "swiper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
import Styles from "./DetailPage.module.css";
function Slider({ data, itemId }) {
  const animeList = dataFormat(useSelector(selectAnimeList).animeList);
  const [renderData, setRenderData] = useState(() => {
    let temp = [];
    queryData(animeList, { category: data }).map((i, index) => {
      if (index <= 9 && i._id !== itemId) {
        temp.push(i);
      }
    });
    return temp;
  });
  const [gridCols, setGridCols] = useState(6);
  window.onresize = () => {
    if (window.innerWidth > 700) {
      setGridCols(6);
    } else if (window.innerWidth <= 700 && window.innerWidth >= 570) {
      setGridCols(5);
    } else if (window.innerWidth <= 569 && window.innerWidth >= 460) {
      setGridCols(4);
    } else {
      setGridCols(3);
    }
  };
  useEffect(() => {
    setRenderData(() => {
      let temp = [];
      queryData(animeList, { category: data }).map((i, index) => {
        if (index <= 9 && i._id !== itemId) {
          temp.push(i);
        }
      });
      return temp;
    });
  }, [data, itemId]);
  return (
    <div
      className={`${Styles.slider} p-2 bg-neutral-900 rounded mt-5 mb-5 -mr-15`}
    >
      <h1 className="font-bold">Anime liên quan</h1>
      <div className="my-3 flex flex-row items-end">
        <div className="w-10 h-1 bg-lime-400"></div>
        <div className="h-px flex-1 bg-zinc-800"></div>
      </div>
      <div className="w-full relative h-40 flex items-center">
        <div className="w-full absolute">
          <Swiper
            slidesPerView={gridCols}
            grid={{
              rows: 1,
            }}
            spaceBetween={20}
            modules={[Autoplay, Grid]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {renderData.length
              ? renderData.map((i) => (
                  <SwiperSlide key={i._id}>
                    <div
                      className=" h-32 w-24 overflow-hidden relative"
                      style={{
                        backgroundImage: `url(${i.thumb_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Link
                        to={`/anime/${i.name.jp || i.name.vn || i.name.en}-${
                          i._id
                        }`}
                      >
                        <div className="absolute top-0 bottom-0 left-0 right-0 hover:bg-black/20 hover:cursor-pointer flex justify-center items-center duration-200">
                          <div className="w-10 h-10 bg-transparent border-2 rounded-full border-white m-auto flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={faPlay}
                              className="text-white text-1xl"
                            />
                          </div>
                        </div>
                      </Link>
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
export default Slider;
