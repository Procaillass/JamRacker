import React from 'react';
import './App.scss';
import * as Tone from 'tone'

function App() {

  const synth = new Tone.Synth().toDestination()

  const note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  // note.reverse()
  const notes = []


  function loop() {
    for (let i = 0; i < 11; i++) {
      note.map(item => {
        notes.push(item + i)
      })
    }
    notes.reverse()
  }

  loop()

  function playNote(note) {
    synth.triggerAttackRelease(note, "8n")
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
    <div className="App">

      <header className="header">
        <button className="header_play-button"><i className="fas fa-play"></i></button>
        <div className="header_bpm-container">
          <p>BPM:</p>
          <input defaultValue="1" min="1" type="number"></input>
        </div>
        <div className="header_patern-container">
          <p>Patern:</p>
          <input defaultValue="1" min="1" type="number"></input>
        </div>
        <nav className="header_nav">
          <ul className="header_nav-list">
            <li title="Step Sequencer"><i className="fas fa-th-list"></i></li>
            <li title="Tracker"><i className="fas fa-list-ol"></i></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="piano-container">
          {
            notes.map((item, index) => {
              if (item.includes("#")) {
                return (
                  <button onClick={() => playNote(item)} key={index} value={item} className="black"></button>
                )
              }
              else {
                return (
                  <button onClick={() => playNote(item)} key={index} value={item} className="white"></button>
                )
              }
            })
          }
        </div>
        <div className="roles-containter">
          {notes.map(item => {
            if(item.includes('#')){
              return(
                <div className="grid-item-black"></div>
              )
            }
            else{
              return(
                <div className="grid-item-white"></div>
              )
            }
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
