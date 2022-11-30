import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, isLogin } from "../../app/reducer/userSlice";
import Avatar from "./Avatar";
import Info from "./Info";
import Styles from "./Profile.module.css";
function Profile() {
  const navigate = useNavigate();
  const profile = useSelector(getProfile);
  const login = useSelector(isLogin);
  const [avatarUrl, setAvatarUrl] = useState(profile.info.avatar);
  useEffect(() => {
    if (login) {
      document.title = `Thông tin | ${
        profile.info.name ? profile.info.name : profile.userName
      }`;

      window.scrollTo({
        top: document.getElementById("profile").offsetTop - 10,
        left: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  });
  useEffect(() => {
    setAvatarUrl(profile.info.avatar);
  }, [profile]);
  return login ? (
    <div
      className={`${Styles.profile_container} flex-1 bg-slate-800/80 -mr-15 mb-5 py-12 px-5 h-max rounded-sm`}
      id="profile"
    >
      <div className="w-full flex">
        <Avatar
          url={avatarUrl}
          className="w-36 h-36 rounded-full mt-7 object-cover border-2 border-white"
          userData={profile.info.name}
        />
        <Info profile={profile} onChangeAvatar={(url) => setAvatarUrl(url)} />
      </div>
    </div>
  ) : (
    ""
  );
}
export default Profile;
