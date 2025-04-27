import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { Container, Box, Paper, Tabs, Tab, Typography } from "@mui/material";

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <Container
      maxWidth="xs"
      sx={{ mt: { xs: 3, sm: 5 }, mb: { xs: 3, sm: 5 } }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h5">Welcome</Typography>
        </Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box sx={{ mt: 2, p: 1 }}>
          {tab === 0 ? <LoginForm /> : <SignupForm />}
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
