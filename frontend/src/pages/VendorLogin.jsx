import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "../services/api";

const VendorLogin = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/vendor-login", data);
      localStorage.setItem("vendorToken", res.data.token);
      enqueueSnackbar("Vendor login successful", { variant: "success" });
      navigate("/vendor-dashboard");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Vendor login failed", {
        variant: "error",
      });
    }
  };
  return (
    <Card sx={{ maxWidth: 400, m: "auto", mt: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center" mb={2}>
          Vendor Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VendorLogin;
