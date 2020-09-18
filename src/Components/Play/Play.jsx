
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import * as Tone from 'tone';
import PlayContext from "../../context/playContext";

function Play() {

  /*
   * -------------
   * CONTEXT
   * -------------
   */

   const instContext = useContext(PlayContext);
   
   /*
   * -------------
   * STATES
   * -------------
   */
 
   const [playing, setPlaying] = useState(false);
   const [instState,setInst] = useState();

   /*
   * -------------
   * METHODS
   * -------------
   */

    /*
    * -------------
    * HANDLERS
    * -------------
    */
 
    const handlePlaying = (ev) => {
        ev.preventDefault();
        instState.inst.triggerAttackRelease("C4", "4n");
    };

    /*
    * -------------
    * EFFECTS
    * -------------
    */

    useEffect(() => {
        setInst(instContext)
    }, [instContext]);

    /*
    * -------------
    * RENDER
    * -------------
    */
    
    return ( <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button> );
}
export default Play;