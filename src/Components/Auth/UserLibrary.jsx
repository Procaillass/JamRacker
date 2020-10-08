import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../fire";
import Waveforms from "../Waveforms";

function UserLibrary() {
  /*
   * -------------
   * STATE
   * -------------
   */
  const [allSongTracker, setAllSongTracker] = useState([]);
  const pseudo = JSON.parse(localStorage.getItem("pseudo"));

  /*
   * -------------
   * HANDLE
   * -------------
   */

  /*
   * -------------
   * DB STORAGE
   * -------------
   */

  const fetchTracker = () => {
    db.collection("SongTracker")
      .where("author", "==", pseudo)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllSongTracker(data);
      });
  };

  /*
   * -------------
   * USE EFFECT
   * -------------
   */

  useEffect(() => {
    fetchTracker();
  }, []);

  /*
   * -------------
   * RENDER
   * -------------
   */

  return (
    <>
      <h2>Ma librairie</h2>
      <ul className="library__sounds">
        {allSongTracker.map((item, index) => (
          <li key={index} className="library__sound">
            <h3 className="library__sound__header">
              <span className="library__sound__title">{item.title}</span>
              <span className="library__sound__author">Visiblité</span>
            </h3>
            <div className="library__sound__waveform">
              <Waveforms
                url={item.urlStorage}
                id={`wf_${index}`}
                height="200"
                barWidth="4"
                waveColor="rgba(255,255,255,0.4)"
                progressColor="rgba(255,255,255,0.9)"
                cursorColor="rgba(0,0,0,0.7)"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserLibrary;
