function Header({ onChoose, active }) {
  return (
    <div className="flex bg-zinc-900 w-full rounded-sm" id="votedHeader">
      <h1
        className={`mx-2 px-1 py-3 hover:cursor-pointer ${
          active !== "day" && "hover:text-white/60"
        } ${active === "day" && "border-lime-400 border-b-2 font-bold"}`}
        onClick={() => {
          onChoose("day");
        }}
      >
        Xem nhiều hôm nay
      </h1>
      <h1
        className={`mx-2 px-1 py-3 hover:cursor-pointer ${
          active !== "week" && "hover:text-white/60"
        } ${active === "week" && "border-lime-400 border-b-2 font-bold"}`}
        onClick={() => {
          onChoose("week");
        }}
      >
        Xem nhiều trong tuần
      </h1>
      <h1
        className={`mx-2 px-1 py-3 hover:cursor-pointer ${
          active !== "month" && "hover:text-white/60"
        } ${active === "month" && "border-lime-400 border-b-2 font-bold"}`}
        onClick={() => {
          onChoose("month");
        }}
      >
        Xem nhiều trong tháng
      </h1>
    </div>
  );
}
export default Header;
