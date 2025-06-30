import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Select, MenuItem, Paper, CircularProgress, Pagination, Alert,
  Box, Typography, Chip
} from "@mui/material";
import axios from "axios";

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchOrders = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://ricehouse.in/backend/api/order/all?page=${pageNum}&limit=10`, {
        headers: { Authorization: token }
      });
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (error) {
      setErrorMsg("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line
  }, []);

  const handleDeliveryStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://ricehouse.in/backend/api/order/${orderId}`, {
        deliveryStatus: newStatus,
      }, {
        headers: { Authorization: token }
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: newStatus } : order
        )
      );
    } catch (err) {
      setErrorMsg("Failed to update delivery status.");
    }
  };

  const handlePageChange = (_, value) => {
    fetchOrders(value);
  };

  if (loading) return <CircularProgress />;
  if (errorMsg) return <Alert severity="error">{errorMsg}</Alert>;
  console.log(orders[1])
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Orders</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ fontSize: "1rem" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize: '1.6rem'}}>Order ID</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Customer</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Phone</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Address</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Products</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Amount</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Payment</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Payment Id</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Delivery</TableCell>
              <TableCell sx={{fontSize: '1.6rem'}}>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{fontSize: '1.4rem'}}>{order._id.slice(-6)}</TableCell>
                <TableCell sx={{fontSize: '1.4rem'}}>{order.userId?.name || "N/A"}</TableCell>
                <TableCell sx={{fontSize: '1.4rem'}}>{order.phone}</TableCell>
                <TableCell sx={{fontSize: '1.4rem', whiteSpace: "pre-wrap", maxWidth: 200}}>{order.address}</TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>
                  {
                      order.products && order.products.length > 0 ? (
                      order.products.map((p, i) => (
                        <div key={i}>
                          {p?.name ? `${p.name} × ${p.quantity}` : "Unknown product"}
                        </div>
                      ))
                    ) : (
                      "No products"
                    )
                  }
                </TableCell>

                <TableCell sx={{fontSize: '1.4rem'}}>₹{order.amount}</TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={order.status === "COMPLETED" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.phonepeTransactionId}</TableCell>

                <TableCell>
                  <Select
                    value={order.deliveryStatus}
                    onChange={(e) =>
                      handleDeliveryStatusChange(order._id, e.target.value)
                    }
                    size="small"
                  >
                    <MenuItem value="PROCESSING">Processing</MenuItem>
                    <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                    <MenuItem value="OUT FOR DELIVERRY">Out for delivery</MenuItem>
                    <MenuItem value="DELIVERED">Delevered</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default OrdersSection;