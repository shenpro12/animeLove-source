import { Link } from "react-router-dom";
import Styles from "./Calendar.module.css";

function Calendar() {
  return (
    <div className={Styles.calendarPage_container}>
      <Link to="/voted">CALENDAR</Link>
    </div>
  );
}

export default Calendar;
