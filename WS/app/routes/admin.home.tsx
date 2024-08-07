import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin_Home() {
    const [editableDescription, setEditableDescription] = useState("");
    const [message, setMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get("http://localhost/rsc/cts2.php")
            .then((response) => {
                setEditableDescription(response.data[0].description2);
            })
            .catch((error) => {
                console.error("Error Fetching Contact Details: ", error);
            });
    }, []);

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditableDescription(event.target.value);
    };

    const handleSave = () => {
        axios
            .post("http://localhost/rsc/_cts2_.php", {
                description2: editableDescription,
            })
            .then((response) => {
                console.log("Saved Successfully!: ", response);
                setMessage("Saved Successfully!");
                setSuccess(true);
            })
            .catch((error) => {
                console.error("Error Saving: ", error);
                setMessage("Something Went Wrong!");
                setSuccess(false);
            });
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
            <main className="h-[100vh] overflow-auto">
                <div className="p-4 flex justify-center items-center flex-col">
                    <h1 className="border-b-4 border-solid border-emerald-900 text-4xl text-violet-300 mb-6">
                        DESCRIPTION 2
                    </h1>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <i className="fa-light fa-pencil-mechanical text-4xl m-2 text-red-300"></i>
                        <TextField
                            type="text"
                            name="description"
                            required
                            value={editableDescription}
                            onChange={handleDescriptionChange}
                            variant="standard"
                            multiline
                            InputProps={{
                                style: {
                                    fontSize: 16,
                                    minWidth: "80vw",
                                    minHeight: "60vh",
                                    color: "black",
                                    backgroundColor: "#f0f0f0",
                                    padding: "10px",
                                    borderRadius: "10px",
                                },
                                inputComponent: "textarea" as "textarea",
                            }}
                        />
                    </Box>
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
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </main>
        </>
    );
}