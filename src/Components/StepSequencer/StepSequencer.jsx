import React, { useState, useEffect, useRef, useContext } from "react";
import "./StepSequencer.scss";
import * as Tone from 'tone';

import kick from "../../Assets/Sounds/kick.wav";
import clap from "../../Assets/Sounds/clap.wav";
import hat from "../../Assets/Sounds/hat.wav"; // voir les sons dans tone
import BpmContext from "../../context/bpmContext";

function StepSequencer() {

  /*
   * -------------
   * METHODS
   * -------------
   */
  
   const generateSteps = (stepsNum = 16) => Array.from({ length: stepsNum }, () => 0);

  // ACTIVE / DEACTIVE STEPS
  const updateStep = (trackIdx, stepIdx) => {
    Tone.context.resume(); // deal with "The AudioContext was not allowed to start."
    const newTracks = [...tracks];
    newTracks[trackIdx].steps[stepIdx] = newTracks[trackIdx].steps[stepIdx] === 0 ? 1 : 0;
    setTracks(newTracks);
  };

  const trackToSample = (tracks) => {

    const newTracks = tracks
      .filter((el) => el.type === "sampler")
      .map((el) => [el.index, el.sound]);

    return Object.fromEntries(newTracks);
  }

  /*
   * -------------
   * CONTEXT
   * -------------
   */
  
  const bpmContext = useContext(BpmContext);
  const bpm = bpmContext.dataBpm.bpm;

  /*
  * -------------
  * STATES
  * -------------
  */

  const [playing, setPlaying] = useState(false);
  const [colIndex, setColIndex] = useState(0);
  const [steps, setSteps] = useState(16);
  const [tracks, setTracks] = useState([
    {
      index: "d0",
      name: "clap",
      sound: clap,
      type: "sampler",
      duration: 0,
      steps: generateSteps(steps)
    },
    {
      index: "e0",
      name: "hat",
      sound: hat,
      type: "sampler",
      duration: 0,
      steps: generateSteps(steps)
    },
  ]);
  const [sampler, setSampler] = useState(new Tone.Sampler(trackToSample(tracks)).toDestination());

  /*
   * -------------
   * REFS
   * -------------
   */

  const stepIndex = useRef(0);
  const stepsFld = useRef(steps);

  /*
   * -------------
   * HANDLERS
   * -------------
   */
  
   const handlePlaying = () => {
    setPlaying((playing) => !playing);
  };

  const handleAddTrack = (ev) => {
    ev.preventDefault();
    const newTrack = {
      index: "c0",
      name: "kick",
      sound: kick,
      type: "sampler",
      duration: 0,
      steps: generateSteps(steps)
    };
    setTracks([...tracks, newTrack]);
    sampler.add("c0", kick);
  };

  const handleSteps = (ev) => {
    ev.preventDefault();
    setSteps(stepsFld.current.value);
  };

  const handleClose = (ev) => {
    ev.preventDefault();
    alert("close");
  };

  const handleRemoveTrack = (id) => {
    setTracks(tracks.filter((track) => track.index !== id));
  }

  /*
   * -------------
   * EFFECTS
   * -------------
   */
      
   // BPM
   useEffect(() => {
    if(bpm){
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);
  

  // START / STOP PLAYING
  useEffect(() => {
    if (playing) { Tone.Transport.start(); }
    else { Tone.Transport.stop(); }
  }, [playing]);


  //
  /* useEffect(() => {
    console.log("did mount");
    console.log(sampler);
  }, []) */


  //
  useEffect(() => {
    setTracks([...tracks].map(el => ({...el, steps: generateSteps(steps)})));
  }, [steps])


  //
  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat((time) => {
      tracks.forEach((track, index) => {
        const step = track.steps[stepIndex.current];
        if (step === 1) {
            //myDrums.triggerAttack(tracks[index].index);
            //synth.triggerAttackRelease(["a#3", "d4", "g4"], 0.5);
            sampler.triggerAttackRelease(tracks[index].index, track.duration);
        }
      });
      setColIndex(stepIndex.current);
      stepIndex.current = (stepIndex.current + 1) % steps;
    }, steps+"n");
  }, [tracks]);

  /*
  * -------------
  * RENDER
  * -------------
  */
  return (
    
      <div className="box sequencer">

        <div className="box__bar">
          <button className="box__close" onClick={handleClose}>X</button>
        </div>

        <div className="box__content">

        <label>{steps}</label>
        <input className="box__stepsrange" type="range" min="4" max="64" step="4" ref={stepsFld} onChange={handleSteps} value={steps} />

        {tracks.map((track, trackIdx) => (
          <div className="sequencer__row" key={trackIdx+"_"+track.name}>
            <div className="sequencer__sound">
              <button className="btn__removeTrack" onClick={() => {if(window.confirm('Are you sure you want to delete the track ?')){handleRemoveTrack(track.index)}}}>Remove sound</button>
              <span>{track.name}</span>
            </div>
            <div className="sequencer__track">
              {track.steps.map((step, stepIdx) => (
                <div
                  key={stepIdx}
                  className={`sequencer__step ${step ? "sequencer__stepmarked" : ""} ${
                    stepIdx === colIndex ? "sequencer__stepcol" : ""
                  }`}
                  onClick={() => updateStep(trackIdx, stepIdx)}
                />
              ))}
            </div>
          </div>
        ))}
        
        <div className="sequencer__controls">
          <button className="sequencer__addtrack" onClick={handleAddTrack}>Add a track</button>
          <button className="sequencer__play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
        </div>

        </div>

      </div>
      
    
  );
}

export default StepSequencer;