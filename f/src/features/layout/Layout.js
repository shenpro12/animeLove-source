import { Outlet } from "react-router-dom";
import Styles from "./Layout.module.css";
import SideBar from "../sideBar/SideBar";

function Layout() {
  return (
    <div className={Styles.layout_container}>
      <Outlet />
      <SideBar />
    </div>
  );
}

export default Layout;
