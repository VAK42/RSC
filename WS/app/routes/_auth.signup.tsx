import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/rsc/signup.php", {
        username,
        password,
        fullname,
        email,
        phone,
        rpassword,
      });

      if (response.data.success) {
        setMessage("Successful!");
        setSuccess(true);
        window.location.href = "/login";
      } else if (response.data.error) {
        setMessage(response.data.error);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An Error Occurred While Signing Up!");
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
            <h2 className="text-center text-2xl mt-10">SIGN UP</h2>
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
            <form action="signup.php" method="post" onSubmit={handleSignup}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa-light fa-user-crown m-2"></i>
                <TextField
                  type="text"
                  name="fullname"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  label="Fullname"
                  variant="standard"
                  className="w-full"
                />
              </Box>
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
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <i className="fa-light fa-phone m-2"></i>
                <TextField
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone Number"
                  variant="standard"
                  className="w-full"
                />
              </Box>
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
                  SIGN UP
                </Button>
              </Box>
            </form>
            <Link to="/login" className="text-sm">
              Have An Account? Log In
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}