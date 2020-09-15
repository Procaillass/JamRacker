import React, { useState, useCallback, useEffect, useRef } from "react";
import "./StepSequencer.scss";
import * as Tone from 'tone';

Tone.Transport.bpm.value = 100;
const drums = new Tone.Sampler({
  c0: "kick.wav",
  d0: "clap.wav",
  e0: "hat.wav"
}).toMaster();
const synth = new Tone.PolySynth().toMaster();
const trackIndex = ["c0", "d0", "e0"];
const sounds = ["Kick", "Clap", "Hat", "synth"];
const generateSteps = () => Array.from({ length: 16 }, () => 0);
const initialTracks = sounds.map((t) => ({
  name: t,
  steps: generateSteps()
}));




function StepSequencer() {
  const [playing, setPlaying] = useState(false);
  const [tracks, setTracks] = useState(initialTracks);
  const [colIndex, setColIndex] = useState(0);

  const stepIndex = useRef(0);
  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
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
    <div className="App">
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
      </div>
      <button onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
    </div>
  );
}

export default StepSequencer;