import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link, json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import axios from "axios";
import { useEffect, useState } from "react";

type Events = {
  img: string;
  img2: string;
  name: string;
  path: string;
  description: string;
};

export const loader: LoaderFunction = async () => {
  try {
    console.log("Fetching Events...");
    const response = await axios.get("http://localhost/rsc/events.php");
    console.log("Response Received: ", response.data);
    const vnts: Events[] = response.data;
    return json({ vnts });
  } catch (error) {
    console.error("Error Fetching Events: ", error);
    return json({ error: "Failed To Fetch Events!" }, { status: 500 });
  }
};

export default function Events() {
  const { vnts, error } = useLoaderData<{
    vnts: Events[];
    error?: string;
  }>();
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    if (vnts) {
      setEvents(vnts);
    }
  }, [vnts]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh] text-white bg-black flex justify-center items-center flex-col">
        <div className="w-[75%] text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-white after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-white flex justify-center items-center">
          EVENTS
        </div>
        <div className="m-events__content max-w-[75%] flex-[0_0_75%] grid grid-cols-3 gap-4 p-4 m-auto">
          {events.map((vnt) => (
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