import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

export default function Pwd() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rpassword, setRPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [btn, setBtn] = useState<string>("SEND CODE");
  const [pwd, setPwd] = useState(false);
  const handlePwd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (btn === "SEND CODE") {
      try {
        const response = await axios.post<{
          success?: boolean;
          error?: string;
          email: string;
        }>("http://localhost/rsc/_pwd.php", { email });
        console.log(response.data);
        if (response.data.success) {
          setMessage("Successful! Check Your Email!");
          setSuccess(true);
          setBtn("SUBMIT");
          sessionStorage.setItem("email", email);
        } else if (response.data.error) {
          setMessage(response.data.error);
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something Went Wrong!");
        setSuccess(false);
      }
    } else if (btn === "SUBMIT") {
      try {
        const response = await axios.post<{
          success?: boolean;
          error?: string;
          code: string;
        }>("http://localhost/rsc/_pwd_.php", { code });
        console.log(response.data);
        if (response.data.success) {
          setMessage("Successful! Wait A Second!");
          setSuccess(true);
          setBtn("RESET");
        } else if (response.data.error) {
          setMessage(response.data.error);
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something Went Wrong!");
        setSuccess(false);
      }
    } else if (btn === "RESET") {
      try {
        const email = sessionStorage.getItem("email");
        if (!email) {
          setMessage("Something Went Wrong! (Email)");
          setSuccess(false);
          return;
        }
        const response = await axios.post<{
          success?: boolean;
          error?: string;
          email: string;
          password: string;
          rpassword: string;
        }>("http://localhost/rsc/pwd_.php", { email, password, rpassword });
        console.log(response.data);
        if (response.data.success) {
          setMessage("Password Updated Successfully!");
          setSuccess(true);
          window.location.href = "/login";
        } else if (response.data.error) {
          setMessage(response.data.error);
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something Went Wrong!");
        setSuccess(false);
      }
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
  const showPwd = () => {
    setPwd(!pwd);
  };
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
            <h2 className="text-center text-2xl mt-10">RESET PASSWORD</h2>
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
            <form action="pwd.php" method="post" onSubmit={handlePwd}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa-light fa-envelope m-2"></i>
                <TextField
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="standard"
                  className="w-full"
                />
              </Box>
              {btn === "SUBMIT" && (
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <i className="fa-light fa-lock m-2"></i>
                  <TextField
                    type="text"
                    name="code"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    label="Code"
                    variant="standard"
                    className="w-full"
                  />
                </Box>
              )}
              {btn === "RESET" && (
                <div>
                  <div className="flex justify-between relative">
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <i className="fa-light fa-lock m-2"></i>
                      <TextField
                        type={pwd ? "text" : "password"}
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="standard"
                        className="w-full relative"
                      />
                    </Box>
                    <button
                      type="button"
                      onClick={showPwd}
                      className="absolute right-[5%] inset-y-0"
                    >
                      {pwd ? (
                        <i className="fa-light fa-eye-slash"></i>
                      ) : (
                        <i className="fa-light fa-eye"></i>
                      )}
                    </button>
                  </div>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <i className="fa-light fa-lock m-2"></i>
                    <TextField
                      type="password"
                      name="password"
                      required
                      value={rpassword}
                      onChange={(e) => setRPassword(e.target.value)}
                      label="Re-enter Password"
                      variant="standard"
                      className="w-full"
                    />
                  </Box>
                </div>
              )}
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
                  {btn}
                </Button>
              </Box>
            </form>
            <div className="flex justify-between text-sm">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}