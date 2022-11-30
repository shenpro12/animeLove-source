import Styles from "./HomePage.module.css";
function HomePageHeader({ title, items, query, onChange }) {
  return (
    <div className="flex items-center flex-wrap">
      <h1 className="py-1 px-2 bg-gradient-to-r from-red-700 to-pink-700 inline-block font-medium rounded text-lg uppercase">
        {title}
      </h1>
      {items
        ? items.map((item, index) => (
            <p
              key={index}
              className={`${
                query === item.type && Styles.text_active
              } py-1 px-2 mx-5 font-medium hover:cursor-pointer hover:text-lime-500`}
              onClick={() => onChange(item.type)}
            >
              {item.name}
            </p>
          ))
        : ""}
    </div>
  );
}

export default HomePageHeader;
