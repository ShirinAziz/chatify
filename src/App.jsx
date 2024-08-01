import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chat from "./Components/Chat";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
