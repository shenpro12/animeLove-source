import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faTriangleExclamation,
  faCircleCheck,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Styles from "./SiteNotify.module.css";
function SiteNotify({ notifyType, hideNotify }) {
  const [color, setColor] = useState(
    notifyType.type === "check"
      ? "lime"
      : notifyType.type === "warning"
      ? "yellow"
      : notifyType.type === "err"
      ? "red"
      : ""
  );
  const [icon, setIcon] = useState(
    notifyType.type === "check"
      ? faCircleCheck
      : notifyType.type === "warning"
      ? faTriangleExclamation
      : notifyType.type === "err"
      ? faCircleXmark
      : faQuestion
  );
  const [description, setDescription] = useState(notifyType.text);
  useEffect(() => {
    setIcon(
      notifyType.type === "check"
        ? faCircleCheck
        : notifyType.type === "warning"
        ? faTriangleExclamation
        : notifyType.type === "err"
        ? faCircleXmark
        : faQuestion
    );
    setColor(
      notifyType.type === "check"
        ? "lime"
        : notifyType.type === "warning"
        ? "yellow"
        : notifyType.type === "err"
        ? "red"
        : ""
    );
    setDescription(notifyType.text);
  });
  useEffect(() => {
    const ticker = setTimeout(() => {
      hideNotify();
    }, 5000);
    return () => {
      clearTimeout(ticker);
    };
  });
  return (
    <div
      className={`${
        !notifyType.type && !notifyType.text && Styles.siteNotify
      } ${
        color === "red"
          ? "border-red-500 shadow-red-500"
          : color === "lime"
          ? "border-lime-500 shadow-lime-500"
          : color === "warning"
          ? "border-yellow-500 shadow-yellow-500"
          : ""
      } -z-60 rounded-tr-md rounded-br-md opacity-100 flex justify-center items-center fixed py-4 px-2 bg-white max-w-xs h-max bottom-7 left-2 duration-500 shadow-md border-r-8 hover:cursor-pointer`}
      onClick={hideNotify}
    >
      <h1 className={`flex-1 text-center font-bold mx-2 text-${color}-500`}>
        {description}
      </h1>
      <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-3xl`} />
    </div>
  );
}
export default SiteNotify;
