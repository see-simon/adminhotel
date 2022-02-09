import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { storage } from "./firebase";
import "./css/createRoom.css";

const CreateRoom = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`${image.name}`).put(image);
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
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            {url}
            <br />
            <img
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
            />
          </div>

          </div> 
            
        </div>
      
    </>
  );
};
export default CreateRoom;
