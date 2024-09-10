import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { Facility, facilitySets } from "./facilities.$fc";

export const loader: LoaderFunction = async ({ params }) => {
  const sfc = params?.fc as string;
  const slt = params?.lt as string;
  const keys = Object.keys(facilitySets);
  let foundFacility: Facility | undefined;

  for (let key of keys) {
    foundFacility = facilitySets[key].find(
      (p) => p.path === `/facilities/${sfc}/${slt}`
    );
    if (foundFacility) {
      break;
    }
  }

  if (!foundFacility) {
    return { status: 404, error: "Page Not Found!" };
  }

  return { fclt: foundFacility };
};

export default function FacilityPage() {
  const { fclt } = useLoaderData<{
    fclt: {
      name: string;
      path: string;
      img: string;
      img_0: string;
      description: string;
      fp_0: string;
      fp_2: string;
      fp_4: string;
      fp_00: string;
      fp_02: string;
      fp_04: string;
    };
  }>();
  const fp = [
    { img: fclt.fp_0, name: fclt.fp_00 },
    { img: fclt.fp_2, name: fclt.fp_02 },
    { img: fclt.fp_4, name: fclt.fp_04 },
  ];
  const fpRender = fp.every((item) => item.img && item.name);
  return (
    <>
      <Header />
      <main>
        <img src={fclt.img_0} alt={fclt.img_0} />
        <div className="max-w-[70%] flex-[0_0_70%] m-auto">
          <p className="max-w-full text-xl whitespace-pre-line">{fclt.description}</p>
          <h1>
            <b className={"text-2xl"}>*Famous Players:</b>
          </h1>
          {fpRender && (
            <div className="m-fclt__content text-white grid grid-cols-3 gap-4 p-4 overflow-auto">
              {fp.map((f) => (
                <div
                  key={f.img}
                  className="m-fclt__item border-2 border-solid border-cyan-400 anmt"
                >
                  <div className="m-fclt__img h-4/5 flex justify-center items-center overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.img}
                      className="min-w-full min-h-full"
                    />
                  </div>
                  <div className="m-fclt__description h-1/5 text-2xl bg-zinc-900 border-t-2 border-solid border-cyan-400 flex justify-center items-center">
                    {f.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}