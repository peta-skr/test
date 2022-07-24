import firebase from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link as RoutesLink } from "react-router-dom";
import axios from "axios";
import { Button, Box, Typography, Link } from "@mui/material";
import Card from "@mui/material/Card";

const Home = () => {
  const [threads, setThreads] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
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
      <Typography variant="h4">Thread list</Typography>
      {threads.map((thread) => (
        <Card sx={{ maxWidth: 500, m: 2, p: 2 }}>
          <Link underline="none" href={"thread?threadId=" + thread.id}>
            <Typography variant="subtitle1" key={thread.id}>
              {thread.title}
            </Typography>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Home;
