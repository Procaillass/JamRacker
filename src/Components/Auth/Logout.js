import React from "react"
import {  fire } from '../../fire';


export default function Logout(){
    
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("pseudo");
        fire.auth().signOut()
        window.location.href = "/"
    }
    
    return <button onClick={handleLogout} >Se déconnecter</button>
}