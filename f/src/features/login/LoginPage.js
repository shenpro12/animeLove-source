import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "../../app/reducer/userSlice";
import LoginForm from "./LoginForm";
import SiginForm from "./SiginForm";
import Styles from "./LoginPage.module.css";
function Loginpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const checkLogin = useSelector(isLogin);
  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (checkLogin === true) {
      navigate("/");
    }
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("login").offsetTop - 10,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <div className={`${Styles.loginContainer} flex-1 -mr-15 mb-5`} id="login">
      <div className="w-full bg-slate-800/80 rounded-sm p-3 flex flex-col items-center">
        {login ? (
          <LoginForm onClick={() => setLogin(false)} />
        ) : (
          <SiginForm onClick={() => setLogin(true)} />
        )}
      </div>
    </div>
  );
}
export default Loginpage;
