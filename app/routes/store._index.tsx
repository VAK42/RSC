import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useState } from "react";
import { Link, json } from "@remix-run/react";

type Product = {
  img: string;
  name: string;
  path: string;
  price: number;
  description: string;
};

export const spd: Product[] = [
  {
    img: "/app/IMG/4/Dumbbell.png",
    name: "Dumbbell",
    path: "/store/dumbbell",
    price: 30,
    description: `RSC`,
  {
    img: "/app/IMG/4/Bar.webp",
    name: "Bar",
    path: "/store/bar",
    price: 40,
    description: `RSC`,
  {
    img: "/app/IMG/4/Rings.webp",
    name: "Rings",
    path: "/store/rings",
    price: 50,
    description: `RSC`,
  {
    img: "/app/IMG/4/Treadmill.png",
    name: "Treadmill",
    path: "/store/treadmill",
    price: 150,
    description: `RSC`,
  {
    img: "/app/IMG/4/Football.png",
    name: "Football Ball",
    path: "/store/football",
    price: 50,
    description: `RSC`,
  {
    img: "/app/IMG/4/Basketball.png",
    name: "Basketball Ball",
    path: "/store/basketball",
    price: 50,
    description: `RSC`,
];

export async function loader() {
  return json({ spd });
}

export default function Store() {
  const [query, setQuery] = useState<string>("");
  const [filteredSpd, setFilteredSpd] = useState<Product[]>(spd);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setQuery(searchText);

    if (searchText === "") {
      setFilteredSpd(spd);
    } else {
      const filteredProducts = spd.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      );
      setFilteredSpd(filteredProducts);
    }
  };
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