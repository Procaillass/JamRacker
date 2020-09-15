import React from 'react';
import './App.scss';
import StepSequencer from './Components/StepSequencer/StepSequencer'

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
        <select className="header_select">
          <option selected>Home</option>
          <option>Sequencer</option>
          <option>Playlist</option> 
        </select>
      </header>

      <main>
        <>
        <StepSequencer/>
        {/* Route et composant */}
        </>
      </main>
    </div>
  );
}

export default App;
