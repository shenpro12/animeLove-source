import { useState } from "react";
const categoryData = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Harem",
  "School",
  "Shoujo",
  "Romance",
  "Samurai",
  "Music",
  "Mecha",
  "Yuri",
  "Yaoi",
  "Shounen",
  "LiveAction",
  "Game",
  "Isekai",
  "Magic",
];
function FilterOption({ onChoose }) {
  const [category, setCategory] = useState([]);
  return (
    <div className="w-full bg-white rounded-sm p-3">
      <h1 className="text-sky-500 font-medium">Thể loại</h1>
      <div className="flex flex-wrap py-2 bg-slate-400/10 mb-4 mt-2 rounded border-2 border-black/10">
        {categoryData.map((item, index) => {
          return (
            <div key={index} className="flex items-center px-3 py-2">
              <input
                type={"checkbox"}
                className="hover:cursor-pointer"
                onChange={(e) => {
                  if (e.target.checked && !category.includes(item)) {
                    setCategory([...category, item]);
                  } else {
                    setCategory(
                      category.filter((i) => (i === item ? false : true))
                    );
                  }
                }}
              />
              <h1 className="text-black ml-2 text-sm">{item}</h1>
            </div>
          );
        })}
      </div>
      <div
        className="w-full flex justify-center"
        onClick={() => {
          onChoose(category);
        }}
      >
        <h1 className="bg-red-600 text-sm font-mono font-medium py-2 px-3 rounded hover:cursor-pointer">
          Lọc Anime
        </h1>
      </div>
    </div>
  );
}
export default FilterOption;
