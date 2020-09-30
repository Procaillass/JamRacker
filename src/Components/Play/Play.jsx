
import React, { useState, useEffect, useRef, useContext } from "react";
import instrumentContext from "../../context/instrumentContext";
import "./Play.scss";
import * as Tone from 'tone';
import { now as Now, Synth, Sampler, Recorder } from "tone";
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext';
import { fire } from "../../fire";

function Play({ dataTracks, instrument, src, setSrc,setName,name }) {

    /*
     * -------------
     * CONTEXT
     * -------------
     */

    const instContext = useContext(PlayContext);
    const { dataBpm } = useContext(BpmContext);

    /*
    * -------------
    * STATES
    * -------------
    */

    const [playing, setPlaying] = useState(false);
    /* const [instState,setInst] = useState(); */

    // AudioGenerator
    //    const [src, setSrc] = useState("");
    //const [name, setName] = useState("jamtracker-sequence.wav");
    //

    /*
    * -------------
    * HANDLERS
    * -------------
    */
    const handlePlaying = (ev) => {
        ev.preventDefault();

       // console.log([...dataTracks.notes]);

        // Remove scheduled events from the timeline after the given time.
        // Repeated events will be removed if their startTime is after the given time
        Tone.Transport.cancel();

        // AudioGenerator
        const actx = Tone.context;
        const dest = actx.createMediaStreamDestination();
        const recorder = new MediaRecorder(dest.stream);
        instrument.connect(dest);
        const chunks = [];


        // Converti dataTracks (passé en props) en tableau lisible par scheduleRepeat
        const reorderedNotes = [];
        for (let i = 0; i < 16; i++) {
            const filteredNotes = [...dataTracks.notes].filter(el => el.steps === i);
            if (filteredNotes.length) {
                reorderedNotes[i] = filteredNotes;
            }
        }

        let currentstep = 0;
        Tone.Transport.scheduleRepeat(
            (time) => {
                // AudioGenerator
                if (currentstep === 0) recorder.start();
                //
                if (reorderedNotes[currentstep]) {
                    const now = Tone.now();
                    reorderedNotes[currentstep].map((el, eli) => {
                        instrument.triggerAttackRelease(
                            el.name,
                            el.duration,
                            now + eli / 1000
                        );
                    });
                }
                currentstep++;
                // AudioGenerator
                if (currentstep === 15) {
                    recorder.stop();
                    instrument.triggerRelease(time);
                }
                //
                if (currentstep > 15) { currentstep = 0 };
            },
            "16n",
            0
        );

        // AudioGenerator
        //console.log("dest :", dest.stream)
        
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {

            let blob = new Blob(chunks, { type: 'audio/wav' });
            const recordingdatas = blob;
            setSrc(recordingdatas);

            console.log("Recorded: ", recordingdatas);
            
           
        };


        playing === false ?
            Tone.Transport.start()
            : Tone.Transport.stop();

        setPlaying(!playing);

    };
    

    /*
    * -------------
    * EFFECTS
    * -------------
    */

    /* useEffect(() => {
        setInst(instContext)
    }, [instContext]); */

    /*
    * -------------
    * RENDER
    * -------------
    */

    return (
        <>
            <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
        </>
    );
}
export default Play;