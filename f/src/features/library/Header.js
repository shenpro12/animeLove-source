import { useState } from "react";
function Header({ query, onClick }) {
  const [list, setList] = useState(() => {
    let temp = [];
    for (let i = 65; i <= 90; i++) {
      temp.push(String.fromCharCode(i));
    }
    return temp;
  });
  return (
    <div className="flex mt-3 flex-wrap justify-center" id="libHeader">
      {list.map((i, index) => (
        <h1
          key={index}
          className={`${
            query === i ? "bg-lime-500" : "bg-white/20 hover:bg-white/30 "
          } w-9 h-9 mx-1 mt-2 text-base flex justify-center items-center rounded hover:cursor-pointer font-mono`}
          onClick={() => onClick(i)}
        >
          {i}
        </h1>
      ))}
      <h1
        className={`${
          query === "0-9" ? "bg-lime-500" : "bg-white/20 hover:bg-white/30 "
        } w-9 h-9 mx-1 mt-2 text-base flex justify-center items-center rounded hover:cursor-pointer font-mono`}
        onClick={() => onClick("0-9")}
      >
        0-9
      </h1>
    </div>
  );
}
export default Header;
