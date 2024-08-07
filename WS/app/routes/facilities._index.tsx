import { Link, json } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

type Facilities = {
  img: string;
  name: string;
  path: string;
};

export const fclts: Facilities[] = [
  { img: "/app/IMG/RSC/RSC_02.webp", name: "Indoor Sports", path: "/facilities/indoor" },
  { img: "/app/IMG/RSC/RSC_04.webp", name: "Outdoor Sports", path: "/facilities/outdoor" },
  { img: "/app/IMG/RSC/RSC_06.webp", name: "Recreation Sports", path: "/facilities/recreation" },
];

export async function loader() {
  return json({ fclts });
}

export default function Facilities() {
  return (
    <>
      <Header />
      <main className="h-[110vh] text-white bg-black flex justify-center items-center flex-col">
        <div className="w-[75%] text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-white after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-white flex justify-center items-center">
          FACILITIES
        </div>
        <div className="m-fclt__content max-w-[75%] flex-[0_0_75%] grid grid-cols-3 gap-4 p-4 overflow-auto">
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
      </main>
      <Footer />
    </>
  );
}