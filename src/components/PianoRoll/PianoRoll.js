import React, { useEffect, useState } from 'react';
import '../../App.scss';
import PinaoOctave from './PianoOctave'

export default function PianoRoll() {

  //let octave = 4
  /* let plusBtn = 4
  let MoinsBtn = 4 */
  
  /* let [plusBtn, setplusBtn] = useState(4)
  const [MoinsBtn, setMoinsBtn] = useState(4) */
  const [savedNotes, setSavedNotes] = useState(localStorage.getItem('savedNote') ? JSON.parse(localStorage.getItem('savedNote')) : [])
  const [octLength, setoctLength] = useState([5])

  useEffect(() => {
    // setoctLength(octLength.reverse())
    //console.log(octLength);
  })

  const plusOcatve = () => {
    //setOctLenght(old => )
    setoctLength(old => [Math.max(...old) + 1, ...old])
    
    //console.log(octLength)
  }
  const moinsOctave = () => {
    setoctLength(old => [...old, Math.min(...old) -1])
    
    //console.log(octLength)
  }
  
  return (
    <div className="Roll">
      <button onClick={() => plusOcatve()}>+</button>
      <button onClick={() => moinsOctave()}>-</button>
      {/* <PinaoOctave octave={octave -1 }/> */}

      {octLength.map((item, index) => {
        return(
          <PinaoOctave key={index} octave={item} savedNotes={savedNotes} setSavedNotes={setSavedNotes}/>
        )
      })}

    </div>
  );
}