import { useLoaderData } from "@remix-run/react";
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
      return new Response(
        JSON.stringify({ error: "Page Not Found!" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ vnt }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed To Fetch Events" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
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
    <main>
      <img src={vnt.img2} alt={vnt.name}></img>
      <div className="max-w-[70%] flex-[0_0_70%] m-auto">
        <p className="max-w-full text-xl whitespace-pre-line">{vnt.description}</p>
      </div>
    </main>
  );
}