import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import IMG_Slide from "~/components/IMG_Slide";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [cts, setCts] = useState<any[]>([]);
  const [cts2, setCts2] = useState<any[]>([]);
  const [mbs, setMbs] = useState<any[]>([]);
  const [vnts, setVnts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost/rsc/cts.php")
      .then((response) => {
        setCts(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Contact Details: ", error);
      });

    axios
      .get("http://localhost/rsc/cts2.php")
      .then((response) => {
        setCts2(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Contact Details: ", error);
      });

    axios
      .get("http://localhost/rsc/mbs.php")
      .then((response) => {
        setMbs(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Membership Details: ", error);
      });

    axios
      .get("http://localhost/rsc/events.php")
      .then((response) => {
        setVnts(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Events Details: ", error);
      });
  }, []);

  const fclts = [
    { img: "/app/IMG/RSC/RSC_02.webp", name: "Indoor Sports", path: "/facilities/indoor" },
    { img: "/app/IMG/RSC/RSC_04.webp", name: "Outdoor Sports", path: "/facilities/outdoor" },
    { img: "/app/IMG/RSC/RSC_06.webp", name: "Recreation Sports", path: "/facilities/recreation" },
  ];

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
          {mbs.length > 0 && (
            <div className="m-membership__content h-[75vh] bg-black relative">
              <img
                src={mbs[0].img}
                alt="RSC_08"
                className="h-full float-right"
              ></img>
              <div className="m-membership__text h-full w-1/2 flex justify-center items-center flex-col absolute">
                <div className="m-membership__text-main text-cyan-400 text-4xl">
                  {mbs[0].text}
                </div>
                <Link
                  to="/membership"
                  className="m-membership__text-btn w-[10vw] h-[2.5vw] border-2 border-solid border-cyan-400 flex justify-center items-center m-4 anmt"
                >
                  Register Now
                </Link>
              </div>
            </div>)}
        </div>
        <div className="m-events">
          <div className="m-events__title h-[15vh] text-4xl bg-zinc-900 border-2 border-solid border-cyan-400 flex justify-center items-center">
            <i className="fa-light fa-calendar-check text-2xl m-2"></i>
            EVENTS
            <i className="fa-light fa-calendar-check text-2xl m-2"></i>
          </div>
          {vnts.length > 0 && (
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
            </div>)}
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
                {cts2.length > 0 && (
                  <p className="max-w-full whitespace-pre-line">{cts2[0].description2}</p>
                )}
              </div>
              {cts.length > 0 && (
                <div className="m-cts__sp h-1/5">
                  {cts.map((ct) => (
                    <div key={ct.text}>
                      <i className={`${ct.icon} px-2`}></i>
                      <span>{ct.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="m-cts__map max-w-[40%] flex-[0_0_40%] m-auto">
              {cts2.length > 0 && (
                <iframe
                  src={cts2[0].map}
                  loading="lazy"
                  className="h-[30vw] w-full border-2 border-solid border-emerald-900"
                  title="map"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}