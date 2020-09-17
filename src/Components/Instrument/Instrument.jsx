
import React, { useState, useEffect, useRef, useContext } from "react";
import "./Instrument.scss";
import instrumentContext from "../../context/instrumentContext";

// const synth = new Tone.Synth().toDestination();
// synth.triggerAttackRelease("C4", "8n");

// const synth = new Tone.AMSynth().toDestination();
// synth.triggerAttackRelease("C4", "4n");



function Instrument() {

const {dataInstrument, setDataInstrument} = useContext(instrumentContext)
// console.log({dataInstrument, setDataInstrument});

  const handleInstrument = (ev) => {

if (ev.target.value) {

setDataInstrument(ev.target.value)

    

 }

  };

    const handleClose = (ev) => {
        ev.preventDefault();
        alert("close");
      };


return (<>


    {console.log(dataInstrument.dataInstrument)}
    <div className="box instrument">

      <div className="box__bar">
        <button className="box__close" onClick={handleClose}>X</button>
      </div>

      <div className="box__content">

        <select onChange={handleInstrument} name="" id="">
          <option value="">Choisir un instrument</option>
          <option value="Synth">Synth</option>
          <option value="AMSynth">AMSynth</option>
        </select>
      


      

      </div>

    </div>
    
  </>
);
}

export default Instrument;