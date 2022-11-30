import Styles from "./SideBar.module.css";
import AutoChoose from "./AutoChoose";
import BannerAds from "./BannerAds";
import ListAnime from "./ListAnime";
import NewAnime from "./NewAnime";
import Voted from "./Voted";
function SideBar() {
  return (
    <div className={Styles.sideBar_container}>
      <AutoChoose />
      <BannerAds />
      <NewAnime />
      <Voted />
      <ListAnime />
    </div>
  );
}

export default SideBar;
