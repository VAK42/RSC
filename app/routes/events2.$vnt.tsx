import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import axios from "axios";

type Events = {
  img2: string;
  name: string;
  path: string;
  description: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const vntpr = params?.vnt as string;
  try {
    const response = await axios.get("http://localhost/rsc/events.php");
    const events: Events[] = response.data;
    const vnt = events.find((p) => p.path === `/events/${vntpr}`);

    if (!vnt) {
      return json({ error: "Page Not Found!" }, { status: 404 });
    }

    return json({ vnt });
  } catch (error) {
    console.error("Error Fetching Events:", error);
    return json({ error: "Failed To Fetch Events" }, { status: 500 });
  }
};

export default function ProductPage() {
  const { vnt, error } = useLoaderData<{
    vnt: Events;
    error?: string;
  }>();

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Header />
      <main>
        <img src={vnt.img2} alt={vnt.name}></img>
        <div className="max-w-[70%] flex-[0_0_70%] m-auto">
          <p className="max-w-full text-xl whitespace-pre-line">{vnt.description}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}