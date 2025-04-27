import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import "./App.css";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            m: 0,
            p: 0,
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vendor-login" element={<VendorLogin />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
