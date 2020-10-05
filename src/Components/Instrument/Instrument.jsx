
import React, { useState, useEffect, useRef, useContext } from "react";
import "./Instrument.scss";
import instrumentContext from "../../context/instrumentContext";
import SamplerContext from "../../context/samplerContext";
import Play from "../../Components/Play/Play";
import * as Tone from 'tone';
import {PlayProvider} from "../../context/playContext";

import kick from "../../Assets/Sounds/kick.wav";


function Instrument({dataTracks}) {

  /*
   * -------------
   * CONTEXT
   * -------------
   */
  
   const {dataInstrument, setDataInstrument} = useContext(instrumentContext);
   const {dataSampler, setDataSampler} = useContext(SamplerContext);
  

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
        case '':
          setDataInstrument(new Tone.Synth().toDestination());
          break;
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
        case 'Sampler':
          console.log(dataSampler.urls);
          if(Object.keys(dataSampler.urls).length === 0 && dataSampler.urls.constructor === Object ) {
            //setDataInstrument(new Tone.Sampler(dataSampler.urls).toDestination());
            setDataInstrument(new Tone.Synth().toDestination());
            console.log("empty");
          } else {
            //setDataInstrument(new Tone.Synth().toDestination());
            setDataInstrument(new Tone.Sampler(dataSampler.urls).toDestination());
            console.log("not empty");
          }
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
  <select className="instrument" onChange={handleInstrument}>
        <option value="">choose an instrument</option>
        <option value="Synth">Synth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="PluckSynth">PluckSynth</option>
        <option value="PolySynth">PolySynth</option>
        <option value="Sampler">Sampler</option>
      </select>
  );
}
export default Instrument;