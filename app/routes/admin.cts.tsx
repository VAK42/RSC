import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin_Cts() {
  const [cts, setCts] = useState<any[]>([]);
  const [editableDescription, setEditableDescription] = useState("");
  const [editableMap, setEditableMap] = useState("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

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
        setEditableDescription(response.data[0].description);
        setEditableMap(response.data[0].map);
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

  const handleMapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableMap(event.target.value);
  };

  const handleSave = () => {
    axios
      .post("http://localhost/rsc/cts2_.php", {
        description: editableDescription,
        map: editableMap,
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

  const handleSaveText = (icon: string, newText: string) => {
    axios
      .post("http://localhost/rsc/cts_.php", { icon: icon, text: newText })
      .then((response) => {
        console.log("Text Saved Successfully!: ", response);
      })
      .catch((error) => {
        console.error("Error Saving Text: ", error);
      });
  };

  const handleTableCellEdit = (index: number, newText: string) => {
    const updatedCts = [...cts];
    updatedCts[index].text = newText;
    setCts(updatedCts);
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
            DESCRIPTION
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
          <h1 className="border-y-4 border-solid border-emerald-900 text-4xl text-violet-300 mt-16 mb-6">
            SOCIAL MEDIA
          </h1>
          <TableContainer
            component={Paper}
            style={{ maxWidth: "40vw", backgroundColor: "#f0f0f0" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Icon</TableCell>
                  <TableCell>Text</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cts.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <i className={`${row.icon} m-2`}></i>
                    </TableCell>
                    <TableCell>
                      <TextareaAutosize
                        value={row.text}
                        onChange={(event) =>
                          handleTableCellEdit(index, event.target.value)
                        }
                        onBlur={() => handleSaveText(row.icon, row.text)}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "1px solid #ccc",
                          resize: "none",
                          outline: "none",
                          backgroundColor: "#f9f9f9",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginTop: "2rem" }}
          >
            <i className="fa-light fa-map-location-dot text-4xl m-2 text-green-300"></i>
            <TextField
              type="text"
              name="map"
              required
              value={editableMap}
              onChange={handleMapChange}
              variant="standard"
              multiline
              InputProps={{
                style: {
                  minWidth: "80vw",
                  color: "black",
                  backgroundColor: "#f0f0f0",
                  padding: "4px",
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