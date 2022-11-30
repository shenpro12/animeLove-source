import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";
function Footer() {
  window.onscroll = () => {
    const btn = document.getElementById("scrollTopBtn");
    if (window.scrollY > 300 && window.innerWidth > 915) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      btn.style.position = "relative";
      btn.style.marginBottom = "0px";
      btn.style.marginRight = "0px";
    } else {
      btn.style.position = "fixed";
      btn.style.marginBottom = "20px";
      btn.style.marginRight = "20px";
    }
  };
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className={Styles.footer_container}>
      <div className="w-14 h-14">
        <Link to={"/"}>
          <img
            className="w-full h-full"
            src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1664943027/logo_prgtsn.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="w-9 mx-1 h-9">
          <a
            href="https://www.facebook.com/profile.php?id=100014011180696"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665808644/pngwing.com_zerdnv.png"
              alt="facebook"
            />
          </a>
        </div>
        <div className="w-9 mx-1 h-12">
          <a
            href="https://www.facebook.com/profile.php?id=100014011180696"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665809596/pngwing.com_3_yccpee.png"
              alt="youtube"
            />
          </a>
        </div>
        <div className="w-9 mx-1 h-9">
          <a
            href="https://www.facebook.com/profile.php?id=100014011180696"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665808845/pngwing.com_1_fm4g1h.png"
              alt="instagram"
            />
          </a>
        </div>
        <div className="w-9 mx-1 h-9">
          <a
            href="https://www.facebook.com/profile.php?id=100014011180696"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dhhkjmfze/image/upload/v1665809199/pngwing.com_2_nhvzud.png"
              alt="twitter"
            />
          </a>
        </div>
        <div
          id="scrollTopBtn"
          className="hover:cursor-pointer hidden hover:bg-white/20 items-center justify-center fixed w-9 h-9 bg-transparent z-50 bottom-0 right-0 mb-5 mr-5 rounded-full border-2 border-white/40"
          onClick={() => {
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} className="text-white/40" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
