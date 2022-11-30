import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faAngleDown,
  faUser,
  faHeart,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, memo } from "react";
import Styles from "./Header.module.css";
import { isLogin, getProfile } from "../../app/reducer/userSlice";
import request from "../../util/index";
import { logout } from "../../app/reducer/userSlice";
import RequestLoading from "../loading/RequestLoading";
import Modal from "../modal/Modal";
function LoginButton({ onChoose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkLogin = useSelector(isLogin);
  const profile = useSelector(getProfile);
  const [modal, setModal] = useState(false);
  const [loginOption, setLoginOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoutHandle = async () => {
    setModal(false);
    setLoading(true);
    const res = await request.post("auth/logout");
    setLoading(false);
    if (res.status) {
      setLoginOption(false);
      dispatch(logout());
      if (location.pathname.includes("profile")) {
        navigate("/");
      }
    }
  };
  return checkLogin ? (
    <>
      {modal && (
        <Modal
          type="Xác nhận"
          text="Bạn có chắc muốn đăng xuất?"
          onCancel={() => setModal(false)}
          onAccept={logoutHandle}
        />
      )}
      {loading && (
        <RequestLoading url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif" />
      )}
      <div className={Styles.login_container}>
        <FontAwesomeIcon icon={faBell} className="text-white mr-3 text-lg" />
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => setLoginOption(!loginOption)}
        >
          <img
            src={
              profile.info.avatar
                ? profile.info.avatar
                : "https://res.cloudinary.com/dhhkjmfze/image/upload/v1661132447/user_zldhyu.png"
            }
            className="w-7 h-7 mr-1 z-50 rounded-full"
            referrerPolicy="no-referrer"
          />
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`text-white mr-3 duration-150 hover:text-lime-500 z-50 ${
              loginOption && "rotate-180"
            }`}
          />
          <div
            className={`${
              loginOption ? "block" : "hidden"
            } fixed bg-transparent top-0 bottom-0 left-0 right-0 z-40`}
          ></div>
          <div
            className={`${
              loginOption
                ? "w-max h-max py-1 opacity-100 "
                : "w-0 py-0 px-0 h-0 overflow-hidden opacity-50"
            } ${Styles.loginOption}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link to={`/profile`} onClick={() => setLoginOption(false)}>
              <div className="flex items-center hover:cursor-pointer my-1 px-5 duration-200 hover:bg-white/10 hover:text-white">
                <FontAwesomeIcon className="mr-2" icon={faUser} />
                <h1>Thông tin tài khoản</h1>
              </div>
            </Link>
            <Link to={`/inventory`} onClick={() => setLoginOption(false)}>
              <div className="flex items-center hover:cursor-pointer my-1 px-5 duration-200 hover:bg-white/10 hover:text-white">
                <FontAwesomeIcon className="mr-2" icon={faHeart} />
                <h1>Yêu thích</h1>
              </div>
            </Link>
            <div
              className="flex items-center hover:cursor-pointer my-1 px-5 duration-200 hover:bg-white/10 hover:text-white"
              onClick={() => setModal(true)}
            >
              <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} />
              <h1>Đăng xuất</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Link to="/login" className="block mt-auto mb-auto mx-2">
      <p className={Styles.login_btn} onClick={onChoose}>
        Đăng nhập
      </p>
    </Link>
  );
}
export default memo(LoginButton);
