import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import { db , fire } from "../../fire";
import "./Favoris.scss";
import { createRef } from "react";
import { useHistory } from "react-router";
import LibrarySound from "../Library/LibrarySound";

function Favoris() {

/*
* -------------
* STATE 
* -------------
*/
 const [allFiles,setAllFiles] = useState([]);
 const pseudo = JSON.parse(localStorage.getItem("pseudo"));

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
          <ul className="library__sounds">
            {allFiles.map((item, index) => (
              <LibrarySound
                key={index}
                index={index}
                title={item.title}
                author={item.author}
                url={item.urlStorage}
                item={item}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Favoris;
