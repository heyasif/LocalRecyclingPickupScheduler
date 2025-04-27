// src/pages/VendorDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Box,
  Stack,
  Pagination,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "../services/api";

const ITEMS_PER_PAGE = 6;

const VendorDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [pickups, setPickups] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("/vendor/pickups")
      .then((res) => setPickups(res.data))
      .catch(() =>
        enqueueSnackbar("Failed to load vendor pickups", { variant: "error" })
      );
  }, [enqueueSnackbar]);

  // Filter logic
  const filtered = useMemo(() => {
    if (filter === "Scheduled")
      return pickups.filter((p) => p.status === "Scheduled");
    if (filter === "Completed")
      return pickups.filter((p) => p.status === "Completed");
    return pickups;
  }, [filter, pickups]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filtered]);

  const handleTab = (_, v) => {
    setFilter(v);
    setPage(1);
  };
  const handlePage = (_, v) => setPage(v);

  const markComplete = (id) => {
    axios
      .patch(`/vendor/complete/${id}`)
      .then(() => {
        enqueueSnackbar("Pickup marked completed", { variant: "success" });
        return axios.get("/vendor/pickups");
      })
      .then((res) => setPickups(res.data))
      .catch(() =>
        enqueueSnackbar("Failed to mark complete", { variant: "error" })
      );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vendor Pickups
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={filter}
          onChange={handleTab}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All" value="All" />
          <Tab label="Scheduled" value="Scheduled" />
          <Tab label="Completed" value="Completed" />
        </Tabs>
      </Box>

      <Grid container spacing={3} alignItems="stretch">
        {paged.map((p) => (
          <Grid item xs={12} sm={4} md={4} key={p._id} sx={{ display: "flex" }}>
            <Card
              elevation={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%", // ← ensures card fills entire row height
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Typography>
                    <strong>User Address:</strong> {p.address}
                  </Typography>
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
                    <strong>Status:</strong> {p.status}
                  </Typography>
                </Stack>
              </CardContent>
              {p.status === "Scheduled" && (
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => markComplete(p._id)}
                  >
                    Mark Completed
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePage}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default VendorDashboard;
