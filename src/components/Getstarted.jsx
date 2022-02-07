import React, { useEffect, useState } from "react";
import "./css/getstarted.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Login from "./Login";
import firebase from "./firebase";

const Getstarted = () => {
  return (
    <>
      

      <div className="getStated">
        
        <Link  to="/Login">
          <text className="text">Get Started</text>
        </Link>
        
      </div>

     
    </>
  );
};
export default Getstarted;
