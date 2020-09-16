import React from 'react';
import '../../App.scss';
import * as Tone from 'tone'
import { Loop } from 'tone';

export default function PianoRoll(props) {

  const synth = new Tone.Synth().toDestination()

  const note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  // note.reverse()
  const notes = []
  let octave = props.octave
  let nbColumn = 50


  
  function loop(octave) {
    for (let i = 0; i < 1 ; i++) {
      note.map(item => {
        notes.push(item + i + octave)
      })
    }
    notes.reverse()
  }
  
  loop(octave)
  

  
  var mouse_IsDown = false;
  document.documentElement.addEventListener("mousedown", function () {
    mouse_IsDown = true;
  });
  document.documentElement.addEventListener("mouseup", function () {
    mouse_IsDown = false;
  });

  function playNote(note, e) {
    synth.triggerAttackRelease(note, "8n")
    console.log(e.target)
    if(e.target.classList.contains('test')){
      e.target.classList.remove('test')
      
    }else{
      e.target.classList.add('test')
     
    }
    
  
  }

  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values()
    for (let device of devices) {
      console.log(device);
      device.onmidimessage = OnMidiMessage
    }
    console.log(access)
  })

  function OnMidiMessage(message) {
    console.log(message);
  }



  return (
      <div className="borad">
        <div className="piano-container" id="keyboard">
          
          {
            notes.map((item, index) => {
              if (item.includes("#")) {
                return (
                  <div onClick={(e) => playNote(item,e)} key={index} value={item } className="black key"></div>
                )
              }
              else {
                return (
                  <div onClick={(e) => playNote(item,e)} key={index} value={item } className="white key"></div>
                )
              }
            })
          }
        </div>
        
        <div className="roles-containter">
          {notes.map((item, index) => {
            if(item.includes('#')){
              return(
                <div  onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-black"></div>
              )
            }
            else{
              return(
                <div onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-white"></div>
              )
            }
          })}
        </div>
          

        <div className="roles-containter">
          {notes.map((item, index) => {
            if(item.includes('#')){
              return(
                <div  onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-black"></div>
              )
            }
            else{
              return(
                <div onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-white"></div>
              )
            }
          })}
        </div>

        <div className="roles-containter">
          {notes.map((item, index) => {
            if(item.includes('#')){
              return(
                <div  onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-black"></div>
              )
            }
            else{
              return(
                <div onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-white"></div>
              )
            }
          })}
        </div>

        <div className="roles-containter">
          {notes.map((item, index) => {
            if(item.includes('#')){
              return(
                <div  onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-black"></div>
              )
            }
            else{
              return(
                <div onClick={(e) => playNote(item,e)} key={index} value={item } className="grid-item-white"></div>
              )
            }
          })}
        </div>
        
      </div>
     

  );
}


