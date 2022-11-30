import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, selectAnimeList } from "./app/reducer/animeSlice";
import request from "./util/index";
import Header from "./features/header/Header";
import Footer from "./features/footer/Footer";
import Loading from "./features/loading/Loading";
import { login } from "./app/reducer/userSlice";
import { parseToObj } from "./util/helper";
import "./App.css";

import TimeWarning from "./features/siteNotify/TimeWarning";
import Mainbanner from "./features/siteNotify/MainBanner";
function App() {
  const startTime = useRef(Date.now());

  const location = useLocation();
  const navigate = useNavigate();
  const [timeWarning, setTimeWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const count = useSelector(selectAnimeList);
  const dispatch = useDispatch();
  const ticker = setInterval(() => {
    if (Date.now() - startTime.current >= 10800000) {
      startTime.current = Date.now();
      setTimeWarning(true);
    }
    if (timeWarning) {
      startTime.current = Date.now();
    }
  }, 60000);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await request.get("api/anime");
      const checkLogin = await request.get("auth/login/success");
      if (checkLogin.data.success) {
        dispatch(login(checkLogin.data.user));
      }
      dispatch(add(res.data.data));
      setLoading(false);
    })();
    if (
      document.cookie.includes("loginRedirec=yes") &&
      parseToObj(document.cookie)
    ) {
      navigate(parseToObj(document.cookie)[0]);
      document.cookie = "loginRedirec=";
    }
  }, []);
  useEffect(() => {
    if (location.pathname !== "/login") {
      document.cookie = `beforeUrl=${location.pathname}; path=/`;
    }
  }, [location.pathname]);
  useEffect(() => {
    return () => {
      clearInterval(ticker);
    };
  });
  const timeWarningHandle = () => {
    setTimeWarning(false);
  };
  return (
    <>
      {timeWarning && <TimeWarning onClick={timeWarningHandle} />}
      <Loading loading={loading} />
      {count.animeList.length ? (
        <div className="App font-custom1">
          <Header />
          <Mainbanner />
          <Outlet />
          <Footer />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
