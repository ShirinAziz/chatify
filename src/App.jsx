import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chat from "./Components/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
