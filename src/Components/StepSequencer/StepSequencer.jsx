import React, { useState, useCallback, useEffect, useRef } from "react";
import "./StepSequencer.scss";
import * as Tone from 'tone';

import kick from "../../Assets/Sounds/kick.wav";
import clap from "../../Assets/Sounds/clap.wav";
import hat from "../../Assets/Sounds/hat.wav"; // voir les sons dans tone



Tone.Transport.bpm.value = 100; // remplacer la value par une variable qui vient du parent (contexte)
const drums = new Tone.Sampler({ //ici pour l'ajout d'un nouveau son =>push ",f0 : nomdelinstrument" dans cet objet
  c0: kick,
  d0: clap,
  e0: hat
}).toMaster();
const synth = new Tone.PolySynth().toMaster();
const trackIndex = ["c0", "d0", "e0"]; //tableau de l'index des sons, les prochains : f0, g0 etc en rapport avec la const drums
// (peut-être générer le tableau en fonction des propriétés de drums)
const sounds = ["Kick", "Clap", "Hat", "synth"]; //Tableau des sons, push ici le nom d'un son => ajoute une piste automatiquement
const generateSteps = () => Array.from({ length: 16 }, () => 0); //taille de la longueur des pistes (remplacer 16 en fonction d'une taille variable)
const initialTracks = sounds.map((t) => ({
  name: t,
  steps: generateSteps()
}));




function StepSequencer() {
  const [playing, setPlaying] = useState(false); //lancement des pistes sur faux
  const [tracks, setTracks] = useState(initialTracks);
  const [colIndex, setColIndex] = useState(0);

  const stepIndex = useRef(0);
  useEffect(() => {
    if (playing) {
      Tone.Transport.start(); //lance les pistes
    } else {
      Tone.Transport.stop(); //arrête les pistes
    }
  }, [playing]);
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
            drums.triggerAttack(trackIndex[index]);
          }
        }
      });
      setColIndex(stepIndex.current);
      stepIndex.current = (stepIndex.current + 1) % 16;
    }, "16n");
  }, [tracks]);

  const handlePlaying = () => {
    setPlaying((playing) => !playing);
  };
  const updateStep = useCallback(
    (trackIndex, stepIndex) => {
      const newTracks = [...tracks];

      newTracks[trackIndex].steps[stepIndex] =
        newTracks[trackIndex].steps[stepIndex] === 0 ? 1 : 0;
      setTracks(newTracks);
    },
    [tracks, setTracks]
  );
  return (
    
      <div className="sequencer">

        {tracks.map((track, trackIndex) => (
          <div className="row" key={track.name}>
            <div className="trackName">{track.name}</div>
            <div className="track">
              {track.steps.map((s, stepIdx) => (
                <div
                  key={stepIdx}
                  className={`step ${s ? "marked" : ""} ${
                    stepIdx === colIndex ? "col" : ""
                  }`}
                  onClick={() => updateStep(trackIndex, stepIdx)}
                />
              ))}
            </div>
          </div>
        ))}

        <button onClick={handlePlaying}>{playing ? "stop" : "play"}</button>

      </div>
      
    
  );
}

export default StepSequencer;