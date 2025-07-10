import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Box,Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Fab,
  Switch 
} from "@mui/material";
// import { EditIcon, GetAppIcon } from "@material-ui/icons";
import axios from "axios";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    prodId: null,
    name: "",
    mrp: null,
    wholesale: null,
    retail: null,
    imageUrl: "",
    type: "",
    age: "",
    quantity: null,
    priceperkg: "",
    bagWeight: ""
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ricehouse.in/backend/api/prod/admin", {
          headers: { Authorization: token }
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setErrorMsg("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedProduct({ ...products[index] });
  };

  const handleChange = (e, field) => {
    setEditedProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const productId = editedProduct._id;
      const res = await axios.put(`https://ricehouse.in/backend/api/prod/${productId}`, editedProduct, {
        headers: { Authorization: token }
      });

      const updatedProducts = [...products];
      updatedProducts[editIndex] = res.data.product;
      setProducts(updatedProducts);

      setEditIndex(null);
      setEditedProduct({});
    } catch (error) {
      setErrorMsg("Failed to update product");
    }
  };

  const handleNewProductChange = (e, field) => {
    setNewProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreateProduct = async () => {
    try {
      console.log(newProduct)
      const res = await axios.post("https://ricehouse.in/backend/api/prod", newProduct, {
        headers: { Authorization: token }
      });
      setProducts((prev) => [...prev, res.data]);
      setOpenDialog(false);
      setNewProduct({
        prodId: 0,
        name: "",
        mrp: 0,
        wholesale: 0,
        retail: 0,
        imgUrl: "",
        type: "",
        age: "",
        quantity: 0,
        priceperkg: "",
        bagWeight: ""
      });
    } catch (error) {
      setErrorMsg("Failed to create product");
    }
  };

  const handleToggleDisabled = async (productId, currentValue) => {
  try {
    const res = await axios.put(`https://ricehouse.in/backend/api/prod/${productId}`, {
      disabled: !currentValue
    }, {
      headers: { Authorization: token }
    });

    const updatedProducts = products.map((p) =>
      p._id === productId ? res.data.product : p
    );
    setProducts(updatedProducts);
  } catch (error) {
    setErrorMsg("Failed to update product visibility");
  }
};

  if (loading) return <CircularProgress />;
  if (errorMsg) return <Alert severity="error">{errorMsg}</Alert>;

  return (
    <Box position="relative">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize: '1.6rem'}}>Product Id</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Name</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Price</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>WholeSale Price</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Retail Price</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Stock</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Price Per Kg</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Image URL</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Active</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.prodId}
                      onChange={(e) => handleChange(e, "prodId")}
                      fullWidth
                    />
                  ) : (
                    product.prodId
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.name}
                      onChange={(e) => handleChange(e, "name")}
                      fullWidth
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.mrp}
                      onChange={(e) => handleChange(e, "mrp")}
                      fullWidth
                    />
                  ) : (
                    product.mrp
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.wholesale}
                      onChange={(e) => handleChange(e, "wholesale")}
                      fullWidth
                    />
                  ) : (
                    product.wholesale
                  )}
                </TableCell>
                

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.retail}
                      onChange={(e) => handleChange(e, "retail")}
                      fullWidth
                    />
                  ) : (
                    product.retail
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.quantity}
                      onChange={(e) => handleChange(e, "quantity")}
                      fullWidth
                    />
                  ) : (
                    product.quantity
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.priceperkg}
                      onChange={(e) => handleChange(e, "priceperkg")}
                      fullWidth
                    />
                  ) : (
                    product.priceperkg
                  )}
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <TextField
                      value={editedProduct.imgUrl}
                      onChange={(e) => handleChange(e, "imgUrl")}
                      fullWidth
                    />
                  ) : (
                    <a href={product.imgUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </TableCell>

                <TableCell sx={{ fontSize: "1rem" }}>
                  <Switch
                    checked={!product.disabled}
                    onChange={() => handleToggleDisabled(product._id, product.disabled)}
                    color="primary"
                  />
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {editIndex === index ? (
                    <IconButton onClick={handleSave} color="primary">
                      Save
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEditClick(index)} color="primary">
                      Edit
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ position: "absolute", bottom: -90, right: 16 }}
      >
        Create Product
      </Fab>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          {["prodId", "name", "mrp", "wholesale", "retail", "imgUrl", "type", "age", "quantity", "priceperkg", "bagWeight"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              value={newProduct[field]}
              onChange={(e) => handleNewProductChange(e, field)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateProduct} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsSection;