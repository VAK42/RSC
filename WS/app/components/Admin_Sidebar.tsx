import { Link } from "@remix-run/react";
import RSC from "../IMG/RSC/RSC.png";

export default function Admin_Sidebar() {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <>
      <nav className="text-white bg-zinc-800 max-w-[10%] flex-[0_0_10%] border-r-2 border-solid border-cyan-400 relative">
        <img src={RSC} alt="RSC" />
        <div className="text-center text-green-200 mb-4">RYAN SPORTS CLUB</div>
        <div className="text-center text-purple-200">
          <i className="fa-light fa-user-crown m-1"></i>Admin Page
        </div>
        <div className="text-cyan-200 border-y-2 border-solid border-emerald-300">
          <i className="fa-light fa-rocket-launch m-2"></i>MAIN
        </div>
        <ul className="max-w-[80%] flex-[0_0_80%] mx-auto my-2 text-green-100">
          <Link to="/admin">
            <i className="fa-light fa-chart-user m-1 text-red-200"></i>Dashboard
          </Link>
        </ul>
        <div className="text-cyan-200 border-y-2 border-solid border-emerald-300">
          <i className="fa-light fa-rocket-launch m-2"></i>PAGES
        </div>
        <ul className="max-w-[80%] flex-[0_0_80%] flex flex-col mx-auto my-2 text-green-100">
          <Link to="/admin/home">
            <i className="fa-light fa-house-user m-1 text-red-200"></i>Home
          </Link>
          <Link to="/admin/facilities">
            <i className="fa-light fa-gun m-1 text-red-200"></i>Facilities
          </Link>
          <Link to="/admin/events">
            <i className="fa-light fa-fire m-1 text-red-200"></i> Events
          </Link>
          <Link to="/admin/membership">
            <i className="fa-light fa-crown m-1 text-red-200"></i>Membership
          </Link>
          <Link to="/admin/store">
            <i className="fa-light fa-cart-shopping m-1 text-red-200"></i>Store
          </Link>
          <Link to="/admin/cts">
            <i className="fa-light fa-address-book m-1 text-red-200"></i>Contact
            Us
          </Link>
        </ul>
        <div className="text-cyan-200 border-y-2 border-solid border-emerald-300">
          <i className="fa-light fa-rocket-launch m-2"></i>EXTRAS
        </div>
        <ul className="max-w-[80%] flex-[0_0_80%] m-auto text-green-100">
          <Link to="/admin/feedback">
            <i className="fa-light fa-comment-smile m-1 text-red-200"></i>
            Feedback
          </Link>
        </ul>
        <div className="w-full bottom-0 border-y-2 border-solid border-emerald-300 absolute">
          <button className="text-red-200" onClick={logOut}>
            <i className="fa-sharp fa-light fa-arrow-right-from-bracket m-1 text-blue-200"></i>
            LOG OUT
          </button>
        </div>
      </nav>
    </>
  );
}