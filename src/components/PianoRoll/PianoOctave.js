import React, { useEffect, useState, useContext } from 'react';
import '../../App.scss';
import * as Tone from 'tone'
//import { Loop } from 'tone';
import MusicalNotesContext from "../../context/MusicalNotesContext.js";

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
  * PROPS
  * --------
  */
  
  const octave = props.octave;
  const notes = [...musicalNotes].filter( el => el.name.includes(octave)).reverse();
  
  const dataPiano = props.dataPiano;
  const dataPianoNotes = props.dataPiano.notes;

  /*
  * --------
  * METHODS
  * --------
  */

  const noteMidiCompare = (note) => {
    const myNote = musicalNotes.filter(el => el.name === note);
    return myNote[0].midi;
  }

  const generateActiveClass = (note, col) => {
    const currentActive = [...dataPianoNotes].find( el => el.name === note && el.step === col );
    if( currentActive !== undefined) return 'test';
  }

  const playNote = (note, col) =>  {

    // Jouer la note
    synth.triggerAttackRelease(note, "8n")

    // Chercher si la note existe (donc active)
    const currentActive = [...dataPianoNotes].find( el => el.name === note && el.step === col );
    
    // Si la note existe, retirer la note
    if( currentActive !== undefined) {
      const newNotes = [...dataPianoNotes].filter(item => item.name !== note || item.step !== col);
      props.setDataPiano({...dataPiano, notes: [...newNotes]});
    
    // Sinon, ajouter la note
    } else {
      const newNotes = [...dataPianoNotes, {
          name: note,
          midi: noteMidiCompare(note),
          step: col,
          time: 0,
          velocity: 1,
          duration: 0.2
      }]
      props.setDataPiano({...dataPiano, notes: [...newNotes]});
    }
  }

  /*
  * --------
  * RENDER
  * --------
  */

  return (
    <div className="board">
      
      <div className="clavier-container" id="keyboard">
        { notes.map((note, index) =>
          <div
            onClick={() => synth.triggerAttackRelease(note.name, "8n")}
            key={`${index}_keyboard`}
            className={("key", note.name.includes('#') ? "black" : "white")}>
              { note.name.includes('C') && note.name }
          </div>
        )}
      </div>

      <section className="piano-containter">
        {notes.map( note =>
          <section className={note.name.includes('#') ? "piano_grid black" : "piano_grid white"}>
            {steps.map((step, index) =>
              <div
                data-note={note.name}
                data-id={index}
                onClick={(ev) => playNote(note.name, index)}
                key={index}
                className={generateActiveClass(note.name, index)}>
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
}

// Pourquoi React.memo ?
export default PianoRoll