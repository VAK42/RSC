import { Link } from "@remix-run/react";
import RSC from "../IMG/RSC/RSC.png";

export default function Header() {
  const nav = [
    { name: "FACILITIES", path: "/facilities" },
    { name: "EVENTS", path: "/events" },
    { name: "MEMBERSHIP", path: "/membership" },
    { name: "CONTACT US", path: "/contactus" },
    { name: "STORE", path: "/store" },
  ];
  const handleAcc = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      window.location.href = "/account";
    } else {
      window.location.href = "/login";
    }
  };
  return (
    <>
      <header className="w-full h-20 bg-[rgba(0,0,0,0.8)] flex z-[1] fixed">
        <div className="h-main max-w-[30%] flex-[0_0_30%] flex">
          <div className="h-main__logo max-w-[40%] flex-[0_0_40%] flex justify-center items-center">
            <img src={RSC} alt="RSC" className="h-full"></img>
          </div>
          <div className="h-main__info max-w-[60%] flex-[0_0_60%] flex justify-center items-center text-white">
            <i className="fa-light fa-rocket-launch"></i>
            <p className="text-2xl m-2">Ryan Sports Club</p>
            <i className="fa-light fa-rocket-launch"></i>
          </div>
        </div>
        <div className="h-navbar max-w-[70%] flex-[0_0_70%]">
          <ul className="h-navbar__list h-full text-white flex">
            <Link
              to="/"
              className="h-navbar__detail max-w-[15%] flex-[0_0_15%] flex justify-center items-center anmt hover:text-cyan-200 anmt6"
            >
              <i className="fa-light fa-house m-2"></i>
              HOME
            </Link>
            {nav.map((nv) => (
              <Link
                key={nv.name}
                to={nv.path}
                className="h-navbar__detail max-w-[15%] flex-[0_0_15%] flex justify-center items-center anmt hover:text-cyan-200 anmt6"
              >
                <i className="fa-sharp fa-light fa-bolt m-2"></i>
                {nv.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="h-navbar__detail max-w-[5%] flex-[0_0_5%] flex justify-center items-center anmt hover:text-cyan-200 anmt6"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <button
              className="h-navbar__detail max-w-[5%] flex-[0_0_5%] flex justify-center items-center anmt hover:text-cyan-200 anmt6"
              onClick={handleAcc}
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </ul>
        </div>
      </header>
    </>
  );
}