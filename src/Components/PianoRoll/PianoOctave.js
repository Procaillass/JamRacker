import React, { useContext, useState } from 'react';
import '../../App.scss';
import * as Tone from 'tone'
//import { Loop } from 'tone';
import MusicalNotesContext from "../../context/MusicalNotesContext.js";
import classNames from 'classnames';

function PianoRoll(props) {

  /*
  * --------
  * SYNTH
  * --------
  */
  
  const synth = new Tone.Synth().toDestination();

  /*
  * --------
  * CONST
  * --------
  */

  const steps = Array.from({ length: 16 }, () => 0);

  /*
  * --------
  * CONTEXTS
  * --------
  */

  const musicalNotes = useContext(MusicalNotesContext);

  /*
  * --------
  * STATE
  * --------
  */

  const initShowOctave = props.octave === 5 ? true : false;
  const [showOctave, setShowOctave] = useState(initShowOctave);

  /*
  * --------
  * PROPS
  * --------
  */
  
  const octave = props.octave;
  const notes = [...musicalNotes].filter( el => el.name.includes(octave)).reverse();
  
  const dataPiano = props.dataPiano;
  const dataPianoNotes = props.dataPiano.notes;

  const instrument = props.instrument;

  /*
  * --------
  * METHODS
  * --------
  */

  const playKeybord = (ev, note) => {
    ev.preventDefault();
    console.log(instrument);
    instrument.triggerAttackRelease(note, "8n")
  }

  const noteMidiCompare = (note) => {
    const myNote = musicalNotes.filter(el => el.name === note);
    return myNote[0].midi;
  }

  const generateActiveClass = (note, col) => {
    const currentActive = [...dataPianoNotes].find( el => el.name === note && el.steps === col );
    if( currentActive !== undefined) return `test`;
  }

  const generateActiveStyles = (note, col) => {
    const currentActive = [...dataPianoNotes].find( el => el.name === note && el.steps === col );
    const styles = {gridColumnStart: col+1, gridRow: 1}
    if( currentActive !== undefined)  styles.gridColumnEnd = `span ${currentActive.stepNum}`;
    return styles;
  }

  const playNote = (ev, note, col) =>  {

    Tone.context.resume();

    if(ev.target.classList.contains("piano-modify-duration")) return;

    // Jouer la note
    instrument.triggerAttackRelease(note, "8n")

    // Chercher si la note existe (donc active)
    const currentActive = [...dataPianoNotes].find( el => el.name === note && el.steps === col );
    
    // Si la note existe, retirer la note
    if( currentActive !== undefined) {
      const newNotes = [...dataPianoNotes].filter(item => item.name !== note || item.steps !== col);
      props.setDataPiano({...dataPiano, notes: [...newNotes]});
    
    // Sinon, ajouter la note
    } else {
      const newNotes = [...dataPianoNotes, {
          name: note,
          // midi: noteMidiCompare(note),
          steps: col,
          stepNum: 1,
          time: 0,
          velocity: 1,
          duration: 0.2
      }]
      props.setDataPiano({...dataPiano, notes: [...newNotes]});
    }
  }

  const modifyDuration = (ev, note, col, modifier) => {

    // Recupère la note donc active
    const currentNote = [...dataPianoNotes].find( el => el.name === note && el.steps === col );
    // Recupère l'index de la active
    const currentNoteIndex = [...dataPianoNotes].indexOf( currentNote );

    // Si la note existe
    if( currentNoteIndex !== -1) {
      const newNotes = [...dataPianoNotes];

      let newStepNum = newNotes[currentNoteIndex].stepNum
      if( modifier === "longer") {
        newStepNum ++;
      }
      if( modifier === "shorter" && newStepNum > 1) {
        newStepNum --;
      }
      
      instrument.triggerAttackRelease(note, newStepNum/16+"n")
      newNotes[currentNoteIndex].stepNum = newStepNum;
      newNotes[currentNoteIndex].duration = newStepNum/16+"n";
      props.setDataPiano({...dataPiano, notes: [...newNotes]});
    }
  };

  const HandleOctaveShow = (ev) => {
    ev.preventDefault();
    setShowOctave(!showOctave);
  }

  /*
  * --------
  * RENDER
  * --------
  */

  return (
    <div className="octave__accordion">
    <div className="octave__accordion__control" onClick={HandleOctaveShow}>
      <span>+</span><span>Octave {props.octave}</span>
    </div>
    <div className={classNames({
      'octave': true,
      'octave--show': showOctave
    })}>
      
      <div className="keyboard">
        { notes.map((note, index) =>
          <div
            key={`${index}_keyboard`}
            onClick={(ev) => playKeybord(ev, note.name)}
            className={note.name.includes('#') ? "key key--black" : "key key--white"}>
              { note.name }
          </div>
        )}
      </div>

      <div className="steps">
        {notes.map(( note,index) =>
          <div key={index} className={note.name.includes('#') ? "steps__row steps__row--black" : "steps__row steps__row--white"}>
            {steps.map((step, index) =>
              <div
                data-note={note.name}
                data-id={index}
                onClick={(ev) => playNote(ev, note.name, index)}
                //onWheel={(ev) => modifyDuration(ev, note.name, index)}
                key={index}
                className={generateActiveClass(note.name, index)}
                style={generateActiveStyles(note.name, index)}>
                  
                <span
                  onClick={(ev) => modifyDuration(ev, note.name, index, "shorter")}
                  className="piano-modify-duration piano-shorter-duration">
                </span>
                  
                  <span
                    onClick={(ev) => modifyDuration(ev, note.name, index, "longer")}
                    className="piano-modify-duration piano-longer-duration">
                  </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

// Pourquoi React.memo ?
export default PianoRoll