import React, { useState, useEffect, useRef, useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link ,useHistory} from "react-router-dom";
import * as Tone from 'tone';

import Instrument from '../../Components/Instrument/Instrument';
import Play from "../../Components/Play/Play";

import BpmContext from "../../context/bpmContext";
import StepSeqContext from "../../context/stepSequencerContext";
import instrumentContext from "../../context/instrumentContext";
import {db,fire} from "../../fire"

function StepSequencer() {

  /*
   * -------------
   * METHODS
   * -------------
   */

  // Il faut qu'il y ai la gestion des 1
  const generateSteps = (stepsNum = 16) => Array.from({ length: stepsNum }, () => 0);

  // ACTIVE / DEACTIVE STEPS
  const updateStep = (trackIdx, stepIdx, trackNote) => {
    Tone.context.resume();
    const newTracks = [...tracks];
    if(trackNote !== null){
      const newNotes = dataTracks.notes.push(
        {
          name:trackNote,
          duration: 0.2,
          time: (60 / bpm) * stepIdx,
          steps:stepIdx
        }
      )
      setDataTracks({...dataTracks, newNotes});
    }
    newTracks[trackIdx].steps[stepIdx] = newTracks[trackIdx].steps[stepIdx] === 0 ? 1 : 0;
    setdataStepSeq({ ...dataStepSeq, tracks: newTracks });
    dataInstrument.triggerAttackRelease(trackNote, 0.2);
  };

  /*
   * -------------
   * CONTEXT
   * -------------
   */

  const bpmContext = useContext(BpmContext);
  const bpm = bpmContext.dataBpm.bpm;

  const { dataStepSeq, setdataStepSeq } = useContext(StepSeqContext);
  const { dataTracks, setDataTracks } = useContext(StepSeqContext);
  const notesList = dataStepSeq.notesList;
  const tracks = Array.isArray(dataStepSeq.tracks) && dataStepSeq.tracks.length ? dataStepSeq.tracks : [];
  const steps = dataStepSeq.stepsNum;

  const {dataInstrument, setDataInstrument} = useContext(instrumentContext);

  /*
  * -------------
  * STATES
  * -------------
  */
  const history = useHistory();
  const [src,setSrc] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecorded,setIsRecorded] = useState(false);

  /*
   * -------------
   * REFS
   * -------------
   */

  //const currentStep = useRef(0);
  const stepsFld = useRef(steps);
  const titleSequencer = useRef();

  /*
   * -------------
   * HANDLERS
   * -------------
   */

  const handleAddTrack = (ev) => {
    ev.preventDefault();
    if (ev.target.value !== "") {
      const note = ev.target.value;
      const newTrack = { name: note, duration: 0.2, steps: generateSteps(steps) };
      setdataStepSeq({ ...dataStepSeq, tracks: [...dataStepSeq.tracks, newTrack] });
    }
    ev.target.value = "";
  };

  const handleSteps = (ev) => {
    ev.preventDefault();
    setdataStepSeq({ ...dataStepSeq, stepsNum: stepsFld.current.value });
  };

  const handleClose = (ev) => {
    ev.preventDefault();
    //alert("close");
  };

  const handleRemoveTrack = (name) => {
    setdataStepSeq({ ...dataStepSeq, tracks: tracks.filter((track) => track.name !== name) });
  }

  const handleCurrentStep = (newCurrentStep) => {
    setCurrentStep(newCurrentStep);
  }

  const changeIsRecorded = () => {
    setIsRecorded(true);
    
  }

  const SaveSequencer = (e) => {
    e.preventDefault();
    
    const titleValue = titleSequencer.current.value
    if (localStorage.getItem("pseudo")) {
      if(titleValue !== ""){

        // // envoie dans le storage .wav
        const storageRef = fire.storage().ref()
        storageRef.child(titleValue).put(src)
        setSrc(dataTracks.notes);
  
        db.collection("Tracks").doc(titleValue).set({
          title: titleValue,
          author: JSON.parse(localStorage.getItem("pseudo")),
          source: " Step Sequenceur ",
          notes: dataTracks.notes
        })
      }else{
        alert("oops il manque un titre a votre piste !!!")
        return
      }
    }
    else {
      alert("Vous devez être connecté pour enregistrer");
      history.push("/login");
    }
    console.log("note",dataTracks.notes)
  }
  useEffect(()=>{
    
    
  },[])

  
  /*
   * -------------
   * EFFECTS
   * -------------
   */

  // BPM
  useEffect(() => {
    if (bpm) { Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);


  //
  useEffect(() => {
    const newTracks = [...tracks].map(el => ({ ...el, steps: generateSteps(steps) }));
    setdataStepSeq({ ...dataStepSeq, tracks: newTracks });
  }, [steps])

  /*
  * -------------
  * RENDER
  * -------------
  */

  return (

    <div className="box sequencer">

      <div className="box__bar">
        <div className="box__title"><h2>Sequencer</h2></div>
      </div>

      <div className="box__content">

        <div className="sequencer__grid">

        {tracks.map((track, trackIdx) => (

          <div className="sequencer__row" key={trackIdx + "_" + track.name}>
            <div className="sequencer__sound">
              <span>{track.name}</span>
            </div>
            <div data-step={steps} className="sequencer__track">
              {track.steps.map((step, stepIdx) => (
                <div
                  key={stepIdx}
                  className={`sequencer__step ${step ? "sequencer__stepmarked" : ""} ${stepIdx === currentStep ? "sequencer__stepcol" : ""
                    }`}
                  onClick={() => updateStep(trackIdx, stepIdx, track.name)}
                />
              ))}
            </div>

            <button className="sequencer__row_remove" onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer la note ?')) { handleRemoveTrack(track.name) } }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#87878a" width="24px" height="24px">
                  <path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
          </div>
        ))}

</div>
        
        <select className="button sequencer__addtrack" onChange={handleAddTrack}>
            <option value="">Ajouter une note</option>
            {notesList.map((note, index) =>
              tracks.map(el => el.name).includes(note.name) === false &&
              <option key={index + '_' + note.name} value={note.name} name={note.midi}>{note.name}</option>
            )}
          </select>




<div className="play-register-container">
  <Instrument dataTracks={dataTracks} />
  <Play  src={src} setSrc={setSrc} dataTracks={dataTracks} changeIsRecorded={changeIsRecorded} instrument={dataInstrument} handleCurrentStep={handleCurrentStep} />
  {<form onSubmit={SaveSequencer}>
    <input className="roll-patern-title" type="text" placeholder="Titre de la séquence" ref={titleSequencer} />
    <button className="roll-save-patern" disabled={!isRecorded}>Enregistrer</button>
  </form>}
</div>
        
      </div>

    </div>


  );
}

export default StepSequencer;