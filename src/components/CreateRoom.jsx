import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { storage } from "./firebase";
import "./css/createRoom.css";

const CreateRoom = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  
  const [roomPrice, setRoomPrice] = useState();
  const [roomNumber, setRoomNumber] = useState();


  const getRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  const getRoomPrice = (e) => {
    setRoomPrice(e.target.value);
  };
  //

  const db = firebase.firestore();

  const registerRoom = (e) => {
    e.preventDefault();
    let uid = e.target.id

    db.collection("createRoom")
      .add({
        Url: url,
        RoomPrice: roomPrice,
        RoomNumber: roomNumber,

        
      })
      .then((res) => {
        console.log("Room created");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`Room/${image.name}`).put(image);
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
          .ref("Room")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  console.log("image: ", image);

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
  return (
    <>
      
      <div className="homecontainer2">
        <div className="container">

        <div className="pic">
          
        
            <text>Create Room</text>

            <br />
            <br />
            
            
            
            <progress value={progress} max="100" />
            <br />
            <br />
            <form onSubmit={registerRoom}>
            <input name="url" type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <input onChange={getRoomPrice} placeholder="Room Price"></input>
           <input onChange={getRoomNumber} placeholder="Room number"></input>

            <input
            className="registerButton"
            type="submit"
            value="Register room"
          />
          </form>
            <br />
            {/* {url} */}
            <br />
            {/* <img
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
            /> */}
          </div>

          </div> 
            
        </div>
      
    </>
  );
};
export default CreateRoom;
