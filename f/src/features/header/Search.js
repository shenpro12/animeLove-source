import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectAnimeList } from "../../app/reducer/animeSlice";
import { dataFormat, queryData } from "../../util/queryDataHelper";
import Styles from "./Header.module.css";
import SearchResult from "./SearchResult";
import LoginButton from "./LoginButton";
function Search({ bool, onClick }) {
  const params = useParams();
  const animeList = dataFormat(useSelector(selectAnimeList).animeList);

  const [inputText, setInputText] = useState("");
  const [dataRender, setDataRender] = useState([]);
  useEffect(() => {
    if (inputText) {
      setDataRender(queryData(animeList, { category: [`name=${inputText}`] }));
    } else {
      setDataRender([]);
    }
  }, [inputText]);
  useEffect(() => {
    chooseItemHandel();
  }, [params]);
  const chooseItemHandel = () => {
    setDataRender([]);
    setInputText("");
  };
  return (
    <div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="mt-auto mb-auto mr-2 text-white/50"
        />
        <input
          placeholder="Tên tiếng Nhật, Anh, Việt"
          value={inputText}
          onInput={(e) => {
            setInputText(e.target.value);
          }}
        />
        {inputText && (
          <FontAwesomeIcon
            icon={faClose}
            className="ml-2 mt-auto mb-auto text-white/50 text-xs hover:cursor-pointer hover:text-white"
            onClick={() => setInputText("")}
          />
        )}
        <SearchResult
          data={dataRender}
          text={inputText}
          onChoose={chooseItemHandel}
        />
      </div>

      <FontAwesomeIcon
        icon={bool ? faClose : faBars}
        className={Styles.bars_icon}
        onClick={onClick}
      />
    </div>
  );
}

export default memo(Search);
