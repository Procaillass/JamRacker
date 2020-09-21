import React, { useState } from 'react';
import './App.scss';
import StepSequencer from './Components/StepSequencer/StepSequencer';
import Sampler from './Components/Sampler/Sampler';
/**Context for sequencer */
import {BpmProvider} from './context/bpmContext';
import {InstrumentProvider} from './context/instrumentContext';
import {StepSeqProvider} from './context/stepSequencerContext';

function App() {

  /*
   * -------------
   * METHODS
   * -------------
   */
  // REFACTORER EN HELPER OU HOOK CAR REPETE
   const generateSteps = (stepsNum = 16) => Array.from({ length: stepsNum }, () => 0);

  /**State BPM */
  const [dataBpm, setDataBpm] = useState({bpm:100});
  const [dataInstrument, setDataInstrument] = useState("");
  const [dataStepSeq, setdataStepSeq] = useState({

    stepsNum: 16,
    
    notes: [
    { name: "A0" }, { name: "B0" },
    { name: "C1" }, { name: "D1" }, { name: "E1" }, { name: "F1" }, { name: "G1" }, { name: "A1" }, { name: "B1" },
    { name: "C2" }, { name: "D2" }, { name: "E2" }, { name: "F2" }, { name: "G2" }, { name: "A2" }, { name: "B2" },
    { name: "C3" }, { name: "D3" }, { name: "E3" }, { name: "F3" }, { name: "G3" }, { name: "A3" }, { name: "B3" },
    { name: "C4" }, { name: "D4" }, { name: "E4" }, { name: "F4" }, { name: "G4" }, { name: "A4" }, { name: "B4" },
    { name: "C5" }, { name: "D5" }, { name: "E5" }, { name: "F5" }, { name: "G5" }, { name: "A5" }, { name: "B5" },
    { name: "C6" }, { name: "D6" }, { name: "E6" }, { name: "F6" }, { name: "G6" }, { name: "A6" }, { name: "B6" },
    { name: "C7" }, { name: "D7" }, { name: "E7" }, { name: "F7" }, { name: "G7" }, { name: "A7" }, { name: "B7" },
    { name: "C8" }
  ],

  tracks: [
    {
      name: "A0",
      duration: 0,
      steps: generateSteps(16)
    },
    {
      name: "D7",
      duration: 0,
      steps: generateSteps(16)
    },
  ],
});

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
      <StepSeqProvider value={{dataStepSeq, setdataStepSeq}}>
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
        </StepSeqProvider>
        </InstrumentProvider>
    </BpmProvider>
  );
}

export default App;
