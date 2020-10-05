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

const handleFavoris = (ev) => {

    if (source === favoris) {
      ev.currentTarget.src = favorisDone
        /* document.getElementsByClassName("favoris").src = favorisDone; */
        source = favorisDone;
    } else {
        /* document.getElementsByClassName("favoris").src = favoris; */
        ev.currentTarget.src = favoris
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
      </div>
      <div className="box__content">
        <div class="library">
        <ul>
          {allFiles.map((items,index)=>(
            <li>
              <div className="info__sound__content">
                <h2>{items.title}</h2>
                <h3>By {items.author}</h3>
              </div>
              <audio controls key={index}>
                <source src={items.urlStorage} />
              </audio>
              <div  className="box__content__actionAudio">
                <img onClick={handleFavoris} className="favoris" src={source} alt="favoris_image"/>
              </div>
            </li>
          ))}
        </ul>
        <div className="search__content">
          <label htmlFor="search-sound">Search sound :</label>
          <input id="search-sound" type="search" placeholder="Search a sound"/>
        </div>

        </div>
      </div>
    </div>
  );
}

export default Library;
