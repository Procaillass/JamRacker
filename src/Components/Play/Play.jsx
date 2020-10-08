
import React, { useState, useEffect, useContext } from "react";
import "./Play.scss";
import * as Tone from 'tone';
import { now as Now, Synth, Sampler, Recorder } from "tone";
import PlayContext from "../../context/playContext";
import StepSeqContext from "../../context/stepSequencerContext";
import BpmContext from '../../context/bpmContext';
import SamplerContext from "../../context/samplerContext";
import { fire } from "../../fire";

const Play = React.memo(({ dataTracks, instrument, handleCurrentStep, src,setSrc,changeIsRecorded })  => {

    /*
     * -------------
     * CONTEXT
     * -------------
     */

    //const instContext = useContext(PlayContext);
    //const { dataBpm } = useContext(BpmContext);
    const {dataSampler, setDataSampler} = useContext(SamplerContext);
    //let chunks = [];

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

    const stopPlaying = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        setPlaying(!playing);
    };
   
    const handlePlaying = (ev) => {
        ev.preventDefault();

        const btn = ev.target;

        if(playing === false) btn.disabled = true;

        console.log(instrument, dataTracks);

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
        let firstIteration = 0;
        
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

            if (currentStep === 15 && firstIteration === 0) {
                if(isRecording) {
                    isRecording = !isRecording;
                    setTimeout(() =>{recorder.stop();}, 200);
                    btn.disabled = false;
                    //stopPlaying();
                }
            }

            //handleCurrentStep(currentStep)
            document.querySelectorAll('.sequencer__step').forEach( el => el.classList.remove("sequencer__stepcol"))
            document.querySelectorAll(`.sequencer__step:nth-child(${currentStep+1})`).forEach( el => el.classList.add("sequencer__stepcol"))

            document.querySelectorAll('.steps__row > div').forEach( el => el.classList.remove("step__active"))
            document.querySelectorAll(`.steps__row > div:nth-child(${currentStep+1})`).forEach( el => el.classList.add("step__active"))
            
            currentStep++;
            if (currentStep > 15) {
                currentStep = 0;
                firstIteration++;
            };

        },"16n");
        

        
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {
            document.querySelector('.save-patern').classList.remove("hide");
            setSrc( new Blob(chunks, { type: 'audio/wav' }) );
        };

        Tone.Transport.start();
        setPlaying(!playing);
    }

    /*
    *
    * EFFECT
    * 
    */
   
   useEffect(() => {
        console.log('stop useffect');
        Tone.Transport.stop();
        Tone.Transport.cancel();
        console.log(document.querySelectorAll(".play"));
        document.querySelectorAll(".play").forEach(el => el.disabled = false);


    if(playing === true) {
        setPlaying(!playing);
    }
    },[instrument, dataTracks, dataSampler])
    
    /*
    * -------------
    * RENDER
    * -------------
    */
    console.log("re-rendered?");
    return <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
})
export default Play;