import React, { useEffect, useState } from "react";
import "./css/register.css";

import firebase from "./firebase";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();

  //

  const db = firebase.firestore();

  const [users, setUsers] = useState([]);

  const getName = (e) => {
    setName(e.target.value);
  };
  const getSurname = (e) => {
    setSurname(e.target.value);
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getNumber = (e) => {
    setNumber(e.target.value);
  };
  //

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.file[0]) {
      setImage(e.target.file[0]);
    }
  };

  const createUser = (e) => {
    e.preventDefault();
    db.collection("registration")
      .add({
        Name: name,
        Surname: surname,
        //
        // Image: image
        //
        Email: email,
        Password: password,
        Number: number,
      })
      .then((res) => {
        console.log("users created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let userInfo = [];
    db.collection("registration")
      .get()
      .then((res) => {
        res.forEach((action) => {
          userInfo.push({ ...action.data(), id: action.id });
        });

        setUsers(userInfo);
      });
  }, []);

  return (
    <>
      <div class="container">
        
        <div class="content">
        <div class="title">Registration</div>
          <form onSubmit={createUser}>
            <div class="user-details">
              {/* <input type="file" onChange={handleChange}></input> */}
              <div class="input-box">
                <span class="details">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={getName}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Username</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={getSurname}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={getEmail}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  onChange={getNumber}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Password</span>
                <input
                  type="text"
                  placeholder="Enter your password"
                  onChange={getPassword}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Confirm Password</span>
                <input
                  type="text"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            
            <div class="button">
            <input type="submit" value="Register" />
            <Link to="/Login">
              
              </Link>
            </div>
            
          
          </form>

        
        </div>
      </div>
    </>
  );
};
export default Register;
