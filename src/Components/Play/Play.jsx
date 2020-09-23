
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import * as Tone from 'tone';
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";

function Play() {

  /*
   * -------------
   * CONTEXT
   * -------------
   */

   const instContext = useContext(PlayContext);
   const {dataTracks, setDataTracks} = useContext(StepSeqContext);

  /*  useEffect(() => {
    setNotes([dataTracks.notes])
   },[dataTracks.notes]);
 */
   
   /*
   * -------------
   * STATES
   * -------------
   */
 
   const [playing, setPlaying] = useState(false);
   const [instState,setInst] = useState();
   console.log("play state",typeof dataTracks.notes)

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
        /* instState.inst.triggerAttackRelease(...dataTracks.notes.map(notes => (notes.name + ',' + notes.duration + ',' + notes.time +',0.5'))); */
        /* instState.inst.triggerAttackRelease("C4", "4n"); */
        /* const now = Tone.now();
        instState.inst.triggerAttack("c4", "4n", now);
        instState.inst.triggerAttack("b6", "4n", now + 1)
        Tone.Transport.cancel();
        Tone.Transport.scheduleRepeat(time => {
            instState.inst.triggerAttack("c4", time, now);
            instState.inst.triggerAttack("b6", time, now)
            dataTracks.notes.map(note => (
                instState.inst.triggerAttack(note.name, time)
            ))
        }, '4n');

        

        const now = Tone.now()
        
            /* dataTracks.notes.map(note => (
                instState.inst.triggerAttack(note.name, '4n',)
            )) */
        
            Tone.Transport.cancel();
            Tone.Transport.scheduleRepeat((time) => {
                dataTracks.notes.map((note, index) => {
                
                    instState.inst.triggerAttackRelease(note.name, note.duration, note.time);
                    
                
              });
              console.log("time",time);
            },  "4n","1m"); 
            Tone.Transport.start();
                    
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