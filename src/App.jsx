import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
