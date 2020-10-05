import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import { db , fire } from "../../fire";
import "./Library.scss";
import { createRef } from "react";
import { useHistory } from "react-router";

function Library() {

const history = useHistory();

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


let source = favoris

//comment for push

const handleFavoris = (items,ev) => {
  console.log("items => ",items);
  if(window.confirm('Are you sure you want to add the track ?')){
    console.log("oui")
    if(localStorage.getItem("pseudo")!== null){
      db.collection("Favoris").doc(items.title).set({
        title:items.title,
        description:items.description,
        source:items.source,
        author:items.author,
        urlStorage:items.urlStorage,
        visibility:items.visibility,
        userId:JSON.parse(localStorage.getItem("pseudo"))
      })
    }else{
      alert("Vous n'avez pas de compte!!!")
      history.push("login");
    }
  }
    console.log("target => ",ev.target)
    if (source === favoris) {
        ev.currentTarget.src = favorisDone
        source = favorisDone;
    } else {
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

    db.collection("SongTracker").where("visibility","==",true).get().then( querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data())
        console.log(doc.id, " => ", doc.data());
      });
      setAllFiles(data);
    })

}

const search = () => {
  //Input
  let input = searchInput.current
  //Filter = la valeur de l'input
  let filter = input.value.toUpperCase();
  //La liste
  let ul = document.querySelector(".songsList");
  //Chaque element de la liste
  let li = ul.querySelectorAll('li');

  for (let i = 0; i < li.length; i++) {

      //le mot a filtrer
      let a = li[i].querySelector(".song_title");

      //Je get sa veleur
      let txtValue = a.textContent || a.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } 
      else {
          li[i].style.display = "none";
      }
  }
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
              <div  className="box__content__actionAudio">
                <img onClick={(ev)=>handleFavoris(items,ev)} className="favoris" src={source} alt="favoris_image"/>
              </div>
            </li>
          ))}
        </ul>
        <div className="search__content">
          <label htmlFor="search-sound">Search sound :</label>
          <input id="search-sound" ref={searchInput} onChange={search} type="search" placeholder="Search a sound"/>
        </div>

        </div>
      </div>
    </div>
  );
}

export default Library;
