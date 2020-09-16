import React from 'react';
import '../../App.scss';
import PinaoOctave from './PianoOctave'

export default function PianoRoll() {

  let octave = 4

  return (
    <div className="Roll">
      <PinaoOctave octave={octave+1} />
      <PinaoOctave octave={octave}/>
      {/* <PinaoOctave octave={octave -1 }/> */}
    </div>
  );
}


