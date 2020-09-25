import React, { useEffect, useState, useContext } from 'react';
import '../../App.scss';
import PinaoOctave from './PianoOctave'
import PianoContext from "../../context/PianoContext.js";
import Instrument from '../Instrument/Instrument';
import Play from "../../Components/Play/Play";
import * as Tone from 'tone';

export default function PianoRoll() {

  /*
  * --------
  * CONTEXT
  * --------
  */

  const {dataPiano, setDataPiano} = useContext(PianoContext);

  /*
  * --------
  * STATE
  * --------
  */

  const [octLength, setoctLength] = useState([5]);
  const [inst, setInst] = useState(new Tone.PolySynth().toDestination());

  /*
  * --------
  * EFFECTS
  * --------
  */

  // Update the local storage
  useEffect(() => {
    //console.log( dataPiano.notes);
    localStorage.setItem("Data-piano", JSON.stringify(dataPiano));
  }, [dataPiano])

  /*
  * --------
  * METHODS
  * --------
  */

  const plusOcatve = () => {
    setoctLength(old => [Math.max(...old) + 1, ...old])
  }
  const moinsOctave = () => {
    setoctLength(old => [...old, Math.min(...old) -1])
  }

  const SavePatern = (ev) => {
    ev.preventDefault();
    alert("Save patern to DB");
  }

  const handleClose = (ev) => {
    ev.preventDefault();
    alert("Save patern to DB");
  }

  /*
  * --------
  * RENDER
  * --------
  */
  
  return (
    <div class="box">
      <div className="box__bar">
        <div className="box__title">Sequencer</div>
        <button className="box__close" onClick={handleClose}>X</button>
      </div>
      <div className="box__content">
        <div className="Roll">
          <button className="plusBtn" onClick={() => plusOcatve()}>Octave supp</button>
          <button className="moinsBtn" onClick={() => moinsOctave()}>Octave inf</button>

          {octLength.map((item, index) =>
            <PinaoOctave key={index} octave={item} dataPiano={dataPiano} setDataPiano={setDataPiano}/>
          )}
          
          <div className="piano__controls">
            <form onSubmit={SavePatern}>
              <input className="roll-patern-title" />
              <button className="roll-save-patern">Enregistrer</button>
            </form>
            <Play dataTracks={dataPiano} instrument={inst} />
          </div>

        </div>
      </div>
    </div>
  );
}
