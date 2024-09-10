import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link, json } from "@remix-run/react";
import RSC_10 from "~/IMG/RSC/RSC_10.png";
import RSC_12 from "~/IMG/RSC/RSC_12.webp";
import RSC_14 from "~/IMG/RSC/RSC_14.webp";
import UEFA_00 from "~/IMG/2/UEFA_00.webp";
import Olympic_00 from "~/IMG/2/Olympic.avif";
import NBA_00 from "~/IMG/2/NBA.webp";

type Events = {
  img: string;
  img2: string;
  name: string;
  path: string;
  description: string;
};

export const vnts: Events[] = [
  {
    img: RSC_10,
    img2: UEFA_00,
    name: "UEFA Champions League 2024",
    path: "/events/uefa",
    description: `RSC`,
  },
  {
    img: RSC_12,
    img2: NBA_00,
    name: "NBA Champions League 2024",
    path: "/events/nba",
    description: `RSC`,
  {
    img: RSC_14,
    img2: Olympic_00,
    name: "Olympic 2024",
    path: "/events/olympic",
    description: `RSC`,
  },
];

export async function loader() {
  return json({ vnts });
}

export default function Events() {
  return (
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh] text-white bg-black flex justify-center items-center flex-col">
        <div className="w-[75%] text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-white after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-white flex justify-center items-center">
          EVENTS
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
              <div className="m-fclt__description h-1/4 text-2xl bg-zinc-900 border-t-2 border-solid border-cyan-400 flex justify-center items-center">
                <i className="fa-light fa-circle-right text-2xl m-2"></i>
                {vnt.name}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}