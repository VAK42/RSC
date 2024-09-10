import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";

interface Event {
  img: File | string;
  img2: File | string;
  name: string;
  path: string;
  description: string;
}

export default function Admin_Events() {
  const [message, setMessage] = useState<string>("");
  const [event, setEvent] = useState<Event[]>([]);
  const [editMode, setEditMode] = useState<boolean[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    img: "",
    img2: "",
    name: "",
    path: "",
    description: "",
  });
  const [addingNewEvent, setAddingNewEvent] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Event[]>("http://localhost/rsc/events.php")
      .then((response) => {
        setEvent(response.data);
        setEditMode(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error Fetching Events: ", error);
      });
  };

  const handleEdit = (index: number) => {
    let newEditMode = [...editMode];
    newEditMode[index] = true;
    setEditMode(newEditMode);
  };

  const handleSave = (index: number) => {
    let newEditMode = [...editMode];
    newEditMode[index] = false;
    setEditMode(newEditMode);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof Event
  ) => {
    let updatedEvent = [...event];
    updatedEvent[index] = {
      ...updatedEvent[index],
      [field]: e.target.value,
    };
    setEvent(updatedEvent);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      let updatedEvent = [...event];
      updatedEvent[index] = {
        ...updatedEvent[index],
        img: file,
      };
      setEvent(updatedEvent);
    }
  };

  const handleAddNewEvent = () => {
    setAddingNewEvent(true);
  };

  const handleCancelAdd = () => {
    setAddingNewEvent(false);
    setNewEvent({
      img: "",
      img2: "",
      name: "",
      path: "",
      description: "",
    });
  };

  const handleSaveNewEvent = () => {
    setEvent([...event, newEvent]);
    setNewEvent({
      img: "",
      img2: "",
      name: "",
      path: "",
      description: "",
    });
    setAddingNewEvent(false);
  };

  const handleRemoveEvent = (index: number) => {
    let updatedEvent = [...event];
    updatedEvent.splice(index, 1);
    setEvent(updatedEvent);
  };

  const handleSaveAllChanges = () => {
    axios
      .post("http://localhost/rsc/events_.php", event)
      .then((response) => {
        setMessage("All Changes Saved Successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error Saving Events: ", error);
      });
  };

  return (
    <main className="h-[100vh] overflow-auto">
      <div className="m-4">
        <Typography variant="h4" gutterBottom className="text-violet-300">
          EVENTS
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>Image</TableCell>
                <TableCell style={{ width: "15%" }}>Image2</TableCell>
                <TableCell style={{ width: "20%" }}>Name</TableCell>
                <TableCell style={{ width: "10%" }}>Path</TableCell>
                <TableCell style={{ width: "35%" }}>Description</TableCell>
                <TableCell style={{ width: "10%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.map((vnt, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={
                        typeof vnt.img === "string"
                          ? vnt.img
                          : URL.createObjectURL(vnt.img)
                      }
                      alt={vnt.name}
                    />
                    {!editMode[index] && typeof vnt.img !== "string" && (
                      <span>{vnt.img.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <img
                      src={
                        typeof vnt.img2 === "string"
                          ? vnt.img2
                          : URL.createObjectURL(vnt.img2)
                      }
                      alt={vnt.name}
                    />
                    {!editMode[index] && typeof vnt.img2 !== "string" && (
                      <span>{vnt.img2.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={vnt.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      vnt.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={vnt.path}
                        onChange={(e) => handleInputChange(e, index, "path")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      vnt.path
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        multiline
                        value={vnt.description}
                        onChange={(e) =>
                          handleInputChange(e, index, "description")
                        }
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      vnt.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <Button
                        variant="contained"
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button onClick={() => handleRemoveEvent(index)}>
                      <i className="fa-solid fa-trash-xmark hover:text-red-400"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {addingNewEvent && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <input
                        type="file"
                        id="upload-btn"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, event.length)}
                        accept="image/*"
                      />
                      <label htmlFor="upload-btn">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={
                            <i className="fa-light fa-cloud-arrow-up"></i>
                          }
                        ></Button>
                      </label>
                      <input
                        type="file"
                        id="upload-btn2"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, event.length)}
                        accept="image/*"
                      />
                      <label htmlFor="upload-btn2">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={
                            <i className="fa-light fa-cloud-arrow-up"></i>
                          }
                        ></Button>
                      </label>
                      <TextField
                        value={newEvent.name}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, name: e.target.value })
                        }
                        label="Name"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newEvent.path}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, path: e.target.value })
                        }
                        label="Path"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        multiline
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                        label="Description"
                        variant="standard"
                        className="w-full"
                      />
                      <Button variant="contained" onClick={handleSaveNewEvent}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={handleCancelAdd}>
                        Cancel
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {message && (
          <Typography variant="body1" className="text-green-300">
            <i className="fa-light fa-check m-2"></i>
            {message}
          </Typography>
        )}
        {!addingNewEvent && (
          <Button variant="contained" onClick={handleAddNewEvent}>
            Add New Event
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSaveAllChanges}
          className="float-right"
        >
          Save All Changes
        </Button>
      </div>
    </main>
  );
}