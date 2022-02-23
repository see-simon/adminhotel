import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
//
//
import "./css/home.css";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import img from "./images/admin2.png";
import firebase from "./firebase";

const Home = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

//room pics
  

  const [hotelName, setHotelName] = useState();
  //                         put them in create room page
  const [location, setLocation] = useState();
  // 
 
  const getHotelName = (e) => {
    setHotelName(e.target.value);
  };

  const getLocation = (e) => {
    setLocation(e.target.value);
  };

  // const getRoomImage=(e)=>{
  //   setRoomImage(e.target.value)
  // }
 

  //for room
  // const getRoomUrl =(e)=>{
  //   setRoomUrl(e.target.value)
  // }
  const [roomNumber, setRoomNumber] = useState();
  const [roomPrice, setRoomPrice] = useState();

  const [roomImage, setRoomImage] = useState(null);
  const [roomurl, setRoomUrl] = useState("");

  const getRoomNumber = (e)=>{
    setRoomNumber(e.target.value)
  }
  const getRoomPrice =(e)=>{
    setRoomPrice(e.target.value)
  }

  const handleRoomImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRoomUpload = () => {
    const uploadTask = storage.ref(`Roomimages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("Roomimages")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setRoomUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

  const [Roomfiles, setRoomFiles] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("Roomimages/").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );
      return Promise.all(urlPromises);
    };
    const loadImages = async () => {
      const ulrs = await fetchImages();
      setRoomFiles(ulrs);
    };
    loadImages();
  }, []);
  console.log(Roomfiles);



// room ends here

  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

  //

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("images/").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );
      return Promise.all(urlPromises);
    };
    const loadImages = async () => {
      const ulrs = await fetchImages();
      setFiles(ulrs);
    };
    loadImages();
  }, []);
  console.log(files);

  //register hotel
  const db = firebase.firestore();

  const registerHotel = (e) => {
    e.preventDefault();
    let uid = e.target.id
    db.collection("createHotel")
      .add({
        Url: url,
        HotelName: hotelName,
        Location: location,
        RoomNumber: roomNumber,        
         RoomPrice: roomPrice,
         roomUrl : roomurl,

      })
      .then((res) => {
        console.log("hotel created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="homecontainer">
      <div className="firstName">
        <div>
          <img className="image" src={img} />
        </div>
        <div
          className="menu"
          style={
            {
              // marginLeft: "40%",
            }
          }
        >
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Open Menu List
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/CreateRoom">Create Room</Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}><Link to="/AddAdmin">AddAdmin</Link></MenuItem> */}
            <MenuItem onClick={handleClose}>
              <Link to="/ManageAdmin">ManageAdmin</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/Login">Logout</Link>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="leftPanel">
        <text>Add hotel</text>

        <br />
        <br />
        <form onSubmit={registerHotel}>
          <input name="url" type="file" multiple onChange={handleChange} />
          <button onClick={handleUpload}>Upload Hotel</button>
          <br/>
          <br/>
          <input name='roomurl' type="file" multiple onChange={handleRoomImage}></input>
          <button onClick={handleRoomUpload}>Upload Room</button>
          
          <br/>
          <br/>
          <br/>
           <input onChange={getHotelName} placeholder="Hotel Name"></input>
           <br/>
           <input onChange={getLocation} placeholder="Hotel Location"></input>
           <br/>
           <input onChange={getRoomPrice} placeholder='room Price'></input>
           <br/>
           <input onChange={getRoomNumber} placeholder='room Number'></input>
         
          <br />
          <br />
          <progress value={progress} max="100" />

          <br />
          {url}
          {roomurl}

          <br />
 

          {/* {files.map((url, i) => (
            <img 
              key={i}
              style={{ width: "150px", height: "150px", margin: 15 }}
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
                
            />
          
            
          ))} */}
          <br/>
          <input
            className="registerButton"
            type="submit"
            value="Register hotel"
          />
        </form>

        {/* <form onSubmit={registerHotel}>
          <input type="file" name="url" multiple onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        <br />
        <progress value={progress} max="100" />
        <br />
              <input className="button" type="submit" value="Register" />
          </form> */}
      </div>
    </div>
  );
};

export default Home;
