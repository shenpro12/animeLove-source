import { Link } from "react-router-dom";
function Mainbanner() {
  return (
    <div className="banner relative">
      <Link to="/">
        <img
          alt="banner"
          src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1666077941/banner_hawc7c.png"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}
export default Mainbanner;
