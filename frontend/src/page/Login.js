import firebase from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const [token, setToken] = useState("");

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // setToken(user.accessToken);
        const res = await axios.get("http://localhost:5000/api/verify", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        });
        console.log(res.data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const sendToken = async () => {
    const res = await axios.get("http://localhost:5000/api/verify", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res.data);
  };

  console.log("aa");

  return (
    <Box sx={{ m: 10 }}>
      <Button variant="contained" onClick={loginWithGoogle}>
        Login
      </Button>
      {/* <Button onClick={sendToken}>sendToken</Button> */}
    </Box>
  );
};

export default Login;
