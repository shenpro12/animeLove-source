import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { getFilmInventory } from "../../app/reducer/userSlice";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { getAnimeById, dataFormat } from "../../util/queryDataHelper";
import Styles from "./FilmInventory.module.css";
import InventoryContent from "./InventoryContent";
function FilmInventory() {
  const navigate = useNavigate();
  const filmInventory = useSelector(getFilmInventory);

  const animeList = useSelector(selectAnimeList).animeList;
  const [renderData, setRenderData] = useState(
    filmInventory ? getAnimeById(dataFormat(animeList), filmInventory) : []
  );
  const myFavored = useRef();
  useEffect(() => {
    if (!filmInventory) {
      navigate("/");
    }
    myFavored.current.scrollIntoView({
      behavior: "smooth",
    });
    document.title = `Yêu thích`;
  });

  useEffect(() => {
    setRenderData(
      filmInventory ? getAnimeById(dataFormat(animeList), filmInventory) : []
    );
  }, [filmInventory]);
  return (
    <div className={Styles.filmInventoryContainer}>
      <h1 className="mb-2 text-sm font-medium">
        <FontAwesomeIcon icon={faHouse} className="mr-1" />
        <Link to={"/"} className="hover:text-lime-400">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to={"/profile"} className="hover:text-lime-400">
          Tài khoản
        </Link>{" "}
        /{" "}
        <Link to={"/inventory"} className="hover:text-lime-400">
          Yêu thích
        </Link>
      </h1>
      <div className="flex justify-between flex-wrap" ref={myFavored}>
        <h1 className="uppercase px-2 py-2 mt-2 bg-pink-600 inline-block rounded font-mono font-bold text-lg mb-1">
          Yêu thích
        </h1>
      </div>
      {renderData.length ? (
        <InventoryContent data={renderData} />
      ) : (
        <div className="w-full h-12 mt-5 flex justify-center items-center">
          <h1>Bạn chưa yêu thích phim nào!</h1>
        </div>
      )}
    </div>
  );
}
export default FilmInventory;
