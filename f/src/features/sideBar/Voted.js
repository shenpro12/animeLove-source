import { useState } from "react";
import Styles from "./SideBar.module.css";
import VotedHeader from "./VotedHeader";
import VotedContent from "./VotedContent";
function Voted() {
  const [query, setQuery] = useState("Anime bộ");
  return (
    <div className={Styles.voted_container}>
      <VotedHeader query={query} onChoose={(type) => setQuery(type)} />
      <div className="mt-2 flex flex-row items-end">
        <div className="w-10 h-1 bg-lime-400"></div>
        <div className="h-px flex-1 bg-zinc-700"></div>
      </div>
      <VotedContent query={query === "Anime bộ" ? "tv/series" : "movie/ova"} />
    </div>
  );
}
export default Voted;
