import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Sample from "./pages/Sample";
import Navbar from "./pages/Navbar";
import TestUseParam from "./pages/TestUseParam";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/useparam/:storeId" element={<TestUseParam />} />
      </Routes>
    </>
  );
}

export default App;
