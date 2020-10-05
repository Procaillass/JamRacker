import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import { db , fire } from "../../fire";
import "./Favoris.scss";
import { createRef } from "react";
import { useHistory } from "react-router";

function Favoris() {


/*
* -------------
* REF 
* -------------
*/

const searchInput = createRef();

/*
* -------------
* STATE 
* -------------
*/
 const [allFiles,setAllFiles] = useState([]);
 const pseudo = JSON.parse(localStorage.getItem("pseudo"));


let source = favoris

//comment for push


/*
* -------------
* DB STORAGE
* -------------
*/

// va rechercher les elements dans la db
const fetchSong = () => {

    db.collection("Favoris").where("userId","==",pseudo).get().then( querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data())
        console.log(doc.id, " => ", doc.data());
      });
      setAllFiles(data);
    })

}



useEffect(()=>{

  fetchSong();

},[])

/*
* -------------
* RENDER
* -------------
*/

  return (
    <div className="box">
      <div className="box__bar">
      <div className="box__title">Favoris </div>
      </div>
      <div className="box__content">
        <div className="library">
        <ul className="songsList">
          {allFiles.map((items,index)=>(
            <li className="song" key={index}>
              <div className="info__sound__content">
                <h2 className="song_title">{items.title}</h2>
                <h3>By {items.author}</h3>
              </div>
              <audio controls key={index}>
                <source src={items.urlStorage} />
              </audio>
              
            </li>
          ))}
        </ul>

        </div>
      </div>
    </div>
  );
}

export default Favoris;
