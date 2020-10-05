import React, { useState, useEffect, useRef, useContext } from "react";
import clap from "../../Assets/Sounds/clap.wav";
import favoris from "../../Assets/Images/favoris.svg";
import favorisDone from "../../Assets/Images/favorisDone.svg";
import "./Library.scss";

function Library() {

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
