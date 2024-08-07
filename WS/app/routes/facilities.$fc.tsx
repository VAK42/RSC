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
  "Indoor Sports": [],
  "Outdoor Sports": []
}

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