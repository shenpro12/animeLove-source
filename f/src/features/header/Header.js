import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Styles from "./Header.module.css";
import DropBox from "./DropBox";
import Search from "./Search";
import LoginButton from "./LoginButton";
const category = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Harem",
  "School",
  "Shoujo",
  "Romance",
  "Samurai",
  "Music",
  "Mecha",
  "Yuri",
  "Yaoi",
  "Shounen",
  "LiveAction",
  "Game",
  "Isekai",
  "Magic",
];
const type = ["TV/Series", "Movie/OVA", "Anime sắp chiếu"];
function Header() {
  const [navbar, setnavBar] = useState(false);
  const [dropBoxType, setDropBoxType] = useState("");

  const navBar_Toggle = () => {
    if (window.innerWidth <= 915) setnavBar(!navbar);
    if (!navbar) {
      setDropBoxType("");
    }
  };
  return (
    <div className={Styles.header_container}>
      <div
        className={`${Styles.header_overlay} ${
          navbar && Styles.overlay_active
        }`}
        onClick={navBar_Toggle}
      ></div>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1664943027/logo_prgtsn.png"
          alt="logo"
        />
      </Link>
      <ul className={`${Styles.header_item} ${navbar && Styles.navbar_active}`}>
        <Link to="/" onClick={navBar_Toggle}>
          <li>Trang chủ</li>
        </Link>
        <li
          className={dropBoxType === "category" ? Styles.hoverTransparent : ""}
          onClick={() => {
            if (!dropBoxType || dropBoxType) {
              setDropBoxType("category");
            }
            if (dropBoxType === "category") {
              setDropBoxType("");
            }
          }}
        >
          Thể loại
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`${Styles.down_icon} ${
              dropBoxType === "category" ? "rotate-180" : ""
            }  duration-300`}
          />
          <DropBox
            item={category}
            className={dropBoxType === "category" ? Styles.dropBox_active : ""}
            onChoose={navBar_Toggle}
          />
        </li>
        <li
          className={dropBoxType === "type" ? Styles.hoverTransparent : ""}
          onClick={() => {
            if (!dropBoxType || dropBoxType) {
              setDropBoxType("type");
            }
            if (dropBoxType === "type") {
              setDropBoxType("");
            }
          }}
        >
          Dạng Anime
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`${Styles.down_icon} ${
              dropBoxType === "type" ? "rotate-180" : ""
            }  duration-300`}
          />
          <DropBox
            item={type}
            className={dropBoxType === "type" ? Styles.dropBox_active : ""}
            onChoose={navBar_Toggle}
          />
        </li>
        <Link to="voted" onClick={navBar_Toggle}>
          <li>top anime</li>
        </Link>
        <Link to="library" onClick={navBar_Toggle}>
          <li>Thư viện</li>
        </Link>
        <LoginButton onChoose={navBar_Toggle} />
      </ul>
      <Search onClick={navBar_Toggle} bool={navbar} />
    </div>
  );
}

export default Header;
