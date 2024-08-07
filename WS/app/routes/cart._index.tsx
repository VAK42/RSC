import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
  }, []);

  const handleIncreaseQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    updatedCartItems[index].total =
      updatedCartItems[index].price * updatedCartItems[index].quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      updatedCartItems[index].total =
        updatedCartItems[index].price * updatedCartItems[index].quantity;
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleCheckout = async () => {
    try {
      const cartString = localStorage.getItem("cart");
      const userDataString = localStorage.getItem("userData");
      if (!cartString || !userDataString) {
        throw new Error("Something Went Wrong!");
      }
      const cart = JSON.parse(cartString);
      const userData = JSON.parse(userDataString);
      const user_id = userData[0].user_id;
      const data = {
        cart,
        user_id,
      };
      const response = await axios.post(
        "http://localhost/rsc/checkout.php",
        data
      );
      localStorage.setItem("userData", JSON.stringify(response.data));
      console.log("Success:", response.data);
      setMessage("Thank You For Purchasing!");
      setSuccess(true);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something Went Wrong!");
      setSuccess(false);
    }
  };
  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh] relative">
        {message !== "" && (
          <div
            className={`border-2 border-solid border-emerald-950 p-2 m-4 right-0 absolute ${success ? "bg-green-50" : "bg-red-50"
              }`}
          >
            {message}
          </div>
        )}
        <div className="max-w-[70%] flex-[0_0_70%] m-auto">
          <div className="text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-950 flex justify-center items-center">
            <i className="fa-solid fa-cart-shopping text-8xl p-4"></i>
          </div>
          {cartItems.length > 0 ? (
            <table
              className={
                "w-full mb-4 border-[1px] border-solid border-slate-900 border-collapse"
              }
            >
              <thead>
                <tr className={"flex bg-green-200"}>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[5%] flex-[0_0_5%] flex justify-center items-center"
                    }
                  ></td>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[65%] flex-[0_0_65%] flex justify-center items-center"
                    }
                  >
                    Products|Services
                  </td>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                    }
                  >
                    Quantity
                  </td>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                    }
                  >
                    Price
                  </td>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                    }
                  >
                    Total
                  </td>
                </tr>
              </thead>
              {cartItems.map((pddt, index) => (
                <tbody key={pddt.name}>
                  <tr className={"flex"}>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[5%] flex-[0_0_5%]" +
                        " flex justify-center items-center"
                      }
                    >
                      <button
                        className={"w-full h-full hover:bg-red-200"}
                        onClick={() => handleDeleteItem(index)}
                      >
                        <i className="fa-regular fa-trash"></i>
                      </button>
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[65%] flex-[0_0_65%] px-4"
                      }
                    >
                      {pddt.name}
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                      }
                    >
                      <button
                        className={"max-w-[20%] flex-[0_0_20%] anmt bg-red-200"}
                        onClick={() => handleDecreaseQuantity(index)}
                      >
                        -
                      </button>
                      <div
                        className={
                          "max-w-[60%] flex-[0_0_60%] border-x-2 border-solid" +
                          " border-emerald-900 text-center"
                        }
                      >
                        {pddt.quantity}
                      </div>
                      <button
                        className={
                          "max-w-[20%] flex-[0_0_20%] anmt bg-green-200"
                        }
                        onClick={() => handleIncreaseQuantity(index)}
                      >
                        +
                      </button>
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                      }
                    >
                      {pddt.price}$
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                      }
                    >
                      {pddt.total}$
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <div className="flex justify-center items-center">
              <i className="fa-light fa-face-sad-sweat text-8xl"></i>
              <p className="text-2xl">There Is Nothing In Your Current Cart!</p>
              <i className="fa-light fa-face-sad-sweat text-8xl"></i>
            </div>
          )}
          {cartItems.length > 0 ? (
            <button
              type="submit"
              className={
                "border-2 border-solid border-slate-900 bg-red-200 px-2 anmt float-right"
              }
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          ) : (
            ""
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}