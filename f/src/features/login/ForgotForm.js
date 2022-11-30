import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import request from "../../util";
import RequestLoading from "../loading/RequestLoading";

import Styles from "./LoginPage.module.css";

function ForgotForm({ onCancel }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setuserName] = useState("");
  const forgotPasswordHandle = async () => {
    setLoading(true);
    const res = await request.post("api/account/password", {
      data: {
        userName,
      },
    });
    setLoading(false);
    if (res.data.message) {
      setStatus(res.data.message);
    }
  };
  return (
    <>
      {loading && (
        <RequestLoading url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665478865/giphy_1_s9aibq.gif" />
      )}
      <h1 className="uppercase mb-8 text-4xl mt-5 font-bold font-mono">
        Quên mật khẩu
      </h1>
      <h1 className="text-red-500">{status}</h1>
      <div className="xl:w-2/4 sm:w-3/4 md:w-2/4">
        <div className={Styles.inputContainer}>
          <FontAwesomeIcon className="mr-2 text-white/50" icon={faEnvelope} />
          <input
            className={Styles.loginInput}
            placeholder="Email đăng nhập"
            value={userName}
            onInput={(e) => setuserName(e.target.value)}
          />
        </div>
      </div>
      <div className="xl:w-2/4 sm:w-3/4 md:w-2/4 flex justify-center mb-5">
        <h1
          className="py-2 px-4 w-full bg-red-700 rounded hover:cursor-pointer text-center hover:bg-red-800 text-lg"
          onClick={forgotPasswordHandle}
        >
          Xác nhận
        </h1>
      </div>
      <div className="flex xl:w-2/4 sm:w-3/4 md:w-2/4">
        <h1 className="flex flex-wrap items-center">
          Trở lại{" "}
          <span
            onClick={onCancel}
            className="mx-1 flex px-2 bg-white/70 rounded-lg text-black hover:cursor-pointer"
          >
            Đăng nhập
          </span>
        </h1>
      </div>
    </>
  );
}
export default ForgotForm;
