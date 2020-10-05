import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import { db , fire } from "../../fire";
import LibrarySound from './LibrarySound.js';
import Waveforms from '../Waveforms';
import classNames from 'classnames';

function Library() {

/*
* -------------
* STATE 
* -------------
*/
 const [allFiles,setAllFiles] = useState([]);
 const [isFav,setIsFav] = useState(false);

//comment for push

const handleFavoris = (ev) => {
  setIsFav(!isFav);
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
          
          <div className="library__search">
            <input id="library__search__sound" type="search" placeholder="Search a track"/>
          </div>
          
          <ul className="library__sounds">
            {allFiles.map((item,index)=>(
              
              <LibrarySound
                key={index}
                index={index}
                title={item.title}
                author={item.author}
                url={item.urlStorage}
              />
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Library;
