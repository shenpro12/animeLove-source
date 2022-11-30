import { useState, useEffect } from "react";
function PageControl({ total, page, onClick }) {
  function getToltalPage() {
    let temp = [];
    for (let i = 1; i <= Math.ceil(total / 30); i++) {
      temp.push(i);
    }
    return temp;
  }
  const [totalPage, setTotalPage] = useState(getToltalPage());
  //console.log(totalPage);
  useEffect(() => {
    setTotalPage(getToltalPage());
  }, [total]);
  return (
    <div className="flex flex-wrap w-full justify-center my-6">
      {totalPage.length > 1 && (
        <h1
          className={`bg-stone-800 px-3 py-1 m-1 font-bold text-base rounded-sm`}
        >
          Trang {page} của {totalPage.length}
        </h1>
      )}
      {page !== 1 && totalPage.length > 1 && (
        <h1
          className={`bg-stone-800 px-3 py-1 m-1 font-bold text-base hover:cursor-pointer rounded-sm hover:bg-lime-400 duration-200`}
          onClick={() => {
            onClick(1);
          }}
        >
          Trang đầu
        </h1>
      )}
      {totalPage.length >= 2 &&
        totalPage.map((i, index) => {
          if (index + 1 >= page - 1 && index + 1 <= page + 4) {
            return (
              <h1
                key={index}
                className={`${
                  i === page ? "bg-red-600" : "bg-stone-800"
                } px-3 py-1 m-1 font-bold text-base hover:cursor-pointer rounded-sm hover:bg-lime-400 duration-200`}
                onClick={() => {
                  onClick(i);
                }}
              >
                {i}
              </h1>
            );
          }
        })}
      {!(page + 4 >= totalPage.length) && (
        <h1
          className={`bg-stone-800 px-3 py-1 m-1 font-bold text-base hover:cursor-pointer rounded-sm hover:bg-lime-400 duration-200`}
          onClick={() => {
            onClick(totalPage.length);
          }}
        >
          Trang cuối
        </h1>
      )}
    </div>
  );
}
export default PageControl;
