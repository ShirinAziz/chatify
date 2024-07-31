import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Menu from "./Components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
