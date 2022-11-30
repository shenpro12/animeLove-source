import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Modal.module.css";

function Modal({ type, text, onAccept, onCancel }) {
  return (
    <div
      className={`${Styles.modal_container} flex flex-col`}
      onClick={onCancel}
    >
      <div
        className=" w-80 p-3 bg-white rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <div className="flex justify-between">
            <h1 className="text-black font-bold text-base">{type}</h1>
            <FontAwesomeIcon
              icon={faClose}
              className="text-black/70 hover:cursor-pointer hover:text-black"
              onClick={onCancel}
            />
          </div>
          <div className="mt-2 flex flex-row items-end">
            <div className="w-10 h-1 bg-lime-400"></div>
            <div className="h-px flex-1 bg-zinc-300"></div>
          </div>
        </div>
        <div className="mt-5 px-2 mb-2">
          <h1 className="text-black text-lg">{text}</h1>
        </div>
        <div className="w-full flex justify-center px-2 items-center">
          <div
            title="Đồng ý"
            className="hover:cursor-pointer hover:bg-lime-500/80 text-black font-bold w-10 h-10 flex justify-center items-center bg-lime-500 m-1 text-lg rounded-full"
            onClick={onAccept}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <img
            alt="optionImg"
            src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1668405782/pngegg_n2am73.png"
            className=" w-14 mx-4"
          />
          <div
            title="Hủy"
            className="hover:cursor-pointer hover:bg-red-500/80 text-black font-bold w-10 h-10 flex justify-center items-center bg-red-500 m-1 text-lg rounded-full"
            onClick={onCancel}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
