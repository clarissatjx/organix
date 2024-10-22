import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/GetStarted/Login";
import SignUp from "./components/GetStarted/SignUp";
import { UserProvider } from "./context/user";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
