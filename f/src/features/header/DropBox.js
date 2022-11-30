import { Link } from "react-router-dom";
import Styles from "./Header.module.css";

function DropBox({ item, className, onChoose }) {
  return (
    <>
      <div className={`${Styles.dropBox_Arrow} rotate-45 ml-7`}></div>
      <div
        className={`${Styles.dropBox_container} grid-cols-3 ${className}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {item.map((item, index) => (
          <Link
            key={index}
            to={`category/${
              (item === "TV/Series" && "Anime bộ") ||
              (item === "Movie/OVA" && "Anime lẻ") ||
              item
            }`}
          >
            <p
              className={Styles.header_type}
              onClick={() => {
                onChoose();
              }}
            >
              {item}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default DropBox;
