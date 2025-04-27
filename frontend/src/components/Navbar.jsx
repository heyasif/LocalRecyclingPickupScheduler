import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const vendorToken = localStorage.getItem("vendorToken");

  const handleLogoutUser = () => {
    localStorage.removeItem("userToken");
    navigate("/auth", { replace: true });
  };
  const handleLogoutVendor = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor-login", { replace: true });
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Recycling Scheduler
        </Typography>
        {!mobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/home">
              Home
            </Button>
            {!userToken && !vendorToken && (
              <Button component={Link} to="/auth">
                User Sign In/Up
              </Button>
            )}
            {userToken && (
              <>
                <Button component={Link} to="/dashboard">
                  Dashboard
                </Button>
                <Button onClick={handleLogoutUser}>Logout</Button>
              </>
            )}
            {!userToken && !vendorToken && (
              <Button component={Link} to="/vendor-login">
                Vendor Sign In
              </Button>
            )}
            {vendorToken && (
              <>
                <Button component={Link} to="/vendor-dashboard">
                  Vendor Dashboard
                </Button>
                <Button onClick={handleLogoutVendor}>Logout</Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
