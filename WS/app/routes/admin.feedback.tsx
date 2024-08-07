import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useState, useEffect } from "react";

type Feedback = {
  id: number;
  name: string;
  email: string;
  feedback: string;
};

export const loader: LoaderFunction = async () => {
  try {
    console.log("Fetching Feedbacks...");
    const response = await axios.get("http://localhost/rsc/fb.php");
    console.log("Response Received: ", response.data);
    const feedbacks: Feedback[] = response.data;
    return json({ feedbacks });
  } catch (error) {
    console.error("Error Fetching Feedbacks: ", error);
    return json({ error: "Failed To Fetch Feedbacks!" }, { status: 500 });
  }
};

export default function Admin_Feedback() {
  const { feedbacks, error } = useLoaderData<{
    feedbacks: Feedback[];
    error?: string;
  }>();
  const [fb, setFb] = useState<Feedback[]>([]);

  useEffect(() => {
    if (feedbacks) {
      setFb(feedbacks);
    }
  }, [feedbacks]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.post("http://localhost/rsc/fb_.php", { id });
      console.log("Delete Response: ", response.data);
      setFb(response.data);
    } catch (error) {
      console.error("Error Deleting Feedback: ", error);
    }
  };

  return (
    <>
      <main className="h-[100vh] overflow-auto">
        {fb.length === 0 ? (
          <div className="text-center text-red-400 text-4xl mt-4">
            <i className="fa-light fa-face-sad-tear text-8xl m-2"></i>
            No Feedbacks Available!
            <i className="fa-light fa-face-sad-tear text-8xl m-2"></i>
          </div>
        ) : (
          fb.map((sfb) => (
            <div
              key={sfb.name}
              className="w-[50vw] bg-zinc-800 border-2 border-solid border-emerald-900 mx-auto my-[5vw] relative"
            >
              <button
                onClick={() => handleDelete(sfb.id)}
                className="absolute top-0 right-0 hover:text-red-400"
              >
                <i className="fa-light fa-hexagon-xmark text-4xl"></i>
              </button>
              <div className="flex">
                <div className="p-2">
                  <i className="fa-sharp fa-light fa-user-secret mx-2 text-emerald-400"></i>
                  Name: {sfb.name}
                  <i className="fa-light fa-arrow-left ml-2 text-violet-400"></i>
                  <i className="fa-light fa-arrow-right mr-2 text-violet-400"></i>
                  <i className="fa-light fa-envelopes mx-2 text-red-400"></i>
                  Email: {sfb.email}
                </div>
              </div>
              <div className="border-t-2 border-solid border-emerald-900 p-2">
                <i className="fa-sharp fa-light fa-pen-nib mx-2 text-sky-400"></i>
                {sfb.feedback}
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}