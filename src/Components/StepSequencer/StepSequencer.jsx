import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import "./StepSequencer.scss";
import * as Tone from 'tone';

import kick from "../../Assets/Sounds/kick.wav";
import clap from "../../Assets/Sounds/clap.wav";
import hat from "../../Assets/Sounds/hat.wav"; // voir les sons dans tone
import BpmContext from "../../context/bpmContext";
import { Sampler } from "tone";

function StepSequencer() {

  //Récuperation du contexte et du BPM
  const bpmContext = useContext(BpmContext);
  //Récupération du BPM
  const bpm = bpmContext.dataBpm.bpm;

  let drums2 = new Tone.Sampler();


// Ici pour l'ajout d'un nouveau son =>push "f0 : nomdelinstrument" dans cet objet
const drums = new Tone.Sampler({ 
  c0: kick,
  d0: clap,
  e0: hat
}).toDestination();
const synth = new Tone.PolySynth().toDestination();


// Tableau de l'index des sons, les prochains : f0, g0 etc en rapport avec la const drums
const trackIndex = ["c0", "d0", "e0"]; 

// Tableau des sons, push ici le nom d'un son => ajoute une piste automatiquement
const sounds = ["Kick", "Clap", "Hat", "synth"];

// Taille de la longueur des pistes (remplacer 16 en fonction d'une taille variable)
const generateSteps = () => Array.from({ length: 16 }, () => 0);

// tracks de départ
const initialTracks = sounds.map((t) => ({
  name: t,
  steps: generateSteps()
}));

  //
  // STATES
  //

  const [playing, setPlaying] = useState(false); //lancement des pistes sur faux
  const [tracks, setTracks] = useState(initialTracks);
  const [colIndex, setColIndex] = useState(0);
  const [data, setData] = useState([
    {
      index: "c0",
      name: "kick",
      sound: kick,
      type: "sampler"
    },
    {
      index: "d0",
      name: "clap",
      sound: clap,
      type: "sampler"
    },
    {
      index: "e0",
      name: "hat",
      sound: hat,
      type: "sampler"
    },
    {
      index: null,
      name: "synth",
      sound: null,
      type: "polySynth"
    },
  ])
  const [test, setTest] = useState({})


  //
  // REFS
  //

  const stepIndex = useRef(0);

  //
  // EFFECTS

  useEffect(() =>{
      data.map((drum) => () =>{
          if(drum.type === "sampler"){
            const idDrum = drum.index;
            const sound = drum.sound;
            setTest(new Tone.Sampler({idDrum: sound}))
            
          }
        });
        
      } , [data])

console.log("test",test)
   //UseEffect du BPM
   useEffect(() => {
    if(bpm){
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);
  
  // Se lance à chaque fois que le state "playing" est updaté
  useEffect(() => {
    if (playing) {
      Tone.Transport.start(); //lance les pistes
    } else {
      Tone.Transport.stop(); //arrête les pistes
    }
  }, [playing]);

  // Se lance à chaque fois que le state "tracks" est updaté
  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat((time) => {
      tracks.forEach((track, index) => {
        const step = track.steps[stepIndex.current];
        if (step === 1) {
          if (index === 3) {
            let chord =
              stepIndex.current < 7 ? ["c4", "d#4", "g4"] : ["a#3", "d4", "g4"];
            synth.triggerAttackRelease(chord, 0.5);
          } else {
            test.triggerAttack(trackIndex[index]);
          }
        }
      });
      setColIndex(stepIndex.current);
      stepIndex.current = (stepIndex.current + 1) % 16;
    }, "16n");
  }, [tracks]);

  console.log("drum",drums);
  console.log("drum2",drums2);
  // Se lance quand l'utilisateur clique sur play
  const handlePlaying = () => {
    setPlaying((playing) => !playing);
  };

  // Se lance quand l'utilisateur clique sur un step
  // React re-render le composant à chaque update du state.
  // useCallback permet de retourner la même instance d'une fonction au re-render
  // et de rafraichir quand lorsque les dépendances changent (ici tracks et setTracks)
  const updateStep = useCallback(
    (trackIndex, stepIndex) => {
      Tone.context.resume(); // Ajouter par Mathieu, pour eviter "The AudioContext was not allowed to start."
      const newTracks = [...tracks];

      newTracks[trackIndex].steps[stepIndex] =
        newTracks[trackIndex].steps[stepIndex] === 0 ? 1 : 0;
      setTracks(newTracks);
    },
    [tracks, setTracks]
  );

  const handleAddSound = (ev) => {
    ev.preventDefault();
    alert("addsound");
  };

  const handleClose = (ev) => {
    ev.preventDefault();
    alert("close");
  };

  //
  // RENDER
  //

  return (
    
      <div className="box sequencer">

        <div className="box__bar">
          <button className="box__close" onClick={handleClose}>X</button>
        </div>

        <div className="box__content">

        {tracks.map((track, trackIndex) => (
          <div className="sequencer__row" key={track.name}>
            <div className="sequencer__sound">{track.name}</div>
            <div className="sequencer__track">
              {track.steps.map((s, stepIndex) => (
                <div
                  key={stepIndex}
                  className={`sequencer__step ${s ? "sequencer__stepmarked" : ""} ${
                    stepIndex === colIndex ? "sequencer__stepcol" : ""
                  }`}
                  onClick={() => updateStep(trackIndex, stepIndex)}
                />
              ))}
            </div>
          </div>
        ))}
        
        <div className="sequencer__controls">
          <button className="sequencer__addsound" onClick={handleAddSound}>Add a sound</button>
          <button className="sequencer__play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
        </div>

        </div>

      </div>
      
    
  );
}

export default StepSequencer;