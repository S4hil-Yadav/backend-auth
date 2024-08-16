import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/SideBar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<div>Root</div>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<SideBar />}></Route>
          <Route></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <div className="h-[200rem]"></div>
    </BrowserRouter>
  );
}

export default App;
