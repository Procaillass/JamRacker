import React, { useState } from 'react';
import './App.scss';
import StepSequencer from './Components/StepSequencer/StepSequencer';
import Sampler from './Components/Sampler/Sampler';
/**Context for sequencer */
import {BpmProvider} from './context/bpmContext';
import {InstrumentProvider} from './context/instrumentContext';

function App() {
  /**State BPM */
  const [dataBpm, setDataBpm] = useState({bpm:100});
  const [dataInstrument, setDataInstrument] = useState("");

  //Récupération du bpm lors du changement du range
  const handleBPM = (event) => {
    const bpm = event.target.value
    setDataBpm({
      bpm
    })
  }
  return (
    <BpmProvider value={{dataBpm}}>
      <InstrumentProvider value={{dataInstrument, setDataInstrument}}>
      <div className="App">
        <header className="header">
          <button className="header_play-button"><i className="fas fa-play"></i></button>
          <div className="header_bpm-container">
            <p>BPM:</p>
              <label>{dataBpm.bpm}</label>
              <input name="bpm" min="1" max="200" type="range" onChange={handleBPM}/>
          </div>
          <div className="header_patern-container">
            <p>Patern:</p>
            <input defaultValue="1" min="1" max="300" type="number"></input>
          </div>
          <select className="header_select">
            <option selected>Home</option>
            <option>Sequencer</option>
            <option>Playlist</option> 
          </select>
        </header>

        <main>
          <>
          {/* <Pattern/> ici => objet contenant les pattern */}
          <StepSequencer/>

         
          <Sampler/>
          {/* Route et composant */}
          </>
        </main>
        </div>
        </InstrumentProvider>
    </BpmProvider>
  );
}

export default App;
