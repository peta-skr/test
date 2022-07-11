import "./config/firebase-config";
import Login from "./page/Login";
import Home from "./page/Home";
import Thread from "./page/Thread";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thread" element={<Thread />} />
      </Routes>
    </div>
  );
}

export default App;
