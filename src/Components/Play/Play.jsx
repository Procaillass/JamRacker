
import React, { useState } from "react";
import "./Play.scss";
import * as Tone from 'tone';
import { now as Now, Synth, Sampler, Recorder } from "tone";
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext';
import { fire } from "../../fire";

function Play({ dataTracks, instrument, handleCurrentStep, src, setSrc,changeIsRecorded }) {

    /*
     * -------------
     * CONTEXT
     * -------------
     */

    //const instContext = useContext(PlayContext);
    //const { dataBpm } = useContext(BpmContext);

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

        if(playing === true) {
            console.log('stop');
            Tone.Transport.stop();
            Tone.Transport.cancel();
            setPlaying(!playing);
            return
        }

        // if(dataTracks.notes.length === 0) return;

        // Generate Audio
        const actx = Tone.context;
        const dest = actx.createMediaStreamDestination();
        const recorder = new MediaRecorder(dest.stream);
        instrument.connect(dest);
        const chunks = [];
        //

        // Converti dataTracks (passé en props) en tableau lisible par scheduleRepeat
        const reorderedNotes = [];
        for (let i = 0; i < 16; i++) {
            const filteredNotes = [...dataTracks.notes].filter(el => el.steps === i);
            if (filteredNotes.length) {
                reorderedNotes[i] = filteredNotes;
            }
        }
        console.log(reorderedNotes);

        let currentStep = 0;
        
        recorder.start();
        let isRecording = true;

        Tone.Transport.scheduleRepeat((time) => {

            let timeOutDuration = 100;

            if (reorderedNotes[currentStep]) {
                const now = Tone.now();
                reorderedNotes[currentStep].map( (el, elIdx) => {
                    instrument.triggerAttackRelease( el.name, el.duration, now+elIdx/1000 );
                    // remplacer timeOutDuration par la durée de la note la plus longue du map;
                });
            }

            if (currentStep === 15) {
                if(isRecording) {
                    isRecording = !isRecording;
                    setTimeout(() =>{recorder.stop();}, timeOutDuration);
                }
            }

            currentStep++;
            if (currentStep > 15) { currentStep = 0 };

        },"16n");
        

        
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {
            changeIsRecorded();
            setSrc( new Blob(chunks, { type: 'audio/wav' }) );
            // console.log("Recorded: ", recordingdatas);
        };

        Tone.Transport.start();
        setPlaying(!playing);
    }
    
    /*
    * -------------
    * RENDER
    * -------------
    */

    return <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
}
export default Play;