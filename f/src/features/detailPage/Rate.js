import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, Profiler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Styles from "./DetailPage.module.css";
import { isLogin, getProfile } from "../../app/reducer/userSlice";
import { add } from "../../app/reducer/animeSlice";
import request from "../../util/index";
import SiteNotify from "../siteNotify/SiteNotify";

export const initStar = (arr) => {
  if (arr.length) {
    let totalRate = arr.length,
      ratePoint = arr.reduce((total, currentValue) => {
        return total.point + currentValue.point;
      });
    if (typeof ratePoint === "object") {
      ratePoint = ratePoint.point;
    }
    return { totalRate, ratePoint: ratePoint / arr.length };
  } else {
    return { totalRate: 0, ratePoint: 0 };
  }
};
function Rate({ rate }) {
  const dispatch = useDispatch();
  const params = useParams();
  const profile = useSelector(getProfile);
  const login = useSelector(isLogin);
  const rateStatus = [
    "Dở tệ",
    "Dở",
    "Không hay",
    "Không hay lắm",
    "Bình thường",
    "Xem được",
    "Có vẻ hay",
    "Hay",
    "Rất hay",
    "Hay tuyệt",
  ];

  const [star, setStar] = useState(initStar(rate));
  const [notifyType, setNotifyType] = useState({
    type: "",
    text: "",
  });
  const highLightStar = (index, elementList) => {
    for (let i = 0; i < elementList.length; i++) {
      if (i <= index) {
        elementList[i].classList.add(Styles.starActive);
      } else {
        elementList[i].classList.remove(Styles.starActive);
      }
    }
    document.getElementById("rateStatus").innerText =
      rateStatus[Math.floor(index)];
  };
  const starHandle = (element) => {
    const elementList = document.querySelectorAll("#star");
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i] === element) {
        highLightStar(i, elementList);
        return;
      }
    }
  };
  const resetHighLightStar = () => {
    highLightStar(star.ratePoint - 1, document.querySelectorAll("#star"));
    document.getElementById("rateStatus").innerText = "";
  };
  const sendStar = async (point) => {
    if (login) {
      let temp = [...rate];
      let bool = true;
      temp = temp.map((item) => {
        let star = { userId: item.userId, point: item.point };
        if (star.userId === profile._id) {
          star.point = point;
          bool = false;
        }
        return star;
      });
      if (bool) {
        temp.push({
          userId: profile._id,
          point,
        });
      }
      setStar(initStar(temp));
      const res = await request.post("api/anime/star", {
        data: {
          animeId: params.name.split("-")[params.name.split("-").length - 1],
          rate: temp,
        },
      });
      if (res.data.status) {
        setNotifyType({ type: "check", text: "Gửi thành công!" });
      }
      if (res.data.data.length) {
        dispatch(add(res.data.data));
      }
    } else {
      setNotifyType({ type: "err", text: "Vui lòng đăng nhập!" });
    }
  };
  const voteStarHandle = (element) => {
    let tempElement = element;
    const elementList = document.querySelectorAll("#starContainer");
    if (tempElement.target.nodeName === "svg") {
      tempElement = tempElement.target.parentElement;
    } else if (tempElement.target.nodeName === "path") {
      tempElement = tempElement.target.parentElement.parentElement;
    } else {
      tempElement = tempElement.target;
    }
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i] === tempElement) {
        sendStar(i + 1);
        return;
      }
    }
  };
  useEffect(() => {
    resetHighLightStar();
  });
  useEffect(() => {
    setStar(initStar(rate));
  }, [rate]);
  return (
    <>
      <SiteNotify
        notifyType={notifyType}
        hideNotify={() =>
          setNotifyType({
            type: "",
            text: "",
          })
        }
      />
      <div className="ml-2 mb-3 w-full flex items-center">
        <div
          className={`mr-3 border-2 border-lime-500 rounded-full w-11 h-11 flex justify-center items-center`}
        >
          <h1 className="font-bold text-lime-500 font-mono">
            {(star.ratePoint * 100) / 10}%
          </h1>
        </div>
        <div
          className={`flex-1 justify-center flex flex-col ${Styles.starContainer}`}
        >
          <div onMouseLeave={resetHighLightStar} className="flex flex-wrap">
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
            <div
              id="starContainer"
              onClick={(e) => {
                voteStarHandle(e);
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalfStroke}
                className=" text-white/70 mx-0.5 text-sm hover:cursor-pointer duration-150"
                id="star"
                onMouseOver={(e) => {
                  starHandle(e.target);
                }}
              />
            </div>
          </div>
          <div>
            {star.totalRate ? (
              <h1 className="text-xs">
                (Đánh giá{" "}
                <span className="font-bold text-lime-500">
                  {star.ratePoint}
                </span>
                /10 từ{" "}
                <span className="font-bold text-lime-500">
                  {star.totalRate}
                </span>{" "}
                thành viên)
              </h1>
            ) : (
              <h1 className="text-xs">(Chưa có lượt đánh giá)</h1>
            )}
          </div>
          <h1 className="text-xs font-semibold mt-1" id="rateStatus"></h1>
        </div>
      </div>
    </>
  );
}
export default Rate;
