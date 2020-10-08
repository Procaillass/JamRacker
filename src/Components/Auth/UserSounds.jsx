import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../fire";

function UserSounds() {
  /*
   * -------------
   * STATE
   * -------------
   */
  const [allSong, setAllSong] = useState([]);
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

  const fetchSong = () => {
    db.collection("Tracks")
      .where("author", "==", pseudo)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setAllSong(data);
      });
  };

  /*
   * -------------
   * USE EFFECT
   * -------------
   */

  useEffect(() => {
    fetchSong();
  }, []);

  /*
   * -------------
   * RENDER
   * -------------
   */

  return (
    <>
      <h2>Mes sons</h2>
      <ul className="my__sounds">
        {allSong.map((item, index) => (
          <li key={index} className="my__sound">
            <h3 className="my__sound__header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 20 20"
                width="16"
              >
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
              </svg>
              <span className="my__sound__title">{item.title}</span>
            </h3>
            <span className="my__sound__source">Créé avec :{item.source}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserSounds;
