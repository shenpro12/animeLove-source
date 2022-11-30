function Header({ total }) {
  return (
    <div className="mb-5">
      <h1 className="font-bold text-black">{`Bình luận(${total})`}</h1>
      <div className="mt-2 flex flex-row items-end">
        <div className="w-10 h-1 bg-lime-400"></div>
        <div className="h-px flex-1 bg-black/20"></div>
      </div>
    </div>
  );
}
export default Header;
