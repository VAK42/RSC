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
  const cts = [
    {
      icon: "fa-sharp fa-regular fa-circle-phone",
      text: "+98265610080",
    },
    {
      icon: "fa-sharp fa-regular fa-envelope",
      text: "ryansports@gmail.com",
    },
    {
      icon: "fa-sharp fa-regular fa-location-dot",
      text: "10th Floor - Burj Khalifa, Dubai, UAE",
    },
    {
      icon: "fa-brands fa-facebook",
      text: "Ryan Sport Club",
    },
    {
      icon: "fa-brands fa-instagram",
      text: "Ryan Sport Club",
    },
    {
      icon: "fa-brands fa-x-twitter",
      text: "Ryan Sport Club",
    },
  ];
  const cts2 = [
    {
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115525.73856510432!2d55.19197486709517!3d25.197174173836935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2s!4v1718071501634!5m2!1sen!2s",
      description: `RSC`,
  ];
  return (
    <>
      <Header />
      <main className="pt-[5rem] max-w-[70%] flex-[0_0_70%] m-auto">
        <img src={RSC} alt="RTK" className="h-32 m-auto"></img>
        <p className="max-w-full text-xl whitespace-pre-line">{cts2[0].description}</p>
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
        <iframe
          src={cts2[0].map}
          loading="lazy"
          className="h-[30vw] w-full border-2 border-solid border-slate-900"
          title="map"
        ></iframe>
        {cts.map((ct, index) => (
          <span key={index}>
            <i className={`${ct.icon} px-1`}></i>
            <span>{ct.text}</span>
          </span>
        ))}
      </main>
      <Footer />
    </>
  );
}