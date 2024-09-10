import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

interface UserData {
  user_id: number;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  pd_name: string | null;
  price: number | null;
  qtt: number | null;
  total: number | null;
}

export default function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{
        token: string;
        error?: string;
        fullname: string;
        username: string;
        email: string;
        phone: number;
        user_id: number;
        pd_name: string;
        qtt: number;
        price: number;
        total: number;
      }>("http://localhost/rsc/login.php", { username, password });

      if (response.data.error) {
        setMessage(response.data.error);
        setSuccess(false);
      } else {
        if (username === "admin") {
          localStorage.setItem("token", JSON.stringify(response.data));
          setMessage("Welcome Admin!");
          setSuccess(true);
          window.location.href = "/admin";
        } else {
          localStorage.setItem("userData", JSON.stringify(response.data));
          setMessage("Successful! Welcome!");
          setSuccess(true);
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An Error Occurred While Logging In!");
      setSuccess(false);
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
      <main className="pt-[5rem] h-[100vh]">
        <div className="max-w-[70%] flex-[0_0_70%] m-auto">
          <div
            className={
              "text-center text-4xl before:content-[''] before:grow before:m-auto before:border-b-2 before:border-solid before:border-emerald-950 after:content-[''] after:grow after:m-auto after:border-b-2 after:border-solid after:border-emerald-950 flex justify-center items-center"
            }
          >
            <i className="fa-light fa-circle-user text-8xl p-4"></i>
          </div>
          <div className="form-ctn max-w-[25%] m-auto">
            <h2 className="text-center text-2xl mt-10">LOG IN</h2>
            {message !== "" && (
              <div className={success ? "text-green-400" : "text-red-400"}>
                {success ? (
                  <i className="fa-light fa-check m-2"></i>
                ) : (
                  <i className="fa-light fa-circle-xmark m-2"></i>
                )}
                {message}
              </div>
            )}
            <form action="login.php" method="post" onSubmit={handleLogin}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa-light fa-user-crown m-2"></i>
                <TextField
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  variant="standard"
                  className="w-full"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa-light fa-lock m-2"></i>
                <TextField
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="standard"
                  className="w-full"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="text"
                  startIcon={<i className="fa-light fa-rocket-launch"></i>}
                >
                  LOG IN
                </Button>
              </Box>
            </form>
            <div className="flex justify-between text-sm">
              <Link to="/fgpwd">Forgotten Password?</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}