import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Getstarted from "./Getstarted";
import Login from "./Login";
import Register from "./Register";
import "./css/menu.css";
import Home from "./Home";
import AddHotel from "./AddHotel";

import CreateRoom from "./CreateRoom";
import ListOfUsers from "./ListOfAdmin";
import ManageAdmin from "./ManageAdmin";

const Menu = () => {
  return (
    
    <Router>
      {/* <nav>
        <Link to="/">Getstarted</Link>

        <Link to="/Login">Login</Link>

        <Link to="/Register">Register</Link>
      </nav> */}

      
      <Routes>
        <Route path ="/" element={<Getstarted/>}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ManageAdmin" element={<ManageAdmin/>} />
        <Route path="/CreateRoom" element={<CreateRoom/>} />
        <Route path ="/AddHotel" element={<AddHotel/>}/>
        <Route path = '/ListOfUsers' element={<ListOfUsers/>}/>
        <Route path = '/Getstarted' element ={<Getstarted/>}/>
        
        
      
      </Routes>
    </Router>
  );
};
export default Menu;
