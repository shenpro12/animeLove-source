import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faClose,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Styles from "./LoginPage.module.css";
import request from "../../util/index";
import RequestLoading from "../loading/RequestLoading";
function SiginForm({ onClick }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [re_Password, setRe_Password] = useState("");
  const [validation, setValidation] = useState({
    userName: false,
    password: false,
    re_Password: false,
  });
  useEffect(() => {
    document.title = "Đăng ký tài khoản";
  });
  useEffect(() => {
    setValidation({
      userName: userName
        ? /^[A-Za-z0-9]{6,30}@gmail.com$/g.test(userName)
          ? false
          : true
        : false,
      password: password
        ? /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
            password
          )
          ? false
          : true
        : false,
      re_Password: re_Password
        ? re_Password === password
          ? false
          : true
        : false,
    });
  }, [userName, password, re_Password]);
  const showPassword = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
    input.focus();
  };
  const siginHandle = async () => {
    setLoading(true);
    const res = await request.post("api/account/sigin", {
      data: { userName, password, re_Password },
    });
    setLoading(false);
    setStatus(res.data.status);
    setPassword("");
    setRe_Password("");
  };
  return (
    <>
      {loading && (
        <RequestLoading url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665478865/giphy_1_s9aibq.gif" />
      )}
      <h1 className="uppercase mb-8 text-4xl mt-5 font-bold font-mono">
        Đăng ký
      </h1>

      <div className="xl:w-2/4 sm:w-3/4 md:w-2/4">
        <h1 className="text-red-500">{status}</h1>
        <div className={Styles.inputContainer}>
          <FontAwesomeIcon className="mr-2 text-white/50" icon={faEnvelope} />
          <input
            autoFocus
            className={Styles.loginInput}
            placeholder="Email đăng nhập"
            value={userName}
            onInput={(e) => setUserName(e.target.value)}
          />
          {validation.userName && (
            <FontAwesomeIcon icon={faClose} className="text-red-600" />
          )}
        </div>
        {validation.userName && (
          <h1 className="text-xs text-red-500">
            Chỉ hỗ trợ những Email có đuôi example@gmail.com
          </h1>
        )}
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
          {validation.password && (
            <FontAwesomeIcon icon={faClose} className="text-red-600" />
          )}
        </div>
        {validation.password && (
          <h1 className="text-xs text-red-500">
            Mật khẩu phải có độ dài 8 ký tự, bao gồm 1 số, 1 chữ và 1 ký tự đặc
            biệt
          </h1>
        )}
        <div className={Styles.inputContainer}>
          <FontAwesomeIcon className="mr-2 text-white/50" icon={faLock} />
          <input
            type={"password"}
            className={Styles.loginInput}
            placeholder="Nhập lại mật khẩu"
            value={re_Password}
            onInput={(e) => setRe_Password(e.target.value)}
          />
          {validation.re_Password && (
            <FontAwesomeIcon icon={faClose} className="text-red-600" />
          )}
        </div>
        {validation.re_Password && (
          <h1 className="text-xs text-red-500 mb-5">Mật khẩu không khớp</h1>
        )}
      </div>
      <div className={`w-2/4 flex justify-center mb-5`}>
        <h1
          className={`text-center py-2 w-full px-4 bg-white/40 pointer-events-none rounded text-lg ${
            !validation.userName &&
            !validation.password &&
            !validation.re_Password &&
            userName &&
            password &&
            re_Password &&
            Styles.btn_active
          }`}
          onClick={siginHandle}
        >
          Đăng ký
        </h1>
      </div>
      <div className="flex xl:w-2/4 sm:w-3/4 md:w-2/4">
        <h1 className="flex flex-wrap items-center">
          Đã có tài khoản?{" "}
          <span
            onClick={onClick}
            className="mx-1 flex px-2 bg-white/70 rounded-lg text-black hover:cursor-pointer"
          >
            Đăng nhập
          </span>{" "}
          ngay!
        </h1>
      </div>
    </>
  );
}
export default SiginForm;
