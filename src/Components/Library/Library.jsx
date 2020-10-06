import React, { useState, useEffect} from "react";
import { db} from "../../fire";
import LibrarySound from './LibrarySound.js';
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
 const isFav = false;

/*
* -------------
* HANDLE
* -------------
*/

const handleFavoris = (item) => {
  if(window.confirm('Are you sure you want to add the sound to your favorites ?')){
    if(localStorage.getItem("pseudo")!== null){
      db.collection("Favoris").doc(item.title).set({
        title:item.title,
        description:item.description,
        source:item.source,
        author:item.author,
        urlStorage:item.urlStorage,
        visibility:item.visibility,
        userId:JSON.parse(localStorage.getItem("pseudo"))
      })
    }else{
      alert("Vous n'avez pas de compte!!!")
      history.push("/login");
    }
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
  
  let li = document.querySelectorAll('.library__sound');

  for (let i = 0; i < li.length; i++) {

      //le mot a filtrer
      let a = li[i].querySelector(".library__sound__title");

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
          
          <div className="library__search">
            <input id="library__search__sound" type="search" placeholder="Search a track" ref={searchInput} onChange={search} />
          </div>
          
          <ul className="library__sounds">
            {allFiles.map((item,index)=>(
              
              <LibrarySound
                key={index}
                index={index}
                title={item.title}
                author={item.author}
                url={item.urlStorage}
                item={item}
                handleFavoris={handleFavoris}
                isFav = {isFav}
              />
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Library;