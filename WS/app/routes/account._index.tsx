import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useEffect, useState } from "react";

export default function Account() {
  const [userInfo, setUserInfo] = useState<{
    fullname: string;
    email: string;
    username: string;
    phone: number;
    user_id: number;
  } | null>(null);

  const [productInfo, setProductInfo] = useState<
    Array<{
      user_id: number;
      pd_name: string | null;
      price: number | null;
      qtt: number | null;
      total: number | null;
    }>
  >([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (Array.isArray(parsedUserData)) {
        const firstUser = parsedUserData[0];
        setUserInfo({
          user_id: firstUser.user_id,
          username: firstUser.username,
          fullname: firstUser.fullname,
          email: firstUser.email,
          phone: firstUser.phone,
        });

        const productInfoData = parsedUserData.map((userData) => ({
          user_id: userData.user_id,
          pd_name: userData.pd_name,
          price: userData.price,
          qtt: userData.qtt,
          total: userData.total,
        }));
        setProductInfo(productInfoData);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };
  return (
    <>
      <Header />
      <main className="pt-[5rem] min-h-[100vh]">
        <div className="max-w-[70%] flex-[0_0_70%] m-auto">
          <div
            className={
              "text-center text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-950 flex justify-center items-center"
            }
          >
            <i className="fa-light fa-circle-user text-8xl p-4"></i>
          </div>
          <div className="form-ctn max-w-[50%] m-auto">
            <h2 className="text-center text-2xl border-2 border-solid border-emerald-900 mt-10">
              My Info
            </h2>
            {userInfo && (
              <div className="h-[8vw] border-2 border-solid border-emerald-900 p-4">
                <div className="w-full float-left">
                  Fullname:
                  <span className="float-right">{userInfo.fullname}</span>
                </div>
                <div className="w-full float-left">
                  Username:
                  <span className="float-right">{userInfo.username}</span>
                </div>
                <div className="w-full float-left">
                  Email:<span className="float-right">{userInfo.email}</span>
                </div>
                <div className="w-full float-left">
                  Phone Number:
                  <span className="float-right">{userInfo.phone}</span>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center items-center">
              <button
                onClick={handleLogout}
                className="border-2 border-solid border-emerald-900 my-2 px-2 hover:bg-red-200"
              >
                Logout
              </button>
            </div>
          </div>
          <div
            className={
              "text-center text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-950 flex justify-center items-center my-10"
            }
          >
            <i className="fa-solid fa-cart-shopping text-8xl p-4"></i>
          </div>
          {productInfo[0]?.pd_name !== null ? (
            <table
              className={
                "w-full mb-4 border-[1px] border-solid border-slate-900 border-collapse"
              }
            >
              <thead>
                <tr className={"flex bg-green-200"}>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[60%] flex-[0_0_60%] flex justify-center items-center"
                    }
                  >
                    Purchased Products|Services
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
                      "border-[1px] border-solid border-slate-900 max-w-[15%] flex-[0_0_15%] flex justify-center items-center"
                    }
                  >
                    Price
                  </td>
                  <td
                    className={
                      "border-[1px] border-solid border-slate-900 max-w-[15%] flex-[0_0_15%] flex justify-center items-center"
                    }
                  >
                    Total
                  </td>
                </tr>
              </thead>
              {productInfo.map((pddt) => (
                <tbody key={pddt.pd_name}>
                  <tr className={"flex"}>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[60%] flex-[0_0_60%] px-4"
                      }
                    >
                      {pddt.pd_name}
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[10%] flex-[0_0_10%] flex justify-center items-center"
                      }
                    >
                      {pddt.qtt}
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[15%] flex-[0_0_15%] flex justify-center items-center"
                      }
                    >
                      {pddt.price}$
                    </td>
                    <td
                      className={
                        "border-[1px] border-solid border-slate-900 max-w-[15%] flex-[0_0_15%] flex justify-center items-center"
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
              <p className="text-2xl">You Have Not Purchased Anything Yet!</p>
              <i className="fa-light fa-face-sad-sweat text-8xl"></i>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}