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

const Home = () => {
  const [threads, setThreads] = useState([]);
  const [au, setAu] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        setAu(true);
      }
    });
  }, []);

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const results = await axios.get("http://localhost:5000/thread/getAll");
    console.log(results);
    setThreads(results.data);
  };

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
  };

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
    <div>
      <Button colorScheme="teal" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button colorScheme="teal" disabled>
        register
      </Button>
      <Button colorScheme="teal" onClick={() => logout()}>
        Logout
      </Button>
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

      <Heading>Thread list</Heading>
      {threads.map((thread) => (
        <Box maxW="sm" p="5" m="3" borderWidth="1px" borderRadius="lg">
          <Link to={"thread?threadId=" + thread.id}>
            <Text fontSize="lg" key={thread.id}>
              {thread.title}
            </Text>
          </Link>
        </Box>
      ))}
    </div>
  );
};

export default Home;
