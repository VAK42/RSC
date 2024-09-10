import { Outlet } from "@remix-run/react";
import Admin_Sidebar from "~/components/Admin_Sidebar";
import { useEffect, useState } from "react";

export default function Admin() {
  const [token, setToken] = useState<boolean>(false);
  useEffect(() => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(true);
    }
  }, []);

  return (
    <>
      {token ? (
        <main className="min-h-[100vh] flex">
          <Admin_Sidebar />
          <div className="max-w-[90%] flex-[0_0_90%] text-white bg-zinc-900">
            <Outlet />
          </div>
        </main>
      ) : (
        <div className="min-h-[100vh] text-center text-4xl text-red-400 mt-4">
          <i className="fa-light fa-circle-radiation text-4xl m-2"></i>
          You’re Not Authorized To Access This Page
          <i className="fa-light fa-circle-radiation text-4xl m-2"></i>
        </div>
      )}
    </>
  );
}