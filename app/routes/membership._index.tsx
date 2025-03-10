import { useEffect, useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";

interface Membership {
  name: string;
  ft1: string;
  ft2: string;
  ft3: string;
  ft4: string;
  ft5: string;
  price: number;
}

interface ProductProps {
  name: string;
  price: number;
}

interface ProductInfo extends ProductProps {
  quantity: number;
  total: number;
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get("http://localhost/rsc/mbs.php");
    const mbstb: Membership[] = response.data;
    return new Response(
      JSON.stringify({ mbstb }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed To Fetch Memberships!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export default function Membership() {
  const navigate = useNavigate();
  const { mbstb, error } = useLoaderData<{
    mbstb: Membership[];
    error?: string;
  }>();
  const [membership, setMembership] = useState<Membership[]>([]);
  useEffect(() => {
    if (mbstb) {
      setMembership(mbstb);
    }
  }, [mbstb]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!mbstb) {
    return <div>Loading...</div>;
  }
  const [message, setMessage] = useState<string>("");
  const handleAddToCart = (name: string, price: number) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const productInfo: ProductInfo = {
        name,
        price,
        quantity: 1,
        total: price,
      };
      const existingCartItems: ProductInfo[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const index = existingCartItems.findIndex(
        (item) => item.name === name && item.price === price
      );
      if (index !== -1) {
        existingCartItems[index].quantity++;
        existingCartItems[index].total =
          existingCartItems[index].price * existingCartItems[index].quantity;
      } else {
        existingCartItems.push(productInfo);
      }
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      setMessage("Added To Cart!");
    } else {
      navigate('/login');
    }
  };
  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <main className="pt-[5rem] min-h-[100vh] flex justify-center items-center flex-col">
      <div className="w-[70%] text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-900 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-900 flex justify-center items-center">
        MEMBERSHIP
      </div>
      {message !== "" && (
        <div
          className={
            "border-2 border-solid border-cyan-300 p-2 m-4 right-0 fixed"
          }
        >
          {message}
        </div>
      )}
      <div className="m-events__content max-w-[80%] flex-[0_0_80%] grid grid-cols-6 gap-4 p-4 m-auto">
        {membership.map((mbs) => (
          <div
            key={mbs.name}
            className={"border-2 border-solid border-emerald-900"}
          >
            <div className="mbs-tt text-cyan-400 bg-zinc-900 py-4 text-center">
              {mbs.name}
            </div>
            <ul className="mbs-ft border-y-2 border-solid border-emerald-900 px-2 pt-20">
              <li className={"text-center"}>{mbs.ft1}</li>
              <li className={"text-center"}>{mbs.ft2}</li>
              <li className={"text-center"}>{mbs.ft3}</li>
              <li className={"text-center"}>{mbs.ft4}</li>
              <li className={"text-center"}>{mbs.ft5}</li>
              <li className={"text-green-500 text-center mt-20"}>
                {mbs.price}$
              </li>
            </ul>
            <button
              className="w-full mbs-btn text-white bg-zinc-900 flex justify-center py-2 anmt"
              onClick={() => handleAddToCart(mbs.name, mbs.price)}
            >
              Register Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}