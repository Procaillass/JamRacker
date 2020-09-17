
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import * as Tone from 'tone';

function Play({handlePlay}) {

  /*
   * -------------
   * CONTEXT
   * -------------
   */
  
   const {dataInstrument} = useContext(instrumentContext);

   /*
   * -------------
   * STATES
   * -------------
   */
 
   const [playing, setPlaying] = useState(false);
   const [inst, setInst] = useState(new Tone.Synth().toDestination());

   /*
   * -------------
   * METHODS
   * -------------
   */

   const changeInst = (newInst) => {

        switch (newInst) {
            case 'Synth':
            setInst(new Tone.Synth().toDestination());
            break;
            case 'AMSynth':
            setInst(new Tone.AMSynth().toDestination());
            break;
            default:
            console.log(`Sorry bro.`);
        }
    }

    /*
    * -------------
    * HANDLERS
    * -------------
    */
 
    const handlePlaying = (ev) => {
        //ev.preventDefault();
        inst.triggerAttackRelease("C4", "4n");
        handlePlay("playing");

    };

    /*
    * -------------
    * EFFECTS
    * -------------
    */

    useEffect(() => {
        changeInst(dataInstrument);
    }, [dataInstrument]);

    /*
    * -------------
    * RENDER
    * -------------
    */
    
    return ( <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button> );
}
export default Play;