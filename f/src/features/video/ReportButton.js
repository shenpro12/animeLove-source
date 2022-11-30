import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { isLogin } from "../../app/reducer/userSlice";
import SiteNotify from "../siteNotify/SiteNotify";
import ReportOption from "./ReportOption";
function ReportButton() {
  const login = useSelector(isLogin);

  const [report, setReport] = useState(false);
  const [notifyType, setNotifyType] = useState({
    type: "",
    text: "",
  });
  const toggleReportOption = () => {
    if (login) {
      setReport(!report);
    } else {
      setNotifyType({
        type: "err",
        text: "Vui lòng đăng nhập!",
      });
    }
  };
  return (
    <>
      {report && (
        <ReportOption
          onCancel={() => setReport(false)}
          onSuccess={(status) => {
            setReport(false);
            if (status) {
              setNotifyType({
                type: "check",
                text: "Cảm ơn bạn đã phản hồi!",
              });
            } else {
              setNotifyType({
                type: "err",
                text: "Đã xảy ra lỗi! Vui lòng thử lại!",
              });
            }
          }}
        />
      )}
      <SiteNotify
        notifyType={notifyType}
        hideNotify={() =>
          setNotifyType({
            type: "",
            text: "",
          })
        }
      />
      <div
        className="flex items-center hover:bg-white/10 hover:cursor-pointer py-3 px-3 mx-1 z-20"
        onClick={toggleReportOption}
      >
        <FontAwesomeIcon className="text-white/40" icon={faCircleExclamation} />
        <h1 className="ml-2 font-medium text-sm font-mono">Báo lỗi</h1>
      </div>
    </>
  );
}
export default ReportButton;
