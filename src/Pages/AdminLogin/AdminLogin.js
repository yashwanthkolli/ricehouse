import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("https://ricehouse.in/backend/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate('/admin'); // Callback to redirect or fetch admin data
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;