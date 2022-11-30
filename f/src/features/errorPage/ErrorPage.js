import { useRouteError } from "react-router-dom";
import Styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className={Styles.errorPage_container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
