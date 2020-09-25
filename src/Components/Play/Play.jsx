
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import "./Play.scss";
import * as Tone from 'tone';
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext'

function Play() {

  /*
   * -------------
   * CONTEXT
   * -------------
   */

   const instContext = useContext(PlayContext);
   const {dataTracks, setDataTracks} = useContext(StepSeqContext);
   const {dataBpm} = useContext(BpmContext);

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

   //console.log("data",dataTracks.notes);
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
        Tone.Transport.cancel();
        /* dataTracks.notes.map(note => {
            const time = 60/100;
            Tone.Transport.scheduleRepeat((time) => { 
                instState.inst.triggerAttackRelease(note.name,note.duration);
                console.log("note",note.n)
            },time, note.steps + 'n')
        });
        Tone.Transport.start();
        setTimeout(() => {
            Tone.Transport.stop()
        },5000); */

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


        /* const reorderedNotes = [];
        reorderedNotes[1] =[
            { duration: 1, name: "C3", steps: 1, time: 1.3 },
            { duration: 1, name: "E3", steps: 1, time: 1.3 },
            { duration: 1, name: "G3", steps: 1, time: 1.3 },
        ];
        
        reorderedNotes[5] =[
            { duration: 1, name: "F3", steps: 2, time: 1.3 },
            { duration: 1, name: "A4", steps: 2, time: 1.3 },
            { duration: 1, name: "C4", steps: 2, time: 1.3 },
        ];
        
        reorderedNotes[8] =[
            { duration: 1, name: "G3", steps: 3, time: 1.3 },
            { duration: 1, name: "B4", steps: 3, time: 1.3 },
            { duration: 1, name: "D4", steps: 3, time: 1.3 },
        ]; */
        console.log(reorderedNotes);
        //console.log("TEST",stepsarray);
        console.log(dataBpm.bpm);
        let currentstep = 0;
        Tone.Transport.scheduleRepeat(
            (time) => {
                if (reorderedNotes[currentstep]) {
                    const now = Tone.now();
                    reorderedNotes[currentstep].map((el, eli) => {
                      instState.inst.triggerAttackRelease(
                          el.name,
                          0.2,
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
    
    return ( <button className="play__button" onClick={handlePlaying}>{playing ? "stop" : "play"}</button> );
}
export default Play;