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

interface Product {
  img: File | string;
  name: string;
  path: string;
  price: number;
  description: string;
}

export default function Admin_Store() {
  const [message, setMessage] = useState<string>("");
  const [store, setStore] = useState<Product[]>([]);
  const [editMode, setEditMode] = useState<boolean[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    img: "",
    name: "",
    path: "",
    price: 0,
    description: "",
  });
  const [addingNewProduct, setAddingNewProduct] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<Product[]>("http://localhost/rsc/store.php")
      .then((response) => {
        setStore(response.data);
        setEditMode(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error Fetching Store Products: ", error);
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
    field: keyof Product
  ) => {
    let updatedStore = [...store];
    updatedStore[index] = {
      ...updatedStore[index],
      [field]:
        field === "price" ? parseFloat(e.target.value.trim()) : e.target.value,
    };
    setStore(updatedStore);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      let updatedStore = [...store];
      updatedStore[index] = {
        ...updatedStore[index],
        img: file,
      };
      setStore(updatedStore);
    }
  };

  const handleAddNewProduct = () => {
    setAddingNewProduct(true);
  };

  const handleCancelAdd = () => {
    setAddingNewProduct(false);
    setNewProduct({
      img: "",
      name: "",
      path: "",
      price: 0,
      description: "",
    });
  };

  const handleSaveNewProduct = () => {
    setStore([...store, newProduct]);
    setNewProduct({
      img: "",
      name: "",
      path: "",
      price: 0,
      description: "",
    });
    setAddingNewProduct(false);
  };

  const handleRemoveProduct = (index: number) => {
    let updatedStore = [...store];
    updatedStore.splice(index, 1);
    setStore(updatedStore);
  };

  const handleSaveAllChanges = () => {
    axios
      .post("http://localhost/rsc/store_.php", store)
      .then((response) => {
        setMessage("All Changes Saved Successfully!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error Saving Products: ", error);
      });
  };

  return (
    <main className="h-[100vh] overflow-auto">
      <div className="m-4">
        <Typography variant="h4" gutterBottom className="text-violet-300">
          STORE
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>Image</TableCell>
                <TableCell style={{ width: "10%" }}>Name</TableCell>
                <TableCell style={{ width: "15%" }}>Path</TableCell>
                <TableCell style={{ width: "10%" }}>Price</TableCell>
                <TableCell style={{ width: "55%" }}>Description</TableCell>
                <TableCell style={{ width: "10%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={
                        typeof product.img === "string"
                          ? product.img
                          : URL.createObjectURL(product.img)
                      }
                      alt={product.name}
                    />
                    {!editMode[index] && typeof product.img !== "string" && (
                      <span>{product.img.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={product.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        value={product.path}
                        onChange={(e) => handleInputChange(e, index, "path")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      product.path
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        type="number"
                        value={product.price.toString()}
                        onChange={(e) => handleInputChange(e, index, "price")}
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      product.price
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[index] ? (
                      <TextField
                        multiline
                        value={product.description}
                        onChange={(e) =>
                          handleInputChange(e, index, "description")
                        }
                        variant="standard"
                        className="w-full"
                      />
                    ) : (
                      product.description
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
                    <Button onClick={() => handleRemoveProduct(index)}>
                      <i className="fa-solid fa-trash-xmark hover:text-red-400"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {addingNewProduct && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <input
                        type="file"
                        id="upload-btn"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, store.length)}
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
                      <TextField
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        label="Name"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        value={newProduct.path}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, path: e.target.value })
                        }
                        label="Path"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        type="number"
                        value={newProduct.price.toString()}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value.trim()),
                          })
                        }
                        label="Price"
                        variant="standard"
                        className="w-full"
                      />
                      <TextField
                        multiline
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        label="Description"
                        variant="standard"
                        className="w-full"
                      />
                      <Button
                        variant="contained"
                        onClick={handleSaveNewProduct}
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
        {!addingNewProduct && (
          <Button variant="contained" onClick={handleAddNewProduct}>
            Add New Product
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