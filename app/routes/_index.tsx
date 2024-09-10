import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import IMG_Slide from "~/components/IMG_Slide";

export const meta: MetaFunction = () => {
  return [
    { name: "charSet", content: "UTF-8" },
    {
      name: "viewport",
      content:
        "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0",
    },
    { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
    { name: "title", content: "Ryan Sports Club" },
    { name: "msapplication-TileColor", content: "#fff" },
    { name: "msapplication-config", content: "/IMG/Favicon/browserconfig.xml" },
    { name: "theme-color", content: "#fff" },
  ];
};

export default function Index() {
  const fclts = [
    { img: "/app/IMG/RSC/RSC_02.webp", name: "Indoor Sports", path: "/facilities/indoor" },
    { img: "/app/IMG/RSC/RSC_04.webp", name: "Outdoor Sports", path: "/facilities/outdoor" },
    { img: "/app/IMG/RSC/RSC_06.webp", name: "Recreation Sports", path: "/facilities/recreation" },
  ];
  const vnts = [
    {
      img: "/app/IMG/RSC/RSC_10.png",
      name: "UEFA Champions League 2024",
      path: "/events/uefa",
    },
    {
      img: "/app/IMG/RSC/RSC_12.webp",
      name: "NBA Champions League 2024",
      path: "/events/nba",
    },
    {
      img: "/app/IMG/RSC/RSC_14.webp",
      name: "Olympic 2024",
      path: "/events/olympic",
    },
  ];
  const mbs_text = "40% Off Membership!";
  const mbs_img = "/app/IMG/RSC/RSC_08.webp";
  const cts = [
    { icon: "fa-circle-phone", text: "+98265610080" },
    { icon: "fa-envelope", text: "ryansports@gmail.com" },
    { icon: "fa-location-dot", text: "10th Floor - Burj Khalifa, Dubai, UAE" },
  ];
  const desc = `RSC`;
  const map =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115525.73856510432!2d55.19197486709517!3d25.197174173836935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2s!4v1718071501634!5m2!1sen!2s";
  return (
    <>
      <Header />
      <main className="text-white bg-black">
        <IMG_Slide />
        <div className="m-fclt">
          <div className="m-fclt__title h-[15vh] text-4xl bg-zinc-900 border-2 border-solid border-cyan-400 flex justify-center items-center">
            <i className="fa-sharp fa-light fa-futbol text-2xl m-2"></i>
            FACILITIES
            <i className="fa-sharp fa-light fa-futbol text-2xl m-2"></i>
          </div>
          <div className="m-fclt__content max-w-[75%] flex-[0_0_75%] grid grid-cols-3 gap-4 p-4 m-auto overflow-auto]">
            {fclts.map((fclt) => (
              <Link
                key={fclt.img}
                to={fclt.path}
                className="m-fclt__item max-h-[80vh] border-2 border-solid border-cyan-400 anmt anmt4"
              >
                <div className="m-fclt__img h-3/4 flex justify-center items-center overflow-hidden">
                  <img
                    src={fclt.img}
                    alt={fclt.img}
                    className="min-w-full min-h-full"
                  />
                </div>
                <div className="m-fclt__desc h-1/4 text-2xl bg-zinc-900 border-t-2 border-solid border-cyan-400 flex justify-center items-center">
                  <i className="fa-light fa-circle-right text-2xl m-2"></i>
                  {fclt.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="m-membership h-[90vh]">
          <div className="m-membership__title h-[15vh] text-4xl bg-zinc-900 border-2 border-solid border-cyan-400 flex justify-center items-center">
            <i className="fa-light fa-crown text-2xl m-2"></i>
            MEMBERSHIP
            <i className="fa-light fa-crown text-2xl m-2"></i>
          </div>
          <div className="m-membership__content h-[75vh] bg-black relative">
            <img
              src={mbs_img}
              alt={mbs_img}
              className="h-full float-right"
            ></img>
            <div className="m-membership__text h-full w-1/2 flex justify-center items-center flex-col absolute">
              <div className="m-membership__text-main text-cyan-400 text-4xl">
                {mbs_text}
              </div>
              <Link
                to="/membership"
                className="m-membership__text-btn w-[10vw] h-[2.5vw] border-2 border-solid border-cyan-400 flex justify-center items-center m-4 anmt"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
        <div className="m-events">
          <div className="m-events__title h-[15vh] text-4xl bg-zinc-900 border-2 border-solid border-cyan-400 flex justify-center items-center">
            <i className="fa-light fa-calendar-check text-2xl m-2"></i>
            EVENTS
            <i className="fa-light fa-calendar-check text-2xl m-2"></i>
          </div>
          <div className="m-events__content max-w-[75%] flex-[0_0_75%] grid grid-cols-3 gap-4 p-4 m-auto">
            {vnts.map((vnt) => (
              <Link
                key={vnt.img}
                to={vnt.path}
                className="m-fclt__item max-h-[80vh] text-white border-2 border-solid border-cyan-400 anmt anmt4"
              >
                <div className="m-fclt__img h-3/4 flex justify-center items-center overflow-hidden">
                  <img
                    src={vnt.img}
                    alt={vnt.img}
                    className="min-w-full min-h-full"
                  />
                </div>
                <div className="m-fclt__desc h-1/4 text-2xl bg-zinc-900 border-t-2 border-solid border-cyan-400 flex justify-center items-center">
                  <i className="fa-light fa-circle-right text-2xl m-2"></i>
                  {vnt.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="m-cts">
          <div className="m-cts__title h-[15vh] text-4xl bg-zinc-900 border-2 border-solid border-cyan-400 flex justify-center items-center">
            <i className="fa-light fa-address-card text-2xl m-2"></i>
            CONTACT US
            <i className="fa-light fa-address-card text-2xl m-2"></i>
          </div>
          <div className="m-cts__content h-auto bg-zinc-900 flex mt-4">
            <div className="m-cts__main max-w-[60%] flex-[0_0_60%] m-auto">
              <div className="m-cts__intro h-4/5 border-b-2 border-dotted border-white px-2">
                <p className="max-w-full whitespace-pre-line">{desc}</p>
              </div>
              <div className="m-cts__sp h-1/5">
                {cts.map((ct) => (
                  <div key={ct.text}>
                    <i className={`fa-sharp fa-regular ${ct.icon} px-2`}></i>
                    <span>{ct.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-cts__map max-w-[40%] flex-[0_0_40%] m-auto">
              <iframe
                src={map}
                loading="lazy"
                className="h-[30vw] w-full border-2 border-solid border-emerald-900"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}