import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../../app/reducer/userSlice";
import request from "../../util/index";
import RequestLoading from "../loading/RequestLoading";
function ReportOption({ onCancel, onSuccess }) {
  const params = useParams();
  const profile = useSelector(getProfile);
  const [activeRpBtn, setActiveRpBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeactiveRpBtnHandle = () => {
    const element = document.querySelectorAll("#reportCheckbox");
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        setActiveRpBtn(true);
        return;
      }
    }
    setActiveRpBtn(false);
  };
  const checkBoxHandle = (e) => {
    if (e.target.checked) {
      e.target.nextSibling.classList.add("text-black");
    } else {
      e.target.nextSibling.classList.remove("text-black");
    }
    activeactiveRpBtnHandle();
  };
  const textClickHandle = (e) => {
    e.target.previousSibling.click();
    activeactiveRpBtnHandle();
  };
  const sendReportHandle = async () => {
    let report = [];
    const element = document.querySelectorAll("#reportCheckbox");
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        report.push(element[i].nextSibling.innerText);
      }
    }
    setLoading(true);
    const res = await request.post("api/anime/report", {
      data: {
        episode: params.episode.split("-")[1],
        animeId: params.name.split("-")[params.name.split("-").length - 1],
        userId: profile._id,
        report: report,
      },
    });
    onSuccess(res.data.status);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 -z-60 flex justify-center items-center">
      <div
        className="p-3 bg-white w-96 h-max rounded-xl mx-5 relative overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading && (
          <RequestLoading
            url="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692421/menhera-chibi_fbewfb.gif"
            styles={{ position: "absolute", bg: "rgba(0,0,0,.7)" }}
          />
        )}
        <div className="flex justify-between">
          <h1 className="text-black font-bold text-base">Báo lỗi</h1>
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
        <div className="mt-3">
          <h1 className="text-black">
            Xin lỗi về vấn đề mà bạn đăng mắc phải! Vui lòng cho chúng tôi biết
            bạn đang gặp phải vấn đề gì?
          </h1>
          <div className="flex mt-3">
            <div className="flex-1">
              <h1 className="text-black font-semibold text-sm mb-1">
                Lỗi thường gặp:
              </h1>
              <div className="flex items-center text-black/70">
                <input
                  id="reportCheckbox"
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  onChange={(e) => {
                    checkBoxHandle(e);
                  }}
                />
                <p
                  className="ml-2 hover:cursor-pointer hover:text-black duration-150"
                  onClick={(e) => {
                    textClickHandle(e);
                  }}
                >
                  Âm thanh
                </p>
              </div>
              <div className="flex items-center text-black/70">
                <input
                  id="reportCheckbox"
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  onChange={(e) => {
                    checkBoxHandle(e);
                  }}
                />
                <p
                  className="ml-2 hover:cursor-pointer hover:text-black duration-150"
                  onClick={(e) => {
                    textClickHandle(e);
                  }}
                >
                  Phụ đề
                </p>
              </div>
              <div className="flex items-center text-black/70">
                <input
                  id="reportCheckbox"
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  onChange={(e) => {
                    checkBoxHandle(e);
                  }}
                />
                <p
                  className="ml-2 hover:cursor-pointer hover:text-black duration-150"
                  onClick={(e) => {
                    textClickHandle(e);
                  }}
                >
                  Thứ tự tập phim
                </p>
              </div>
              <div className="flex items-center text-black/70">
                <input
                  id="reportCheckbox"
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  onChange={(e) => {
                    checkBoxHandle(e);
                  }}
                />
                <p
                  className="ml-2 hover:cursor-pointer hover:text-black duration-150"
                  onClick={(e) => {
                    textClickHandle(e);
                  }}
                >
                  Không xem được
                </p>
              </div>
              <div className="flex items-center text-black/70">
                <input
                  id="reportCheckbox"
                  type={"checkbox"}
                  className="hover:cursor-pointer"
                  onChange={(e) => {
                    checkBoxHandle(e);
                  }}
                />
                <p
                  className="ml-2 hover:cursor-pointer hover:text-black duration-150"
                  onClick={(e) => {
                    textClickHandle(e);
                  }}
                >
                  Khác
                </p>
              </div>
              <h1
                className={`text-white ${
                  activeRpBtn ? "bg-red-500" : "bg-red-300 pointer-events-none"
                } py-1 px-4 rounded font-semibold hover:cursor-pointer hover:bg-red-600 float-right mr-6 mt-1 inline-block`}
                onClick={sendReportHandle}
              >
                Gửi
              </h1>
            </div>
            <div className="w-2/4 flex items-center justify-center mb-5">
              <img
                src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1669692948/anime_erbdqn.gif"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportOption;
