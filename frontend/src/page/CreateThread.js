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
import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";

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
      <Heading size="lg">Create Thread</Heading>
      <Box w="50%">
        <form onSubmit={(e) => createThread(e)}>
          <Input type="text" name="title" placeholder="title" />
          <Input type="text" name="description" placeholder="description" />
          <Button colorScheme="teal" type="submit">
            create
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateThread;
