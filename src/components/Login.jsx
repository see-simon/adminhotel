import React, { useEffect, useState } from "react";
import "./css/login.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from "./Home";
import firebase from "./firebase";
// import Register from "./Register";

const Login = () => {
  return (
    <div className="container">
      <text>.</text>
      <text></text>

      <form className="Box">
        <div className="">
          <div className="headings">
            <label className="spaceBetween">
              <b>Username</b>
            </label>

            <label className="password">
              <b>Password</b>
            </label>
          </div>

          <div className="headings">
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
          </div>
          <div className="createAcc">
          <Link to="/Register">
            <text>Create account</text>
            </Link>
            <Link to="/Home">
              <button className="Button" type="submit">
                Login
              </button>
            </Link>
          </div>
        </div>
      </form>

      <div className="class">
        
        <div>
          <text>Forget password</text>
        </div>
      </div>
    </div>
  );
};
export default Login;
