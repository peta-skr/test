import "./config/firebase-config";
import Login from "./page/Login";
import Home from "./page/Home";
import Thread from "./page/Thread";
import CreateThread from "./page/CreateThread";
import SearchThread from "./page/SearchThread";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SearchResult from "./page/SearchResult";
import Header from "./components/header/Header";
import { CssBaseline } from "@mui/material";

function App() {
  const [results, setResults] = useState([]);
  return (
    <div>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thread" element={<Thread />} />
        <Route path="/create" element={<CreateThread />} />
        <Route
          path="/search"
          element={<SearchThread setResults={setResults} />}
        />
        <Route path="/result" element={<SearchResult results={results} />} />
      </Routes>
    </div>
  );
}

export default App;
