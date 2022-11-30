import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  getFilmInventory,
  updateInventory,
  isLogin,
} from "../../app/reducer/userSlice";
import request from "../../util/index";
function FavoredButton({ containerClassName, textClassName }) {
  const dispatch = useDispatch();
  const login = useSelector(isLogin);
  const filmInventory = useSelector(getFilmInventory);
  const params = useParams();
  const initIsFollow = () => {
    if (filmInventory) {
      return filmInventory.find((item) => {
        return (
          item.animeId ===
          params.name.split("-")[params.name.split("-").length - 1]
        );
      });
    } else {
      return false;
    }
  };
  const [isFollow, setFollow] = useState(initIsFollow);
  useEffect(() => {
    setFollow(initIsFollow);
  });
  const followBtnHandle = async () => {
    let temp = [...filmInventory];
    if (isFollow) {
      temp = temp.filter(
        (item) =>
          item.animeId !==
          params.name.split("-")[params.name.split("-").length - 1]
      );
      dispatch(updateInventory([...temp]));
      await request.post("api/anime/inventory/remove", {
        data: {
          animeId: params.name.split("-")[params.name.split("-").length - 1],
        },
      });
    } else {
      let temp = [...filmInventory];
      temp.push({
        animeId: params.name.split("-")[params.name.split("-").length - 1],
      });
      dispatch(updateInventory([...temp]));
      await request.post("api/anime/inventory/add", {
        data: {
          animeId: params.name.split("-")[params.name.split("-").length - 1],
        },
      });
    }
  };
  return (
    login && (
      <div className={containerClassName} onClick={followBtnHandle}>
        <FontAwesomeIcon
          icon={faHeart}
          className={`mr-2 ${isFollow ? " text-pink-500" : "text-white/40"}`}
        />
        <p className={textClassName}>{isFollow ? "Bỏ thích" : "Thích"}</p>
      </div>
    )
  );
}
export default FavoredButton;
