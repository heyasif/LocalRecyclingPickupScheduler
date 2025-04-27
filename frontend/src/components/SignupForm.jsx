import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "../services/api";

const SignupForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/signup", data);
      enqueueSnackbar("Signup successful! Please log in.", {
        variant: "success",
      });
      navigate("/auth", { replace: true });
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Signup failed", {
        variant: "error",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
          fullWidth
          required
        />
        <TextField
          label="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;
