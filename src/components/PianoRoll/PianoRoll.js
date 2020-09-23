import React, { useEffect, useState, useContext } from 'react';
import '../../App.scss';
import PinaoOctave from './PianoOctave'
import PianoContext from "../../context/PianoContext.js";

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

  /*
  * --------
  * RENDER
  * --------
  */
  
  return (
    <div className="Roll">
      <button className="plusBtn" onClick={() => plusOcatve()}>Octave supp</button>
      <button className="moinsBtn" onClick={() => moinsOctave()}>Octave inf</button>

      {octLength.map((item, index) =>
        <PinaoOctave key={index} octave={item} dataPiano={dataPiano} setDataPiano={setDataPiano}/>
      )}

    </div>
  );
}