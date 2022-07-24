import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import firebase from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { TextField, Button, Typography, Box } from "@mui/material";

const Thread = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ thread: [], response: [] });
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState("");
  const auth = getAuth();

  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    const result = await axios.get("http://localhost:5000/thread", {
      params: {
        threadId: searchParams.get("threadId"),
      },
    });
    console.log(result.data);
    setData(result.data);
    const users = await axios.get("http://localhost:5000/users");
    console.log(users.data);
    setUsers(users.data);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        setMe(user.uid);
      }
    });
  };

  const sendResponse = async (e) => {
    e.preventDefault();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
      }
      const resData = {
        thread_id: searchParams.get("threadId"),
        text: e.target.text.value,
      };
      const result = await axios.post(
        "http://localhost:5000/response/create",
        resData,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      console.log(result);
    });
  };

  return (
    <div>
      <Typography variant="contained">
        {data.thread[0] ? data.thread[0].title : "awit"}
      </Typography>
      <Typography fontSize="xl">threadの説明</Typography>
      <p>{data.thread[0] && data.thread[0].description}</p>
      <Typography fontSize="xl">レスポンスを送信する</Typography>
      <form onSubmit={(e) => sendResponse(e)}>
        <TextField type="text" w="50%" name="text" required />
        <Button variant="contained" type="submit">
          send
        </Button>
      </form>
      <Typography fontSize="xl">レスポンス一覧</Typography>
      {data.response.map((item) => {
        let user = users.find((user) => user.id === item.userId);
        if (!user) {
          user = {
            id: 0,
            uid: "test",
            name: "dummy",
          };
        }
        if (user.uid === me) {
          return (
            <Box bgcolor="azure" borderRadius="lg" p="3" m="3">
              <h1>{user.name}</h1>
              <p>{item.text}</p>
            </Box>
          );
        }

        return (
          <Box border="1px" borderRadius="lg" p="3" m="3">
            <span>{user.name}</span>
            <p>{item.text}</p>
          </Box>
        );
      })}
    </div>
  );
};

export default Thread;
