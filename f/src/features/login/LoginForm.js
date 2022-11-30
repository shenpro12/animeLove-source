import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Styles from "./LoginPage.module.css";
import ForgotForm from "./ForgotForm";
import request from "../../util/index";
import RequestLoading from "../loading/RequestLoading";
import { login } from "../../app/reducer/userSlice";
function LoginForm({ onClick }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [forgotForm, setForgotForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    forgotForm
      ? (document.title = "Quên mật khẩu")
      : (document.title = "Đăng nhập");
  });
  const showPassword = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
    input.focus();
  };
  const loginHandle = async () => {
    setLoading(true);
    const res = await request.post("api/account/login", {
      data: { userName, password },
    });
    setLoading(false);
    if (res.data.mess) {
      setStatus(res.data.mess);
      setPassword("");
    }
    if (res.data.status) {
      navigate(-1);
      dispatch(login(res.data.userProfile));
    }
  };
  const google = () => {
    document.cookie = "loginRedirec=yes; path=/";
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return forgotForm ? (
    <ForgotForm onCancel={() => setForgotForm(false)} />
  ) : (
    <>
      {loading && (
        <RequestLoading url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665478865/giphy_1_s9aibq.gif" />
      )}
      <h1 className="uppercase mb-8 text-4xl mt-5 font-bold font-mono">
        Đăng nhập
      </h1>
      <div className="xl:w-2/4 sm:w-3/4 md:w-2/4">
        <h1 className="text-red-500">{status}</h1>
        <div className={Styles.inputContainer}>
          <FontAwesomeIcon className="mr-2 text-white/50" icon={faEnvelope} />
          <input
            autoFocus
            className={Styles.loginInput}
            placeholder="Email"
            value={userName}
            onInput={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={Styles.inputContainer}>
          <FontAwesomeIcon className="mr-2 text-white/50" icon={faLock} />
          <input
            type={"password"}
            className={Styles.loginInput}
            placeholder="Mật khẩu"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            id="password"
          />
          <FontAwesomeIcon
            className="mr-2 text-white/50 hover:cursor-pointer"
            icon={faEyeSlash}
            onClick={showPassword}
          />
        </div>
        <h1
          className="text-xs w-max hover:cursor-pointer text-sky-600 hover:text-sky-500"
          onClick={() => setForgotForm(true)}
        >
          Quên mật khẩu?
        </h1>
      </div>
      <div className="w-2/4 flex justify-center mb-3 mt-5">
        <h1
          className={`py-2 px-4 w-full bg-white/40 rounded text-center pointer-events-none text-lg ${
            userName && password && Styles.btn_active
          }`}
          onClick={loginHandle}
        >
          Đăng nhập
        </h1>
      </div>
      <div className="w-2/4 flex justify-center mb-2 items-center">
        <div className="border-b border-white/20 flex-1"></div>
        <h1 className="rounded text-center text-lg text-white/80 mx-3">Or</h1>
        <div className="border-b border-white/20 flex-1"></div>
      </div>
      <div className="w-2/4 flex justify-center mb-5">
        <h1
          className="bg-red-700 py-2 px-4 w-full rounded text-center text-lg hover:cursor-pointer hover:bg-red-600"
          onClick={google}
        >
          Google +
        </h1>
      </div>

      <div className="flex xl:w-2/4 sm:w-3/4 md:w-2/4">
        <h1 className="flex flex-wrap items-center">
          Chưa có tài khoản?{" "}
          <span
            onClick={onClick}
            className="mx-1 flex px-2 bg-yellow-500 rounded-lg text-black hover:cursor-pointer"
          >
            Đăng ký
          </span>{" "}
          ngay!
        </h1>
      </div>
    </>
  );
}
export default LoginForm;
