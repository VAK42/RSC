import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  img: string;
  name: string;
  path: string;
  price: number;
  description: string;
};

interface ProductInfo extends Product {
  quantity: number;
  total: number;
}

export const loader: LoaderFunction = async ({ params }) => {
  const pd = params?.pd as string;
  try {
    const response = await axios.get("http://localhost/rsc/store.php");
    const products: Product[] = response.data;
    const product = products.find((p) => p.path === `/store2/${pd}`);

    if (!product) {
      return json({ error: "Product Not Found!" }, { status: 404 });
    }

    return json({ product });
  } catch (error) {
    console.error("Error Fetching Product:", error);
    return json({ error: "Failed To Fetch Product" }, { status: 500 });
  }
};

export default function ProductPage() {
  const { product, error } = useLoaderData<{
    product: Product;
    error?: string;
  }>();
  const [message, setMessage] = useState<string>("");

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddToCart = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const productInfo: ProductInfo = {
        ...product,
        quantity: 1,
        total: product.price,
      };
      const existingCartItems: ProductInfo[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const index = existingCartItems.findIndex(
        (item) => item.name === product.name && item.price === product.price
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
      window.location.href = "/login";
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
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh]">
        {message !== "" && (
          <div
            className={
              "border-2 border-solid border-emerald-900 bg-green-50 p-2 m-4 right-0 fixed"
            }
          >
            {message}
          </div>
        )}
        <div className="max-w-[70%] flex-[0_0_70%] min-h-full flex m-auto">
          <div className={"max-w-[50%] flex-[0_0_50%] m-auto"}>
            <img
              src={product.img}
              alt={product.name}
              className={"h-4/5 w-4/5 border-2 border-solid border-emerald-900"}
            />
          </div>
          <div className={"max-w-[50%] flex-[0_0_50%] m-auto"}>
            <h1 className={"text-4xl py-4"}>{product.name}</h1>
            <p className="max-w-full whitespace-pre-line">{product.description}</p>
            <div className={"text-green-900 text-2xl py-2"}>
              {product.price}$
            </div>
            <button
              className={
                "border-2 border-solid border-emerald-900 px-4 my-4 hover:bg-green-100 anmt"
              }
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}