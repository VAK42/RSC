import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useEffect, useState } from "react";
import { Link, json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import axios from "axios";

type Product = {
  img: string;
  name: string;
  path: string;
  price: number;
  description: string;
};

export const loader: LoaderFunction = async () => {
  try {
    console.log("Fetching Products...");
    const response = await axios.get("http://localhost/rsc/store.php");
    console.log("Response Received: ", response.data);
    const products: Product[] = response.data;
    return json({ products });
  } catch (error) {
    console.error("Error Fetching Products: ", error);
    return json({ error: "Failed To Fetch Products!" }, { status: 500 });
  }
};

export default function Store() {
  const { products, error } = useLoaderData<{
    products: Product[];
    error?: string;
  }>();
  const [query, setQuery] = useState<string>("");
  const [filteredSpd, setFilteredSpd] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      setFilteredSpd(products);
    }
  }, [products]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setQuery(searchText);

    if (searchText === "") {
      setFilteredSpd(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      );
      setFilteredSpd(filteredProducts);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!products) {
    return <div>Loading...</div>;
  }
  if (products.length === 0) {
    return <div>No Products Available</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh]">
        <div className="max-w-[80%] flex-[0_0_80%] m-auto">
          <div className="text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-950 flex justify-center items-center">
            STORE
          </div>
          <div className="mt-8 text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-dashed before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-dashed after:border-emerald-950 flex justify-center items-center">
            <div className="max-w-[40%] flex-[0_0_40%] flex">
              <form className="w-full h-full flex justify-center items-center">
                <label htmlFor="search">{ }</label>
                <input
                  type="text"
                  id="search"
                  placeholder={"Search Products..."}
                  value={query}
                  onChange={handleSearch}
                  className="w-full m-0 pl-2 border-t-2 border-r-0 border-b-2 border-l-2 border-solid border-emerald-950 focus:text-emerald-950 focus:outline-none"
                />
              </form>
              <div className="text-emerald-950 border-t-2 border-r-2 border-b-2 border-l-0 border-solid border-emerald-950 max-w-[10%] flex-[0_0_10%] flex justify-center items-center">
                <i className="fa-solid fa-magnifying-glass" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 p-4 overflow-auto">
            {filteredSpd.map((pd) => (
              <Link
                key={pd.path}
                to={pd.path}
                className="border-2 border-solid border-emerald-900 anmt anmt4"
              >
                <div className="h-3/4 flex justify-center items-center overflow-hidden">
                  <img
                    src={pd.img}
                    alt={pd.img}
                    className="min-w-full min-h-full"
                  />
                </div>
                <div className="h-1/4 text-2xl text-white bg-zinc-900 border-t-2 border-solid border-emerald-900 flex justify-center items-center">
                  {pd.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}