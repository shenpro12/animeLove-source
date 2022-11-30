import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat } from "../../util/queryDataHelper";
import EpisodeControl from "./EpisodeControl";
import VideoBehavorControl from "./VideoBehavorControl";
import Comment from "../comment/Comment";
import Styles from "./Video.module.css";
import request from "../../util/index";
export const getCookie = (name) => {
  let cookies = document.cookie;
  cookies = cookies.split(";").filter((item) => item.includes(`${name}=`));
  return cookies.length ? cookies[0].replace(`${name}=`, "") : "";
};
function Video() {
  const animeList = useSelector(selectAnimeList).animeList;
  const params = useParams();
  const [watched, setWatched] = useState([]);
  const [dataRender, setDataRender] = useState(
    dataFormat(animeList).find(
      (item) =>
        item._id === params.name.split("-")[params.name.split("-").length - 1]
    )
  );
  useEffect(() => {
    (async () => {
      await request.post("api/anime/top/reset", {
        data: {
          _id: params.name.split("-")[params.name.split("-").length - 1],
        },
      });
    })();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("video").offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }, [params.episode]);
  useEffect(() => {
    setDataRender(
      dataFormat(animeList).find(
        (item) =>
          item._id === params.name.split("-")[params.name.split("-").length - 1]
      )
    );
  }, [params]);
  useEffect(() => {
    document.title = ` Tập ${params.episode.split("-")[1]} | ${
      dataRender.name.jp || dataRender.name.jp || dataRender.name.jp
    }`;
  });

  useEffect(() => {
    let cookie = getCookie("viewsHistory");
    if (cookie) {
      let tempCookie = JSON.parse(cookie);
      let watchedAnime = tempCookie.filter(
        (i) =>
          i.animeId ===
          params.name.split("-")[params.name.split("-").length - 1]
      );
      if (watchedAnime.length) {
        tempCookie = tempCookie.map((i) => {
          let temp = { animeId: i.animeId, watched: i.watched };
          if (
            !temp.watched.includes(params.episode.split("-")[1]) &&
            temp.animeId ===
              params.name.split("-")[params.name.split("-").length - 1]
          ) {
            temp.watched.push(params.episode.split("-")[1]);
            setWatched(temp.watched);
          }
          if (
            temp.animeId ===
            params.name.split("-")[params.name.split("-").length - 1]
          ) {
            setWatched(temp.watched);
          }

          return temp;
        });
        document.cookie = `viewsHistory=${JSON.stringify(
          tempCookie
        )}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/`;
      } else {
        tempCookie.push({
          animeId: params.name.split("-")[params.name.split("-").length - 1],
          watched: [params.episode.split("-")[1]],
        });
        document.cookie = `viewsHistory=${JSON.stringify(
          tempCookie
        )}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/`;
        setWatched(tempCookie[tempCookie.length - 1].watched);
      }
    } else {
      const tempCookie = [
        {
          animeId: params.name.split("-")[params.name.split("-").length - 1],
          watched: [params.episode.split("-")[1]],
        },
      ];
      document.cookie = `viewsHistory=${JSON.stringify(
        tempCookie
      )}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/`;
      setWatched(tempCookie[0].watched);
    }
    //console.log(getCookie("viewsHistory"));
  }, [params.episode]);

  return (
    <div className={`${Styles.video_container} mt-1 mb-5 w-full`}>
      {
        <iframe
          className="relative -z-25"
          width="100%"
          height="460"
          id="video"
          src={`https://short.ink/${
            dataRender.total_episode[parseInt(params.episode.split("-")[1]) - 1]
          }`}
          allowFullScreen="allowfullscreen"
        ></iframe>
      }
      <VideoBehavorControl total_episode={dataRender.total_episode.length} />
      <EpisodeControl
        totalEpisode={dataRender.total_episode}
        currentUrl={params.name}
        watched={watched}
      />
      <Comment animeId={dataRender._id} />
    </div>
  );
}
export default Video;
