import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{ py: 2, backgroundColor: "grey.100", textAlign: "center", mt: "auto" }}
  >
    <Container maxWidth="lg">
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Recycling Scheduler.{" "}
        <Link href="https://yourcompany.com" color="inherit" underline="hover">
          Your Company
        </Link>
      </Typography>
    </Container>
  </Box>
);

export default Footer;
