import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Typography,
  Toolbar,
  Container,
  Paper,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductsSection from "./ProductSection";
import OrdersSection from "./OrdersSection";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/"); // Redirect to login
    } else {
      // Optionally: validate token with backend here
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Orders" />
          <Tab label="Products" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <OrdersSection />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <ProductsSection />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
