import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { fclts } from "./facilities._index";

export interface Facility {
  img: string;
  img_0: string;
  name: string;
  path: string;
  description: string;
  fp_0: string;
  fp_2: string;
  fp_4: string;
  fp_00: string;
  fp_02: string;
  fp_04: string;
}

export type FacilitySets = {
  [key: string]: Facility[];
};

export const facilitySets: FacilitySets = {
  "Indoor Sports": [
    {
      img: "/app/IMG/0/Basketball.webp",
      name: "Basketball",
      path: "/facilities/indoor/basketball",
      img_0: "/app/IMG/0/Basketball.png",
      fp_0: "/app/IMG/0/LBJ.webp",
      fp_2: "/app/IMG/0/Curry.webp",
      fp_4: "/app/IMG/0/Jokic.webp",
      fp_00: "LeBron James",
      fp_02: "Stephen Curry",
      fp_04: "Nikola Jokić",
      description: `RSC`,
    },
    {
      img: "/app/IMG/0/Volleyball.webp",
      name: "Volleyball",
      path: "/facilities/indoor/volleyball",
      img_0: "/app/IMG/0/Volleyball_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/Badminton.webp",
      name: "Badminton",
      path: "/facilities/indoor/badminton",
      img_0: "/app/IMG/0/Badminton_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/TT.webp",
      name: "Table Tennis",
      path: "/facilities/indoor/tabletennis",
      img_0: "/app/IMG/0/TT_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/Squash.webp",
      name: "Squash",
      path: "/facilities/indoor/squash",
      img_0: "/app/IMG/0/Squash_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/Bowling.webp",
      name: "Bowling",
      path: "/facilities/indoor/bowling",
      img_0: "/app/IMG/0/Bowling_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
  ],
  "Recreation Sports": [
    {
      img: "/app/IMG/0/Football.webp",
      name: "Football",
      path: "/facilities/recreation/football",
      img_0: "/app/IMG/0/Football_00.webp",
      fp_0: "/app/IMG/0/Messi.webp",
      fp_2: "/app/IMG/0/Ronaldo.webp",
      fp_4: "/app/IMG/0/Lewandowski.webp",
      fp_00: "Lionel Messi",
      fp_02: "Cristiano Ronaldo",
      fp_04: "Robert Lewandowski",
      description: `RSC`,
    {
      img: "/app/IMG/0/Basketball.webp",
      name: "Basketball",
      path: "/facilities/recreation/basketball",
      img_0: "/app/IMG/0/Basketball.png",
      fp_0: "/app/IMG/0/LBJ.webp",
      fp_2: "/app/IMG/0/Curry.webp",
      fp_4: "/app/IMG/0/Jokic.webp",
      fp_00: "LeBron James",
      fp_02: "Stephen Curry",
      fp_04: "Nikola Jokić",
      description: `RSC`,
    {
      img: "/app/IMG/0/Volleyball.webp",
      name: "Volleyball",
      path: "/facilities/recreation/volleyball",
      img_0: "/app/IMG/0/Volleyball_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/Tennis.webp",
      name: "Tennis",
      path: "/facilities/recreation/tennis",
      img_0: "/app/IMG/0/Tennis_00.webp",
      fp_0: "/app/IMG/0/RogerFederer.webp",
      fp_2: "/app/IMG/0/NovakDjokovic.webp",
      fp_4: "/app/IMG/0/RafaelNadal.webp",
      fp_00: "Roger Federer",
      fp_02: "Novak Djokovic",
      fp_04: "Rafael Nadal",
      description: `
      description: `RSC`,
    {
      img: "/app/IMG/0/Swimming.webp",
      name: "Swimming",
      path: "/facilities/recreation/swimming",
      img_0: "/app/IMG/0/Swimming_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/TT.webp",
      name: "Table Tennis",
      path: "/facilities/recreation/tabletennis",
      img_0: "/app/IMG/0/TT_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `
      description: `RSC`,
  ],
  "Outdoor Sports": [
    {
      img: "/app/IMG/0/Football.webp",
      name: "Football",
      path: "/facilities/outdoor/football",
      img_0: "/app/IMG/0/Football_00.webp",
      fp_0: "/app/IMG/0/Messi.webp",
      fp_2: "/app/IMG/0/Ronaldo.webp",
      fp_4: "/app/IMG/0/Lewandowski.webp",
      fp_00: "Lionel Messi",
      fp_02: "Cristiano Ronaldo",
      fp_04: "Robert Lewandowski",
      description: `RSC`,
    {
      img: "/app/IMG/0/Basketball.webp",
      name: "Basketball",
      path: "/facilities/outdoor/basketball",
      img_0: "/app/IMG/0/Basketball.png",
      fp_0: "/app/IMG/0/LBJ.webp",
      fp_2: "/app/IMG/0/Curry.webp",
      fp_4: "/app/IMG/0/Jokic.webp",
      fp_00: "LeBron James",
      fp_02: "Stephen Curry",
      fp_04: "Nikola Jokić",
      description: `RSC`,
    {
      img: "/app/IMG/0/Tennis.webp",
      name: "Tennis",
      path: "/facilities/outdoor/tennis",
      img_0: "/app/IMG/0/Tennis_00.webp",
      fp_0: "/app/IMG/0/RogerFederer.webp",
      fp_2: "/app/IMG/0/NovakDjokovic.webp",
      fp_4: "/app/IMG/0/RafaelNadal.webp",
      fp_00: "Roger Federer",
      fp_02: "Novak Djokovic",
      fp_04: "Rafael Nadal",
      description: `RSC`,
    {
      img: "/app/IMG/0/Baseball.webp",
      name: "Baseball",
      path: "/facilities/outdoor/baseball",
      img_0: "/app/IMG/0/Baseball_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/AF.webp",
      name: "American Football",
      path: "/facilities/outdoor/americanfootball",
      img_0: "/app/IMG/0/AF_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
    {
      img: "/app/IMG/0/Golf.webp",
      name: "Golf",
      path: "/facilities/outdoor/golf",
      img_0: "/app/IMG/0/Golf_00.webp",
      fp_0: "",
      fp_2: "",
      fp_4: "",
      fp_00: "",
      fp_02: "",
      fp_04: "",
      description: `RSC`,
  ],
};

export const loader: LoaderFunction = async ({ params }) => {
  const lt = params?.fc as string;
  const fclt = fclts.find((p) => p.path === `/facilities/${lt}`);

  if (!fclt) {
    return { status: 404, error: "Page Not Found!" };
  }

  return { fclt };
};

export default function FacilitiesPage() {
  const { fclt } = useLoaderData<{ fclt: Facility }>();
  const facilities: Facility[] = facilitySets[fclt.name] || [];
  return (
    <>
      <Header />
      <main className="pt-[5rem] text-white bg-black flex justify-center items-center flex-col">
        <div className="w-[70%] text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-white after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-white flex justify-center items-center">
          {fclt.name}
        </div>
        <div className="m-fclt__content max-w-[70%] flex-[0_0_70%] grid grid-cols-3 gap-4 p-4 overflow-auto">
          {facilities.map((facility) => (
            <Link
              key={facility.img}
              to={facility.path}
              className="m-fclt__item border-2 border-solid border-cyan-400 anmt anmt4"
            >
              <div className="m-fclt__img h-3/4 flex justify-center items-center overflow-hidden">
                <img
                  src={facility.img}
                  alt={facility.name}
                  className="min-w-full min-h-full"
                />
              </div>
              <div className="m-fclt__description h-1/4 text-2xl bg-zinc-900 border-t-2 border-solid border-cyan-400 flex justify-center items-center">
                <i className="fa-light fa-circle-right text-2xl m-2"></i>
                {facility.name}
                <i className="fa-light fa-circle-right text-2xl m-2"></i>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}