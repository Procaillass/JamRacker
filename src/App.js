import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.scss';
import * as Tone from 'tone';
/**Components*/
import StepSequencer from './Components/StepSequencer/StepSequencer';
import Sampler from './Components/Sampler/Sampler';
import Tracker from './Components/Tracker/Tracker';
import PianoRoll from './Components/PianoRoll/PianoRoll'
import MenuNav from './Components/MenuNav/MenuNav'
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
/**Context*/
import { BpmProvider } from './context/bpmContext';
import { InstrumentProvider } from './context/instrumentContext';
import { StepSeqProvider } from './context/stepSequencerContext';
import { TrackerProvider } from './context/trackerContext';
import { PianoProvider } from './context/PianoContext';
import { MusicalNotesProvider } from './context/MusicalNotesContext';
import { SamplerProvider } from './context/samplerContext';
import { DragDropProvider } from './context/dragDropContext';

function App() {

  

  /*
  *
  * Local Storage Piano Roll
  * 
  */

  const PianoLocalStorage = localStorage.getItem("Data-piano");
  const PianoLocalStorageNotes= PianoLocalStorage !== null ? JSON.parse(PianoLocalStorage).notes : [];
  const intialPiano = {
    title: "Creation sur le Piano roll",
    source: "piano-roll",
    notes: PianoLocalStorageNotes !== [] ? PianoLocalStorageNotes : []
  }
  //const intialPiano = { title: "Creation sur le Piano roll", source: "piano-roll", notes: [] }
  const [dataPiano, setDataPiano] = useState(intialPiano);

  const musicalNotes = [
    { name: "A0", midi: 21 }, { name: "A#0", midi: 22 }, { name: "B0", midi: 23 },
    { name: "C1", midi: 24 }, { name: "C#1", midi: 25 }, { name: "D1", midi: 26 }, { name: "D#1", midi: 27 }, { name: "E1", midi: 28 }, { name: "F1", midi: 29 }, { name: "F#1", midi: 30 }, { name: "G1", midi: 31 }, { name: "G#1", midi: 32 }, { name: "A1", midi: 33 }, { name: "A#1", midi: 34 }, { name: "B1", midi: 35 },
    { name: "C2", midi: 36 }, { name: "C#2", midi: 37 }, { name: "D2", midi: 38 }, { name: "D#2", midi: 39 }, { name: "E2", midi: 40 }, { name: "F2", midi: 41 }, { name: "F#2", midi: 42 }, { name: "G2", midi: 43 }, { name: "G#2", midi: 44 }, { name: "A2", midi: 45 }, { name: "A#2", midi: 46 }, { name: "B2", midi: 47 },
    { name: "C3", midi: 48 }, { name: "C#3", midi: 49 }, { name: "D3", midi: 50 }, { name: "D#3", midi: 51 }, { name: "E3", midi: 52 }, { name: "F3", midi: 53 }, { name: "F#3", midi: 54 }, { name: "G3", midi: 55 }, { name: "G#3", midi: 56 }, { name: "A3", midi: 57 }, { name: "A#3", midi: 58 }, { name: "B3", midi: 59 },
    { name: "C4", midi: 60 }, { name: "C#4", midi: 61 }, { name: "D4", midi: 62 }, { name: "D#4", midi: 63 }, { name: "E4", midi: 64 }, { name: "F4", midi: 65 }, { name: "F#4", midi: 66 }, { name: "G4", midi: 67 }, { name: "G#4", midi: 68 }, { name: "A4", midi: 69 }, { name: "A#4", midi: 70 }, { name: "B4", midi: 71 },
    { name: "C5", midi: 72 }, { name: "C#5", midi: 73 }, { name: "D5", midi: 74 }, { name: "D#5", midi: 75 }, { name: "E5", midi: 76 }, { name: "F5", midi: 77 }, { name: "F#5", midi: 78 }, { name: "G5", midi: 79 }, { name: "G#5", midi: 80 }, { name: "A5", midi: 81 }, { name: "A#5", midi: 82 }, { name: "B5", midi: 83 },
    { name: "C6", midi: 84 }, { name: "C#6", midi: 85 }, { name: "D6", midi: 86 }, { name: "D#6", midi: 87 }, { name: "E6", midi: 88 }, { name: "F6", midi: 89 }, { name: "F#6", midi: 90 }, { name: "G6", midi: 91 }, { name: "G#6", midi: 92 }, { name: "A6", midi: 93 }, { name: "A#6", midi: 94 }, { name: "B6", midi: 95 },
    { name: "C7", midi: 96 }, { name: "C#7", midi: 97 }, { name: "D7", midi: 98 }, { name: "D#7", midi: 99 }, { name: "E7", midi: 100 }, { name: "F7", midi: 101 }, { name: "F#7", midi: 102 }, { name: "G7", midi: 103 }, { name: "G#7", midi: 104 }, { name: "A7", midi: 105 }, { name: "A#7", midi: 106 }, { name: "B7", midi: 107 },
    { name: "C8", midi: 108 }, { name: "C#8", midi: 109 }
  ];

  /*
   * -------------
   * METHODS
   * -------------
   */
  // REFACTORER EN HELPER OU HOOK CAR REPETE
  const generateSteps = (stepsNum = 16) => Array.from({ length: stepsNum }, () => 0);

  // State Tracker
  const [dataTracker, setDataTracker] = useState({ volume: 100 });

  /**State*/
  const [dataBpm, setDataBpm] = useState({ bpm: 120 });
  const [dataInstrument, setDataInstrument] = useState(new Tone.Synth().toDestination());
  const [dataSampler, setDataSampler] = useState({urls: {}});
  const [dataStepSeq, setdataStepSeq] = useState({

    stepsNum: 16,

    notesList: [
      { name: "A0", midi: 21 }, { name: "A#0", midi: 22 }, { name: "B0", midi: 23 },
      { name: "C1", midi: 24 }, { name: "C#1", midi: 25 }, { name: "D1", midi: 26 }, { name: "D#1", midi: 27 }, { name: "E1", midi: 28 }, { name: "F1", midi: 29 }, { name: "F#1", midi: 30 }, { name: "G1", midi: 31 }, { name: "G#1", midi: 32 }, { name: "A1", midi: 33 }, { name: "A#1", midi: 34 }, { name: "B1", midi: 35 },
      { name: "C2", midi: 36 }, { name: "C#2", midi: 37 }, { name: "D2", midi: 38 }, { name: "D#2", midi: 39 }, { name: "E2", midi: 40 }, { name: "F2", midi: 41 }, { name: "F#2", midi: 42 }, { name: "G2", midi: 43 }, { name: "G#2", midi: 44 }, { name: "A2", midi: 45 }, { name: "A#2", midi: 46 }, { name: "B2", midi: 47 },
      { name: "C3", midi: 48 }, { name: "C#3", midi: 49 }, { name: "D3", midi: 50 }, { name: "D#3", midi: 51 }, { name: "E3", midi: 52 }, { name: "F3", midi: 53 }, { name: "F#3", midi: 54 }, { name: "G3", midi: 55 }, { name: "G#3", midi: 56 }, { name: "A3", midi: 57 }, { name: "A#3", midi: 58 }, { name: "B3", midi: 59 },
      { name: "C4", midi: 60 }, { name: "C#4", midi: 61 }, { name: "D4", midi: 62 }, { name: "D#4", midi: 63 }, { name: "E4", midi: 64 }, { name: "F4", midi: 65 }, { name: "F#4", midi: 66 }, { name: "G4", midi: 67 }, { name: "G#4", midi: 68 }, { name: "A4", midi: 69 }, { name: "A#4", midi: 70 }, { name: "B4", midi: 71 },
      { name: "C5", midi: 72 }, { name: "C#5", midi: 73 }, { name: "D5", midi: 74 }, { name: "D#5", midi: 75 }, { name: "E5", midi: 76 }, { name: "F5", midi: 77 }, { name: "F#5", midi: 78 }, { name: "G5", midi: 79 }, { name: "G#5", midi: 80 }, { name: "A5", midi: 81 }, { name: "A#5", midi: 82 }, { name: "B5", midi: 83 },
      { name: "C6", midi: 84 }, { name: "C#6", midi: 85 }, { name: "D6", midi: 86 }, { name: "D#6", midi: 87 }, { name: "E6", midi: 88 }, { name: "F6", midi: 89 }, { name: "F#6", midi: 90 }, { name: "G6", midi: 91 }, { name: "G#6", midi: 92 }, { name: "A6", midi: 93 }, { name: "A#6", midi: 94 }, { name: "B6", midi: 95 },
      { name: "C7", midi: 96 }, { name: "C#7", midi: 97 }, { name: "D7", midi: 98 }, { name: "D#7", midi: 99 }, { name: "E7", midi: 100 }, { name: "F7", midi: 101 }, { name: "F#7", midi: 102 }, { name: "G7", midi: 103 }, { name: "G#7", midi: 104 }, { name: "A7", midi: 105 }, { name: "A#7", midi: 106 }, { name: "B7", midi: 107 },
      { name: "C8", midi: 108 }, { name: "C#8", midi: 109 }
    ],

    tracks: [
      { name: "A0", duration: 0, steps: generateSteps() },
      { name: "c1", duration: 0, steps: generateSteps() },
      { name: "c4", duration: 0, steps: generateSteps() }
    ]
  });

  const [dataTracks, setDataTracks] = useState({notes:[]});
  const [dataDragDrop, setDataDragDrop] = useState([]);


  //Récupération du bpm lors du changement du range
  const handleBPM = (event) => {
    const bpm = event.target.value
    setDataBpm({bpm})
  }

  // Auth user
  const pseudo = JSON.parse(localStorage.getItem("pseudo"));

  return (
    <MusicalNotesProvider value={musicalNotes}>
    <SamplerProvider value={{dataSampler, setDataSampler}}>
    <PianoProvider value={{ dataPiano, setDataPiano }}>
    <BpmProvider value={{ dataBpm }}>
    <InstrumentProvider value={{ dataInstrument, setDataInstrument }}>
    <StepSeqProvider value={{ dataStepSeq,setdataStepSeq, dataTracks, setDataTracks}}>
    <TrackerProvider value={{ dataTracker, setDataTracker}}>
    <Router basename="/">
    
      <div className="App">
        
        <header className="header">
          
          <div className="header__nav">
            <MenuNav/>
          </div>
          
          {/* <div className="header__bpm">
            <p>BPM: {dataBpm.bpm}</p>
            <input name="bpm" min="1" max="200" type="range" onChange={handleBPM} />
          </div> */}
          
          {/* <div className="header__patern">
            <p>Patern:</p>
            <input defaultValue="1" min="1" max="300" type="number"></input>
          </div> */}
          
          <div className="header__user">
            <div className="header__user__pseudo">{pseudo}</div>
            {localStorage.getItem("pseudo")
              ? <Logout />
              : <Link className="button" to="/login">Login</Link>}
          </div>
        
        </header>
        
        <main>
          <Switch>
            
            <Route exact path="/piano-roll">
              <PianoRoll />
              <Sampler />
            </Route>
            
            <Route exact path="/step-sequencer">
              <StepSequencer />
              <Sampler />
            </Route>
            
            <Route exact path="/playlist">
              <DragDropProvider value={{dataDragDrop, setDataDragDrop}}>
                <Tracker />
              </DragDropProvider>
            </Route>
            
            <Route exact path="/login">
              <Login />
            </Route>
            
            <Route exact path="/logout">
              <Logout />
            </Route>

          </Switch>
        </main>
      </div>

    </Router>
    </TrackerProvider>
    </StepSeqProvider>
    </InstrumentProvider>
    </BpmProvider>
    </PianoProvider>
    </SamplerProvider>
    </MusicalNotesProvider>
  );
}

export default App;
