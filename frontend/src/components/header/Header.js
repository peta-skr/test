import React, { useState, useEffect } from "react";
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
  const [login, setLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      }
    });
  }, []);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          {login ? (
            <>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
              <Button color="inherit" onClick={() => navigate("/create")}>
                Create THread
              </Button>
              <Button color="inherit" onClick={() => navigate("/search")}>
                search THread
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" disabled>
                register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
