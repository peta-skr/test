import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate, Link as RoutesLink } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logout");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Home</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="inherit" disabled>
            register
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
          <RoutesLink to={"create"}>
            <Button color="inherit">Create THread</Button>
          </RoutesLink>
          <RoutesLink to={"search"}>
            <Button color="inherit">search THread</Button>
          </RoutesLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
