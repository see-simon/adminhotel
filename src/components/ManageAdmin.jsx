import React, { useEffect, useState } from "react";
import "./css/ManageAdmin.css";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from '@mui/material/Alert';

const ManageAdmin = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createUser = (e) => {
    e.preventDefault();
    db.collection("addAdmin")
      .add({
        Name: name,
        Surname: surname,
        Email: email,
        Password: password,
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
    db.collection("addAdmin")
      .get()
      .then((res) => {
        res.forEach((action) => {
          userInfo.push({ ...action.data(), id: action.id });
        });

        setUsers(userInfo);
      });
  }, []);

  //delete admin

  const deleteuser = (e) => {
    let uid = e.target.id;
    db.collection("addAdmin")
      .doc(uid)
      .delete()
      .then(() => {
        console.log("user deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update admin

  const updateAdmin = (e) => {
    e.preventDefault();
    let uid = e.target.id;
    db.collection("addAdmin")
      .doc(uid).update({
        Name: name,
        Surname: surname,
        Email: email,
        Password: password,
      })
      .then((res) => {
        console.log("users updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getData =(e)=>{
  //   e.preventDefault();
  //   history.push("./CreateRoom");
  //   // db.collection('users').doc(uid).get()
  //   // .then(console.log("got the data"))
  //   // .catch((err)=>{console.log(err)})
  // }

  //update modal

  return (
    <>
      <div className="containers">
        <form onSubmit={createUser}>
          <div className="regtext">
            <p1>Register admin </p1>
          </div>

          <div className="RegisterContainet">
            <input
              className="input1"
              placeholder="Name"
              onChange={getName}
            ></input>
            <input
              className="input2"
              placeholder="Surname"
              onChange={getSurname}
            ></input>
            <input
              className="input3"
              placeholder="Email"
              onChange={getEmail}
            ></input>
            <input
              className="input4"
              placeholder="Password"
              onChange={getPassword}
            ></input>
            <input className="button" type="submit" value="Register" />
          </div>
        </form>

        <div className="listOfAdmin">
          <p1 className="listText">List of Admin</p1>
          {users.map((action) => [
            <div className="simon" key={action.id}>
              Name :{action.Name}{" "}
              <button id={action.id} onClick={deleteuser}>
                delete user
              </button>
              {/* <button id={action.id} onClick={getData}>get data</button> */}



              <Button className="updateButton" onClick={handleClickOpen}>
                Update 
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
              
              >
                <DialogTitle >
                  {"Update Admin"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText >

                    
                    
                    <input placeholder="Name" onChange={getName} type="text" aria-label="First name" class="form-control"/>
                    <br/>
                    <input placeholder="Surname" type="text" onChange={getSurname} aria-label="First name" class="form-control"/>
                    <br/>
                    <input placeholder="Email" type="text" onChange={getEmail} aria-label="First name" class="form-control"/>
                    <br/>
                    <input placeholder="Number" type="text" onChange={getPassword} aria-label="First name" class="form-control"/>
                    <br/>


                    
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>

                  {/* {users.map((action)=>{
                    <div className="simon" key={action.id}></div>

                    {action.Name}
                  })} */}
                  <Button onSubmit={updateAdmin} onClick={handleClose}  autoFocus>
                    Update
                    
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <button id={action.id} onClick={updateAdmin}>Update Admin</button> */}
            </div>,
          ])}
        </div>
      </div>
    </>
  );
};
export default ManageAdmin;
