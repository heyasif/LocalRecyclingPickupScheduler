// src/pages/Homepage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.jpg";

const features = [
  {
    title: "Easy Scheduling",
    description: "Book pickups in seconds with our intuitive form.",
  },
  {
    title: "Reliable Vendors",
    description: "Trusted local recyclers handle your waste.",
  },
  {
    title: "Real-time Tracking",
    description: "Monitor your pickup status instantly.",
  },
];

const Homepage = () => (
  <>
    <Box
      sx={{
        position: "relative",
        height: { xs: "40vh", md: "60vh" },
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // blend a dark overlay
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.4)",
          top: 0,
          left: 0,
        },
      }}
    >
      <Container
        sx={{
          position: "relative",
          textAlign: "center",
          color: "common.white",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textShadow: "0px 2px 8px rgba(0,0,0,0.7)" }}
        >
          Recycle Made Easy
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{ textShadow: "0px 1px 6px rgba(0,0,0,0.6)" }}
        >
          Schedule your recycling pickup with just a few clicks.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/auth"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Container>
    </Box>

    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

export default Homepage;
