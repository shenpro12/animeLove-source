import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Styles from "./Library.module.css";
function PageContent({ data, page }) {
  function getData() {
    let temp = [];
    let end = page * 30 - 1;
    let start = end - 29;
    for (let i = start; i <= end; i++) {
      if (data[i]) {
        temp.push(data[i]);
      }
    }
    return temp;
  }
  const [renderData, setRenderData] = useState(getData());
  useEffect(() => {
    setRenderData(getData());
  }, [data, page]);
  return renderData.length ? (
    <table className="w-full bg-slate-700 rounded font-mono border-t-2 border-r-2 border-white/20">
      <tbody>
        <tr className="text-center bg-slate-800">
          <th className="px-1 py-3 border-b-2 w-10 border-l-2 border-white/20">
            <h1 className="text-white/70">#</h1>
          </th>
          <th className="px-1 py-3 border-b-2 w-2/4 border-l-2 border-white/20">
            <h1 className="text-white/70">{data.length} kết quả</h1>
          </th>
          <th className="px-1 py-3 border-b-2 w-16 border-l-2 border-white/20">
            <h1 className="text-white/70">Năm</h1>
          </th>
          <th className="px-1 py-3 border-b-2 w-16 border-l-2 border-white/20">
            <h1 className="text-white/70">Status</h1>
          </th>
          <th
            className={`${Styles.type} px-1 py-3 border-b-2 border-l-2 border-white/20`}
          >
            <h1 className="text-white/70">Thể loại</h1>
          </th>
        </tr>
      </tbody>
      {renderData.map((i, index) => (
        <tbody key={i._id}>
          <tr>
            <td className="px-1 py-3 border-b-2 w-10 border-l-2 border-white/20 text-center">
              <h1 className="text-white/70">{30 * page - 30 + (index + 1)}</h1>
            </td>
            <td className="px-1 py-3 border-b-2 w-2/4 border-l-2 border-white/20">
              <div className="w-full h-full flex items-center p-2">
                <div className="w-10">
                  <Link
                    to={`/anime/${i.name.jp || i.name.en || i.name.vn}-${
                      i._id
                    }`}
                  >
                    <img src={i.thumb_url} />
                  </Link>
                </div>
                <Link
                  to={`/anime/${i.name.jp || i.name.en || i.name.vn}-${i._id}`}
                >
                  <h1 className="text-white hover:cursor-pointer hover:text-white/80 ml-3 font-bold">
                    {i.name.jp || i.name.en || i.name.vn}
                  </h1>
                </Link>
              </div>
            </td>
            <td className="px-1 py-3 border-b-2 w-16 border-l-2 border-white/20 text-center">
              <h1 className="text-white/70">{i.release_year}</h1>
            </td>
            <td className="px-1 py-3 border-b-2 w-16 border-l-2 border-white/20 text-center">
              <h1 className="text-white/70">
                {i.done ? "Full" : `Tập ${i.total_episode.length}`}
              </h1>
            </td>
            <td
              className={`${Styles.type} px-1 py-3 border-b-2 border-l-2 border-white/20 `}
            >
              <h1 className="text-white/70 flex flex-wrap">
                {i.category.map((i, index) => (
                  <div key={index}>
                    <Link
                      to={`/category/${i}`}
                      className="hover:text-white"
                    >{`${i}`}</Link>
                    ,
                  </div>
                ))}
              </h1>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  ) : (
    "Không tìm thấy!"
  );
}
export default memo(PageContent);
