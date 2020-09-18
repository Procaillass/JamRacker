
import React, { useState, useEffect, useRef, useContext } from "react";
import "./Instrument.scss";
import instrumentContext from "../../context/instrumentContext";
import Play from "../../Components/Play/Play";

// const synth = new Tone.Synth().toDestination();
// synth.triggerAttackRelease("C4", "8n");

// const synth = new Tone.AMSynth().toDestination();
// synth.triggerAttackRelease("C4", "4n");

function Instrument() {

  /*
   * -------------
   * CONTEXT
   * -------------
   */
  
   const {dataInstrument, setDataInstrument} = useContext(instrumentContext)

  /*
  * -------------
  * HANDLERS
  * -------------
  */
 
  const handleInstrument = (ev) => {
    
    if (ev.target.value) {
      setDataInstrument(ev.target.value);
    }
  };
  
  const handleClose = (ev) => {
    ev.preventDefault();
    alert("close");
  };

  const handlePlay = (value) => {
    console.log(value);
  }



  return (
  <div className="box instrument">
    <div className="box__bar">
    <div className="box__title">Instrument</div>
      <button className="box__close" onClick={handleClose}>X</button>
    </div>
    
    <div className="box__content">

    <p>Context value: {dataInstrument}</p>
      
      <select onChange={handleInstrument} name="" id="">
        <option value="">Choisir un instrument</option>
        <option value="Synth">Synth</option>
        <option value="AMSynth">AMSynth</option>
      </select>

      <Play handlePlay={handlePlay} />
      
    </div>
  </div>
  );
}
export default Instrument;