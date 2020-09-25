
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import * as Tone from 'tone';
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext'

function Play({dataTracks}) {

  /*
   * -------------
   * CONTEXT
   * -------------
   */

   const instContext = useContext(PlayContext);
   // const {dataTracks, setDataTracks} = useContext(StepSeqContext);
   const {dataBpm} = useContext(BpmContext);
   
   /*
   * -------------
   * STATES
   * -------------
   */
 
   const [playing, setPlaying] = useState(false);
   const [instState,setInst] = useState();

    /*
    * -------------
    * HANDLERS
    * -------------
    */
    const handlePlaying = (ev) => {
        ev.preventDefault();
        console.log("props play", dataTracks);
        Tone.Transport.cancel();

        const notes = [...dataTracks.notes];
        const reorderedNotes = [];
        for (let i = 0; i < 16; i++) {
            const filteredNotes = notes.filter(el => el.steps === i);
            console.log("filter", filteredNotes, typeof filteredNotes);
            if(filteredNotes.length) {
                console.log("in");
                reorderedNotes[i] = filteredNotes;
            }
        }
        
        let currentstep = 0;
        Tone.Transport.scheduleRepeat(
            (time) => {
                if (reorderedNotes[currentstep]) {
                    const now = Tone.now();
                    reorderedNotes[currentstep].map((el, eli) => {
                      instState.inst.triggerAttackRelease(
                          el.name,
                          el.duration,
                          now + eli/1000
                        );
                    });
                }
                currentstep++;
                if (currentstep > 15) { currentstep = 0 };
          },
          "16n",
          0
        );
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
    
    return (
        <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
    );
}
export default Play;