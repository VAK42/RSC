import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { vnts } from "./events._index";

type Events = {
  img2: string;
  name: string;
  path: string;
  description: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const vntpr = params?.vnt as string;
  const vnt = vnts.find(
    (p: { path: string }) => p.path === `/events/${[vntpr]}`
  );

  if (!vnt) {
    return json({ error: "Page Not Found!" }, { status: 404 });
  }

  return json({ vnt });
};

export default function ProductPage() {
  const { vnt } = useLoaderData<{ vnt: Events }>();
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