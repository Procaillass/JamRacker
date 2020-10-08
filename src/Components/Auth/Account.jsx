import React from "react";
import { useState } from "react";
import UserLibrary from "./UserLibrary";
import UserSounds from "./UserSounds";

function Account() {
  /*
   * -------------
   * STATE
   * -------------
   */

  const [showSound, setShowSound] = useState(true);
  const [showLibrary, setShowLibrary] = useState(false);

  /*
   * -------------
   * HANDLE
   * -------------
   */

  const handleSounds = (ev) => {
    ev.preventDefault();
    setShowSound(true);
    setShowLibrary(false);
  };

  const handleLibrary = (ev) => {
    ev.preventDefault();
    setShowLibrary(true);
    setShowSound(false);
  };

  /*
   * -------------
   * USE EFFECT
   * -------------
   */

  /*
   * -------------
   * RENDER
   * -------------
   */

  return (
    <>
      <div className="box account">
        <div className="box__bar">
          <div className="box__title">
            <h1>Mes créations</h1>
          </div>
        </div>
        <div className="box__content">
          <div className="account__btn">
            <button onClick={handleSounds}>Mes sons</button>
            <button onClick={handleLibrary}>Ma librairie</button>
          </div>
          {showSound === true && <UserSounds />}
          {showLibrary === true && <UserLibrary />}
        </div>
      </div>
    </>
  );
}

export default Account;
