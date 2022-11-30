import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faFilm,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./DetailPage.module.css";
function DetailOption({ active, onChange }) {
  return (
    <div className={`${Styles.detailOption_container} flex flex-wrap`}>
      <div
        className={`flex mx-5 px-3 items-center justify-center flex-wrap ${
          !(active === "info") && `hover:text-red-400`
        } hover:cursor-pointer py-5 ${
          active === "info" && "text-lime-400 border-b-4 border-lime-400"
        }`}
        onClick={() => {
          onChange("info");
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} />
        <h1
          className={`${Styles.optionText} ${
            active === "info" && Styles.optionTextActive
          } ml-3`}
        >
          Thông tin phim
        </h1>
      </div>
      <div
        className={`flex mx-5 px-3 items-center justify-center flex-wrap ${
          !(active === "trailer") && `hover:text-red-400`
        } hover:cursor-pointer py-5 ${
          active === "trailer" && "text-lime-400 border-b-4 border-lime-400"
        }`}
        onClick={() => {
          onChange("trailer");
        }}
      >
        <FontAwesomeIcon icon={faFilm} />
        <h1
          className={`${Styles.optionText} ${
            active === "trailer" && Styles.optionTextActive
          } ml-3`}
        >
          Trailer
        </h1>
      </div>
      <div
        className={`flex mx-5 px-3 items-center justify-center flex-wrap ${
          !(active === "imageDirectory") && `hover:text-red-400`
        } hover:cursor-pointer py-5 ${
          active === "imageDirectory" &&
          "text-lime-400 border-b-4 border-lime-400"
        }`}
        onClick={() => {
          onChange("imageDirectory");
        }}
      >
        <FontAwesomeIcon icon={faImages} />
        <h1
          className={`${Styles.optionText} ${
            active === "imageDirectory" && Styles.optionTextActive
          } ml-3`}
        >
          Hình ảnh
        </h1>
      </div>
    </div>
  );
}

export default DetailOption;
