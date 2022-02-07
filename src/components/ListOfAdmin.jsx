import React from "react";
import Register from "./Register";
import firebase from './firebase'

const ListOfUsers =()=>{



    const db = firebase.firestore();



   

    return
      (
        
       <div className='profile'>
                <h1>User</h1>
                {
                    this.state.users && 
                        this.state.users.map( users => {
                            return(
                                <div>
                                    <p>
                                        First Name : {String(users.Name)}
                                        Last Name : {String(users.Surname)}
                                        
                                                                        
                                        </p>
                                </div>
                                
                            )
                        })
                }
                </div>
      )  
      
}
export default ListOfUsers
