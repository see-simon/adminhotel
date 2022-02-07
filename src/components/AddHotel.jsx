import React, { useState } from "react";
import "./css/AddHotel.css";
import {render} from "react-dom"


 import { storage } from "./firebase";



const AddHotel = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.file[0]) {
      setImage(e.target.file[0]);
    }
  };

  const handleUpload = () => {

    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on( 
      "state_changed",
      snapshort => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image)
          .getDownloadURL()
          .then(url => {
            console.log(url + "=");
          });
      }
    );
  };

  console.log("image: ", image);

  return (
    <>
      <div className="containers">
        <div>
          
       

          <input type="file" onChange={handleChange}></input>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </>
  );
};
   export default AddHotel;

 render(<AddHotel/> , document.querySelector("#root"));
