import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
