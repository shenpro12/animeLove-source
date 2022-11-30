import { Link } from "react-router-dom";
function ListAnime() {
  return (
    <div className="mt-5">
      <ul className=" flex flex-col">
        <Link to={"/category/Action+Comedy"}>
          <li className=" border-l-4 border-red-700 px-3 py-1 bg-zinc-800 inline-block mb-1 rounded hover:cursor-pointer hover:bg-zinc-600 hover:border-lime-600">
            list anime thể loại action - comedy
          </li>
        </Link>{" "}
        <Link to={"/category/Action+Romance"}>
          <li className="border-l-4 border-red-700 px-3 py-1 bg-zinc-800 inline-block mb-1 rounded hover:cursor-pointer hover:bg-zinc-600 hover:border-lime-600">
            list anime thể loại action - romance
          </li>
        </Link>{" "}
        <Link to={"/category/Harem+Comedy"}>
          <li className="border-l-4 border-red-700 px-3 py-1 bg-zinc-800 inline-block mb-1 rounded hover:cursor-pointer hover:bg-zinc-600 hover:border-lime-600">
            list anime thể loại harem - comedy
          </li>
        </Link>{" "}
        <Link to={"/category/Ecchi"}>
          <li className="border-l-4 border-red-700 px-3 py-1 bg-zinc-800 inline-block mb-1 rounded hover:cursor-pointer hover:bg-zinc-600 hover:border-lime-600">
            list anime thể loại ecchi
          </li>
        </Link>{" "}
        <Link to={"/category/Isekai+Action"}>
          <li className="border-l-4 border-red-700 px-3 py-1 bg-zinc-800 inline-block mb-1 rounded hover:cursor-pointer hover:bg-zinc-600 hover:border-lime-600">
            list anime thể loại isekai - action
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default ListAnime;
