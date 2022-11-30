import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faLock,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { login } from "../../app/reducer/userSlice";
import request from "../../util/index";
import RequestLoading from "../loading/RequestLoading";
import Modal from "../modal/Modal";
import Styles from "./Profile.module.css";
function Info({ profile, onChangeAvatar }) {
  //console.log(FormData);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState(profile.userName);
  const [name, setname] = useState(profile.info.name);
  const [gender, setGender] = useState(profile.info.isFemale);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const updateProfile = async () => {
    setModal(false);
    setPassword("");
    setLoading(true);
    let form = new FormData();
    form.append("avatar", file);
    form.append("name", name);
    form.append("gender", gender);
    form.append("password", password);
    const res = await request.post("api/account/profile/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    if (res.data.success) {
      setStatus(res.data.status);
      dispatch(login(res.data.user));
    } else {
      window.location.reload();
    }
  };
  const showPassword = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
    input.focus();
  };
  const chooseImgHandle = () => {
    document.getElementById("chooseImg").click();
  };
  return (
    <>
      {modal && (
        <Modal
          type="Xác nhận"
          text="Bạn có chắc muốn thực hiện hành động này?"
          onCancel={() => setModal(false)}
          onAccept={updateProfile}
        />
      )}
      {loading && (
        <RequestLoading url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif" />
      )}
      <div className={`w-2/3 ml-5 ${Styles.infoContainer}`}>
        <h1 className="uppercase text-3xl font-bold font-mono mb-10 text-lime-500">
          Thông tin tài khoản
        </h1>
        <h1 className="text-red-500">{status}</h1>
        <div className={`flex py-1 items-center my-5 ${Styles.infoItem}`}>
          <h1 className="w-24 font-bold text-white/50">Email</h1>
          <div className="flex-1 flex bg-white px-1 py-3 items-center rounded text-black/60 font-bold">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              className="outline-none border-none bg-transparent flex-1 ml-2  hover:cursor-not-allowed"
              value={userName}
              readOnly
            />
          </div>
        </div>
        <div className={`flex py-1 items-center my-5 ${Styles.infoItem}`}>
          <h1 className="w-24 font-bold text-white/50">Họ tên</h1>
          <div className="flex-1 flex px-1 py-3 items-center text-neutral-300 font-bold border-b border-white/30 focus-within:border-blue-500">
            <FontAwesomeIcon icon={faUser} />
            <input
              className="outline-none border-none bg-transparent flex-1 ml-2"
              value={name}
              onInput={(e) => setname(e.target.value)}
            />
          </div>
        </div>
        <div className={`flex py-1 items-center my-5 ${Styles.infoItem}`}>
          <h1 className="w-24 font-bold text-white/50">Giới tính</h1>
          <div className="flex-1 flex px-1 py-3 items-center text-neutral-300 font-bold">
            <div className="flex mr-8">
              <input
                type="radio"
                className="hover:cursor-pointer checked:accent-lime-400"
                checked={!gender}
                onChange={() => setGender(false)}
              />
              <h1 className="ml-1">Nam</h1>
            </div>
            <div className="flex">
              <input
                type="radio"
                className="hover:cursor-pointer checked:accent-lime-400"
                checked={gender}
                onChange={() => setGender(true)}
              />
              <h1 className="ml-1">Nữ</h1>
            </div>
          </div>
        </div>
        <div className={`flex py-1 items-center my-5 ${Styles.infoItem}`}>
          <h1 className="w-24 font-bold text-white/50">Mật khẩu</h1>
          <div className="flex-1 flex px-1 py-3 items-center text-neutral-300 font-bold border-b border-white/30 focus-within:border-blue-500">
            <FontAwesomeIcon icon={faLock} />
            <input
              id="password"
              className="outline-none border-none bg-transparent flex-1 ml-2"
              placeholder="Để trống nếu không muốn đổi"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              type={"password"}
            />
            <FontAwesomeIcon
              className="mr-2 text-white/50 hover:cursor-pointer"
              icon={faEyeSlash}
              onClick={showPassword}
            />
          </div>
        </div>
        <div className={`flex py-1 items-center my-5 ${Styles.infoItem}`}>
          <h1 className="w-24 font-bold text-white/50">Avatar</h1>
          <div className="flex-1 text-xs flex px-1 py-3 items-center text-neutral-300 font-bold">
            <p
              className="py-1 px-3 rounded font-mono hover:cursor-pointer hover:bg-red-400 bg-red-500 text-black font-bold"
              onClick={chooseImgHandle}
            >
              Chọn ảnh
            </p>
            <input
              accept=".jpg, .png"
              id="chooseImg"
              type="file"
              className="outline-none border-none bg-transparent flex-1 ml-2 hover:cursor-pointer hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                onChangeAvatar(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <h1
            className="py-2 px-5 bg-yellow-500 inline-block text-lg rounded font-mono text-black uppercase font-bold hover:cursor-pointer hover:bg-yellow-400"
            onClick={() => setModal(true)}
          >
            Cập nhật
          </h1>
        </div>
      </div>
    </>
  );
}
export default Info;
