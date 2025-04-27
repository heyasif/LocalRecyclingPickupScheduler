import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "../services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", data);
      localStorage.setItem("userToken", res.data.token);
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Login failed", {
        variant: "error",
      });
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
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
        <Button type="submit" variant="contained" fullWidth>
          Log In
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
