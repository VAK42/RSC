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

interface Membership {
  name: string;
  ft1: string;
  ft2: string;
  ft3: string;
  ft4: string;
  ft5: string;
  price: number;
}

export default function Admin_Membership() {
  const [message, setMessage] = useState<string>("");
  const [membership, setMembership] = useState<Membership[]>([]);
  const [editMode, setEditMode] = useState<boolean[]>([]);
  const [newMembership, setNewMembership] = useState<Membership>({
    name: "",
    ft1: "",
    ft2: "",
    ft3: "",
    ft4: "",
    ft5: "",
    price: 0,
  });
  const [addingNewMembership, setAddingNewMembership] =
    useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Membership[]>("http://localhost/rsc/membership.php")
      .then((response) => {
        setMembership(response.data);
        setEditMode(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error Fetching Membership: ", error);
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
    field: keyof Membership
  ) => {
    let updatedMembership = [...membership];
    updatedMembership[index] = {
      ...updatedMembership[index],
      [field]:
        field === "price" ? parseFloat(e.target.value.trim()) : e.target.value,
    };
    setMembership(updatedMembership);
  };

  const handleAddNewMembership = () => {
    setAddingNewMembership(true);
  };

  const handleCancelAdd = () => {
    setAddingNewMembership(false);
    setNewMembership({
      name: "",
      ft1: "",
      ft2: "",
      ft3: "",
      ft4: "",
      ft5: "",
      price: 0,
    });
  };

  const handleSaveNewMembership = () => {
    setMembership([...membership, newMembership]);
    setNewMembership({
      name: "",
      ft1: "",
      ft2: "",
      ft3: "",
      ft4: "",
      ft5: "",
      price: 0,
    });
    setAddingNewMembership(false);
  };

  const handleRemoveMembership = (index: number) => {
    let updatedMembership = [...membership];
    updatedMembership.splice(index, 1);
    setMembership(updatedMembership);
  };

  const handleSaveAllChanges = () => {
    axios
      .post("http://localhost/rsc/membership_.php", membership)
      .then((response) => {
        setMessage("All Changes Saved Successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error Saving Membership: ", error);
      });
  };

  return (
    <main className="h-[100vh] overflow-auto">
      <div className="m-4">
        <Typography variant="h4" gutterBottom className="text-violet-300">
          MEMBERSHIP
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "13%" }}>Name</TableCell>
                <TableCell style={{ width: "13%" }}>1</TableCell>
                <TableCell style={{ width: "13%" }}>2</TableCell>
                <TableCell style={{ width: "13%" }}>3</TableCell>
                <TableCell style={{ width: "13%" }}>4</TableCell>
                <TableCell style={{ width: "13%" }}>5</TableCell>
                <TableCell style={{ width: "13%" }}>Price</TableCell>
                <TableCell style={{ width: "9%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membership.map((mbs, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.ft1}
                        onChange={(e) => handleInputChange(e, index, "ft1")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.ft1
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.ft2}
                        onChange={(e) => handleInputChange(e, index, "ft2")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.ft2
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.ft3}
                        onChange={(e) => handleInputChange(e, index, "ft3")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.ft3
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.ft4}
                        onChange={(e) => handleInputChange(e, index, "ft4")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.ft4
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={mbs.ft5}
                        onChange={(e) => handleInputChange(e, index, "ft5")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.ft5
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        type="number"
                        value={mbs.price.toString()}
                        onChange={(e) => handleInputChange(e, index, "price")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      mbs.price
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
                    <Button onClick={() => handleRemoveMembership(index)}>
                      <i className="fa-solid fa-trash-xmark hover:text-red-400"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {addingNewMembership && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        value={newMembership.name}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="Name"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newMembership.ft1}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="1"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newMembership.ft2}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="2"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newMembership.ft3}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="3"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newMembership.ft4}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="4"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newMembership.ft5}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            name: e.target.value,
                          })
                        }
                        label="5"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        type="number"
                        value={newMembership.price.toString()}
                        onChange={(e) =>
                          setNewMembership({
                            ...newMembership,
                            price: parseFloat(e.target.value.trim()),
                          })
                        }
                        label="Price"
                        variant="standard"
                        className="w-full"
                      />
                      <Button
                        variant="contained"
                        onClick={handleSaveNewMembership}
                      >
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
        {!addingNewMembership && (
          <Button variant="contained" onClick={handleAddNewMembership}>
            Add New Membership
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