function VotedHeader({ query, onChoose }) {
  return (
    <div className="flex justify-between flex-wrap">
      <h1 className="py-3 text-sm uppercase font-bold">Hot tuần</h1>
      <h1
        className={`py-3 text-sm hover:cursor-pointer font-bold ${
          query === "Anime bộ" ? "text-red-600" : "text-white/40"
        }`}
        onClick={() => onChoose("Anime bộ")}
      >
        TV/Series
      </h1>
      <h1
        className={`py-3 text-sm hover:cursor-pointer font-bold ${
          query === "Anime lẻ" ? "text-red-600" : "text-white/40"
        }`}
        onClick={() => onChoose("Anime lẻ")}
      >
        Movie/OVA
      </h1>
    </div>
  );
}
export default VotedHeader;
