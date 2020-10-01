
import React, { useState } from "react";
import "./Play.scss";
import * as Tone from 'tone';
import { now as Now, Synth, Sampler, Recorder } from "tone";
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext';
import { fire } from "../../fire";

function Play({ dataTracks, instrument, handleCurrentStep, src,setSrc,changeIsRecorded }) {

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

        if(dataTracks.notes.length === 0) return;

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

        let currentStep = 0;
        Tone.Transport.scheduleRepeat(
            (time) => {

                // AudioGenerator
                if (currentStep === 0) recorder.start();
                //

                if (reorderedNotes[currentStep]) {
                    const now = Tone.now();
                    reorderedNotes[currentStep].map((el, eli) => {
                        instrument.triggerAttackRelease(
                          el.name,
                          el.duration,
                          now + eli/1000
                        );
                    });
                }
                handleCurrentStep(currentStep);
                console.log(currentStep);
                currentStep++; 
                // AudioGenerator
                if (currentStep === 15) {
                    recorder.stop();
                    //instrument.triggerRelease(time);
                }
                //
                if (currentStep > 15) { currentStep = 0 };
          },
          "16n",
          0
        );

        // AudioGenerator
        //console.log("dest :", dest.stream)
        
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {

            if (currentStep <= 16){
                changeIsRecorded();
                let blob = new Blob(chunks, { type: 'audio/wav' });
                const recordingdatas = blob;
                setSrc(recordingdatas);
    
                console.log("Recorded: ", recordingdatas);
            }else{
                console.log("error enregistrement")
            }
            
           
        };


        playing === false ?
            Tone.Transport.start()
            : Tone.Transport.stop();

        setPlaying(!playing);

    };
    
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