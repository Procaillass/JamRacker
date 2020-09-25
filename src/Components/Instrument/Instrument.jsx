
import React, { useState, useEffect, useRef, useContext } from "react";
import "./Instrument.scss";
import instrumentContext from "../../context/instrumentContext";
import Play from "../../Components/Play/Play";
import * as Tone from 'tone';
import {PlayProvider} from "../../context/playContext";


function Instrument({dataTracks}) {

  /*
   * -------------
   * CONTEXT
   * -------------
   */
  
   const {dataInstrument, setDataInstrument} = useContext(instrumentContext);
  

   /*
   * -------------
   * STATES
   * -------------
   */

  /* const [inst, setInst] = useState(); */

  /*
   * -------------
   * METHODS
   * -------------
   */

  const changeInst = (newInst) => { 
  switch (newInst) {
        case 'Synth':
          setDataInstrument(new Tone.Synth().toDestination());
        break;
        case 'AMSynth':
          setDataInstrument(new Tone.AMSynth().toDestination());
        break;
        case 'PluckSynth':
          setDataInstrument(new Tone.PluckSynth().toDestination());
        break;
        case 'PolySynth':
          setDataInstrument(new Tone.PolySynth().toDestination());
        break;
        default:
          setDataInstrument(new Tone.Synth().toDestination());
    }
}

  /*
  * -------------
  * HANDLERS
  * -------------
  */
 
  const handleInstrument = (ev) => {
    if (ev.target.value) {
      changeInst(ev.target.value);
    }
  };
  
  const handleClose = (ev) => {
    ev.preventDefault();
    alert("close");
  };

  /*
    * -------------
    * EFFECTS
    * -------------
    */

    /* useEffect(() => {
      changeInst(dataInstrument);
  }, [dataInstrument]); */

  /*
    * -------------
    * RENDER
    * -------------
    */
   //console.log("props inst", dataTracks);

return (
  <div className="sequencer__addtrack instrument">
      <select onChange={handleInstrument} name="" id="">
        <option value="">choose an instrument</option>
        <option value="Synth">Synth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="PluckSynth">PluckSynth</option>
        <option value="PolySynth">PolySynth</option>
        <option value="Sampler">Sampler</option>
      </select>
  </div>
  );
}
export default Instrument;