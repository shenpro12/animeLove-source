import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer } from "@fortawesome/free-solid-svg-icons";
function EpisodeControl({ totalEpisode, currentUrl, watched }) {
  const params = useParams();

  return (
    <div className="w-full mt-6 bg-zinc-800 py-5 px-3 rounded relative z-20">
      <div className="flex items-center mb-2 font-medium">
        <FontAwesomeIcon icon={faServer} />
        <h1 className="ml-3 font-mono">HYDRAX</h1>
      </div>
      <div className="flex flex-wrap">
        {totalEpisode.map((item, index) => (
          <Link
            key={index}
            to={`/anime/${currentUrl}/episode-${index + 1}`}
            className={`px-3 m-1 rounded duration-500 ${
              params.episode.split("-")[1] !== (index + 1).toString() &&
              "hover:bg-red-300"
            } ${
              params.episode.split("-")[1] === (index + 1).toString()
                ? "bg-red-500"
                : watched.includes((index + 1).toString())
                ? "bg-zinc-900"
                : "bg-zinc-500"
            }`}
          >
            <h1 className="font-bold text-lg">
              {index + 1}
              {index === totalEpisode.length - 1 && "-end"}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default EpisodeControl;
