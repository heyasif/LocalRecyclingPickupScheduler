// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "../services/api";

// Hard-coded material options
const MATERIAL_OPTIONS = [
  "Plastic",
  "Paper",
  "Glass",
  "Metal",
  "Electronics",
  "Other",
];

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [pickups, setPickups] = useState([]);
  const [form, setForm] = useState({
    materialType: "",
    pickupDate: "",
    pickupTime: "",
    address: "",
  });

  // Fetch existing pickups
  const loadPickups = async () => {
    try {
      const res = await axios.get("/my-pickups");
      setPickups(res.data);
    } catch {
      enqueueSnackbar("Failed to load pickups", { variant: "error" });
    }
  };

  useEffect(() => {
    loadPickups();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Use browser geolocation + reverse-geocode via OSM Nominatim
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      enqueueSnackbar("Geolocation not supported", { variant: "warning" });
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await resp.json();
        const addr = data.display_name || `${latitude}, ${longitude}`;
        setForm((f) => ({ ...f, address: addr }));
      } catch {
        enqueueSnackbar("Failed to fetch address", { variant: "error" });
        setForm((f) => ({ ...f, address: `${latitude}, ${longitude}` }));
      }
    });
  };

  // Submit new pickup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/schedule-pickup", form);
      enqueueSnackbar("Pickup scheduled", { variant: "success" });
      setForm({
        materialType: "",
        pickupDate: "",
        pickupTime: "",
        address: "",
      });
      loadPickups();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Schedule failed", {
        variant: "error",
      });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Schedule New Pickup
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* Material Type Select */}
          <FormControl fullWidth required sx={{ minWidth: 180 }}>
            <InputLabel id="material-select-label">Material Type</InputLabel>
            <Select
              labelId="material-select-label"
              name="materialType"
              value={form.materialType}
              label="Material Type"
              onChange={handleChange}
            >
              {MATERIAL_OPTIONS.map((mat) => (
                <MenuItem key={mat} value={mat}>
                  {mat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Picker */}
          <TextField
            name="pickupDate"
            label="Date"
            type="date"
            value={form.pickupDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* Time Picker */}
          <TextField
            name="pickupTime"
            label="Time"
            type="time"
            value={form.pickupTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Stack>

        {/* Address Field */}
        <TextField
          name="address"
          label="Address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          required
        />

        {/* Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Schedule
          </Button>
          <Button variant="outlined" onClick={handleUseLocation}>
            Use Current Location
          </Button>
        </Stack>
      </Box>

      {/* Pickup History */}
      <Typography variant="h5" gutterBottom>
        My Pickups
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {pickups.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id} sx={{ display: "flex" }}>
            <Card
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              elevation={3}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography>
                  <strong>Material:</strong> {p.materialType}
                </Typography>
                <Typography>
                  <strong>Date:</strong>{" "}
                  {new Date(p.pickupDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Time:</strong> {p.pickupTime}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {p.address}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {p.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
