import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Styles from "./DetailPage.module.css";
function DetailContent({ data, type }) {
  const params = useParams();
  return (
    <div className={`${Styles.detailContent_container}`}>
      <div
        className={`${Styles.info} ${
          type === "info" && Styles.active
        } w-full h-0 `}
      >
        <div className="w-full h-full p-3 flex items-center">
          <ul className="flex flex-wrap items-center h-full">
            {" "}
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold flex items-center flex-wrap">
                  Tập mới:{" "}
                  <span className="text-lime-400 font-normal flex flex-wrap">
                    {[...data.total_episode].reverse().map((item, index) => {
                      if (index <= 2)
                        return (
                          <Link
                            className="m-1"
                            key={index}
                            to={`/anime/${params.name}/episode-${
                              data.total_episode.length - index
                            }`}
                          >
                            <h1 className="px-2 py-1 bg-zinc-600 hover:bg-lime-500 duration-300 text-white font-bold">
                              {data.total_episode.length - index}
                              {index === 0 && "-end"}
                            </h1>
                          </Link>
                        );
                    })}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Trạng thái:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.done ? "Hoàn thành" : "Đang tiến hành"}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Thể loại:{" "}
                  {data.category.map((item, index) => (
                    <Link key={index} to={`/category/${item}`}>
                      <span className="text-lime-400 font-normal">
                        {`${item}, `}
                      </span>
                    </Link>
                  ))}
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Đạo diễn:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.director}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Quốc gia:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.country}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Thời lượng:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.total_episode.length}/{data.total_ep}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Rating:{" "}
                  <span className="text-lime-400 font-normal">
                    PG-{data.rating} - Teens {data.rating} tuổi trở lên
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Studio:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.studio}
                  </span>
                </h1>
              </div>
            </li>
            <li className="w-2/4 px-4 py-1">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="text-xs text-lime-400"
                  icon={faCircleDot}
                />
                <h1 className="ml-2 font-bold">
                  Năm phát hành:{" "}
                  <span className="text-lime-400 font-normal">
                    {data.release_year}
                  </span>
                </h1>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${Styles.trailer} ${
          type === "trailer" && Styles.active
        } w-full h-0`}
      >
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${data.trailer}`}
          allowFullScreen="allowfullscreen"
        ></iframe>
      </div>

      <div
        className={`${Styles.imagedirectoty} ${
          type === "imageDirectory" && Styles.active
        } w-full h-0`}
      >
        <img
          src={data.image}
          className="w-full object-cover h-full"
          alt="info"
        />
      </div>
    </div>
  );
}

export default DetailContent;
