import React, { useState, useEffect} from "react";
import { db } from "../../fire";
import { useHistory } from "react-router";
import LibrarySound from "../Library/LibrarySound";

function Favoris() {

const history = useHistory();

/*
* -------------
* STATE 
* -------------
*/
 const [allFiles,setAllFiles] = useState([]);
 const pseudo = JSON.parse(localStorage.getItem("pseudo"));
 const isFav = true;

 /*
* -------------
* HANDLE
* -------------
*/

const handleFavoris = (item) => {
  if(window.confirm('Voulez-vous vraiment supprimer le son de vos favoris ?')){
    if(localStorage.getItem("pseudo")!== null){
      db.collection("Favoris").doc(item.title).set({
        title:item.title,
        description:item.description,
        source:item.source,
        author:item.author,
        urlStorage:item.urlStorage,
        visibility:item.visibility,
        isFav:false,
        userId:JSON.parse(localStorage.getItem("pseudo"))
      })
      window.location.href="/favoris"
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

    db.collection("Favoris").where("userId","==",pseudo).where("isFav","==",true).get().then( querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data())
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
        <div className="box__title"><h1>Favoris</h1> </div>
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

export default Favoris;