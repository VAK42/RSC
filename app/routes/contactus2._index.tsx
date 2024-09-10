import Header from "~/components/Header";
import Footer from "~/components/Footer";
import RSC from "~/IMG/RSC/RSC.png";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [cts, setCts] = useState<any[]>([]);
  const [cts2, setCts2] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/rsc/feedback.php", {
        name,
        email,
        feedback,
      });
      console.log(response.data);
      setMessage("Thank You For Your Feedback!");
      setSuccess(true);
    } catch (error) {
      console.error("Error Submitting Feedback:", error);
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

  useEffect(() => {
    axios
      .get("http://localhost/rsc/cts.php")
      .then((response) => {
        setCts(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Contact Details: ", error);
      });

    axios
      .get("http://localhost/rsc/cts2.php")
      .then((response) => {
        setCts2(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Contact Details: ", error);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[5rem] max-w-[70%] flex-[0_0_70%] m-auto">
        <img src={RSC} alt="RTK" className="h-32 m-auto"></img>
        {cts2.length > 0 && (
          <p className="max-w-full text-xl whitespace-pre-line">{cts2[0].description}</p>
        )}
        <form
          action="/"
          method="post"
          className="border-t-2 border-solid border-slate-900 py-4"
          onSubmit={handleSubmit}
        >
          {message !== "" && (
            <div className={success ? "text-green-400" : "text-red-400"}>
              {message}
            </div>
          )}
          <legend>
            We would love to hear your thoughts, suggestions or concerns with
            anything so we can improve!
          </legend>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <i className="fa-light fa-user-crown m-2"></i>
            <TextField
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="standard"
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
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <i className="fa-sharp fa-light fa-mailbox m-2"></i>
            <TextField
              type="text"
              name="feedback"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              label="Feedback"
              variant="standard"
              multiline
            />
          </Box>
          <Button
            type="submit"
            variant="text"
            startIcon={<i className="fa-light fa-rocket-launch"></i>}
          >
            SUBMIT
          </Button>
        </form>
        {cts2.length > 0 && (
          <iframe
            src={cts2[0].map}
            loading="lazy"
            className="h-[30vw] w-full border-2 border-solid border-slate-900"
            title="map"
          ></iframe>
        )}
        {cts.length > 0 && (
          <div>
            {cts.map((ct, index) => (
              <span key={index}>
                <i className={`${ct.icon} px-1`}></i>
                <span>{ct.text}</span>
              </span>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}