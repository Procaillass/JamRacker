import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import { db , fire } from "../../fire";
import "./Library.scss";

function Library() {

/*
* -------------
* STATE 
* -------------
*/
 const [allFiles,setAllFiles] = useState([]);


let source = favoris

//comment for push

const handleFavoris = () => {

    if (source === favoris) {
        document.getElementById("favoris").src = favorisDone;
        source = favorisDone;
    } else {
        document.getElementById("favoris").src = favoris;
        source = favoris;
    }
}

/*
* -------------
* DB STORAGE
* -------------
*/

// va rechercher les elements dans la db
const fetchSong = () => {
    
    // const gsReference = fire.storage().refFromURL("gs://jamracker-776e7.appspot.com/Tracker")

    // gsReference.listAll().then(res => {
    //   setAllFiles(res.items)
    // })

    db.collection("SongTracker").get().then( querySnapshot => {
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
      <div className="box__title">Library</div>
        <button className="box__close">X</button>
      </div>
      <div className="box__content">
        <ul>
          <li>
              <div className="info__sound__content">
                <h2>Titre du son</h2>
                <h3>By Author</h3>
              </div>
            <audio controls>
              <source src={clap} />
              Your browser does not support the audio element.
            </audio>
            {allFiles.map((items,index)=>(
              <>
                <h2>{items.title}</h2>
                <h3>By {items.author}</h3>
                <audio controls key={index}>
                  <source src={items.urlStorage} />
                </audio>
              </>
            ))}
            <div  className="box__content__actionAudio">
                <img onClick={handleFavoris} id="favoris" src={source} alt="favoris_image"/>
            </div>
          </li>
        </ul>
        <div className="search__content">
          <label htmlFor="search-sound">Search sound :</label>
          <input id="search-sound" type="search" placeholder="Search a sound"/>
        </div>
      </div>
    </div>
  );
}

export default Library;
