import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "./SideBar.module.css";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat } from "../../util/queryDataHelper";
import EpisodeControl from "../video/EpisodeControl";

function AutoChoose() {
  const params = useParams();
  const animeList = dataFormat(useSelector(selectAnimeList).animeList);
  const [animeRandom, setAnimeRandom] = useState(
    animeList[Math.floor(Math.random() * animeList.length)]
  );
  if (
    params.name ===
      `${animeRandom.name.jp || animeRandom.name.vn || animeRandom.name.en}-${
        animeRandom._id
      }` ||
    !animeRandom.total_episode.length
  ) {
    setAnimeRandom(animeList[Math.floor(Math.random() * animeList.length)]);
  }
  useEffect(() => {
    setAnimeRandom(animeList[Math.floor(Math.random() * animeList.length)]);
  }, [params]);
  return (
    <div className={Styles.autoChooser_container}>
      <h1 className="font-mono">Hôm nay xem gì?</h1>
      <div className="mt-2 flex flex-row items-end">
        <div className="w-10 h-1 bg-lime-400"></div>
        <div className="h-px flex-1 bg-zinc-700"></div>
      </div>
      <h1 className="mt-4 text-zinc-400">
        Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho
        bạn
      </h1>
      <Link
        to={`/anime/${
          animeRandom.name.jp || animeRandom.name.vn || animeRandom.name.en
        }-${animeRandom._id}`}
      >
        <p className="bg-red-700 inline-block pt-3 pb-3 pl-6 pr-6 rounded mt-4 hover:cursor-pointer">
          Xem Anime<span className="font-bold"> Ngẫu Nhiên</span>
        </p>
      </Link>
    </div>
  );
}

export default AutoChoose;
