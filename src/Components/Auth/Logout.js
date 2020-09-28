import React from "react"
import { BrowserRouter as Router, Route, Switch, Link,useHistory } from "react-router-dom";
import {  fire } from '../../fire';


export default function Logout(){
    const history = useHistory()
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("pseudo");
        fire.auth().signOut()
        window.location.href = "/"
      }
    return(
        <>
            <button className="logBtn"><Link to="/" onClick={(e) => handleLogout(e) }>Logout</Link></button>
        </>
    )
}