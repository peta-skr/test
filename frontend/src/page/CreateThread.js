import firebase from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const CreateThread = () => {
  const [au, setAu] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const createThread = async (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        setAu(true);
      }
      const data = {
        title: e.target.title.value,
        description: e.target.description.value,
      };
      const results = await axios.post(
        "http://localhost:5000/thread/create",
        data,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      console.log(results);
    });
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h5" size="lg">
        Create Thread
      </Typography>
      <Box w="50%">
        <form onSubmit={(e) => createThread(e)}>
          <TextField type="text" name="title" placeholder="title" />
          <TextField type="text" name="description" placeholder="description" />
          <Button variant="contained" type="submit">
            create
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateThread;
