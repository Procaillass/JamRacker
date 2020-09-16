import React from 'react';
import './App.scss';
import PianoRoll from './components/PianoRoll/PianoRoll'

function App() {



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
        <div className="piano_global">
          <PianoRoll />
          
        </div>       
      </main>
    </div>
  );
}

export default App;
