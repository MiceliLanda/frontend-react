import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import Dashboard from "./components/views/Dashboard";
import EditProduct from "./components/views/EditProduct";
import CreateProduct from "./components/CreateProduct";
import ChangePassword from "./components/views/ChangePassword";
import Delete from "./components/views/Delete";
import Valid from "./components/views/Valid";
function App() {
  return (
    
    <Router>
       <Navbar />
      <div className="App ">      
          <Routes>
            <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-product" element={<EditProduct />} />
              <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/delete-product" element={<Delete />}/>
            <Route path="/Validate" element={<Valid />}/>
          </Routes>
      </div>
    </Router>
  );
}
function Navbar() {
  // visible on every page
  const location = useLocation(); 
  if (location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/forgot-password") {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mb-3">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }else{
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mb-3">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Change Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
}

export default App;
