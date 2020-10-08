import React, { useEffect, useState, useContext, createRef } from 'react';
import '../../App.scss';
import PianoOctave from './PianoOctave'
import PianoContext from "../../context/PianoContext.js";
import Instrument from '../Instrument/Instrument';
import instrumentContext from "../../context/instrumentContext";
import Play from "../../Components/Play/Play";
import { useHistory } from 'react-router';
import { db, fire } from '../../fire';
import * as Tone from 'tone';

export default function PianoRoll() {



  /*
  * --------
  * HISTORY /
  * --------
  */
  const history = useHistory();

  /*
  * --------
  * CONTEXT /
  * --------
  */

  const {dataPiano, setDataPiano} = useContext(PianoContext);
  const {dataInstrument, setDataInstrument} = useContext(instrumentContext);

  /*
  * --------
  * STATE
  * --------
  */
  const [wave,setWave] = useState("");
  const [octLength, setoctLength] = useState([1,2,3,5,6,7,8]);
  const title = createRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecorded,setIsRecorded] = useState(false);

  /*
  * --------------
  * AUDIOGENERATOR /
  * --------------
  */
  // 

  const [src, setSrc] = useState("");
  const [fileUrl,setFileUrl] = useState(null);


  /*
  * --------
  * EFFECTS
  * --------
  */

  // Update the local storage
  useEffect(() => {
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
    setoctLength(old => [...old, Math.min(...old) - 1])
  }
  // const getSong = () => {

  //   db.collection("Song").doc("test").get().then((doc) => {
  //     console.log("test:",doc.data().url)
  //     setWave(doc.data().url);
  //   })
    
  // }
  const changeIsRecorded = () => {
    setIsRecorded(true);
  }
  const SavePatern = (ev) => {
    ev.preventDefault();
    const titleValue = title.current.value;
    if (localStorage.getItem("pseudo")) {
      
      if (titleValue !== "" && dataPiano.notes.length) {
        alert("Save patern to DB");

        // envoie dans le storage .wav
        const storageRef = fire.storage().ref()
        storageRef.child(titleValue).put(src);

        // envoie vers la db firestore
        db.collection("Tracks").doc(titleValue).set({
          title: titleValue,
          author: JSON.parse(localStorage.getItem("pseudo")),
          source: " Piano Roll ",
          notes: dataPiano.notes
        })
      }else{
        alert("oops il manque un titre a votre piste !!!")
        return
      }
    }
    else {
      alert("Vous devez être connecté pour enregistrer");
      history.push("/login");
    }
  }

  const handleClose = (ev) => {
    ev.preventDefault();
    alert("Enregistrer le son dans la base de données");
  }

  const handleCurrentStep = (newCurrentStep) => {
    setCurrentStep(newCurrentStep);
  }

  /*
  * --------
  * RENDER
  * --------
  */

  return (
    <div className="piano-roll">
      <div className="box">

        <div className="box__bar">
          <div className="box__title"><h1>Piano roll</h1></div>
        </div>

        <div className="box__content">
          
          <div className="piano">

            <div className="piano__octave__controls">
              <button className="plusBtn" onClick={() => plusOcatve()}>Octave supp</button>
              <button className="moinsBtn" onClick={() => moinsOctave()}>Octave inf</button>
            </div>

            {octLength.map((item, index) =>
              <PianoOctave
                key={`${item}_${index}`}
                    octave={item}
                    dataPiano={dataPiano}
                    instrument={dataInstrument}
                    setDataPiano={setDataPiano} />
            )}
          </div>




          <div className="play-register-container">
            <Instrument key={`inst_pr`} dataTracks={dataPiano} />
            <Play key={`play_pr`}  src={src} setSrc={setSrc} dataTracks={dataPiano} changeIsRecorded={changeIsRecorded} instrument={dataInstrument} handleCurrentStep={handleCurrentStep} />
            {<form onSubmit={SavePatern} className="save-patern hide">
              <input className="roll-patern-title" type="text" placeholder="Titre de la séquence" ref={title} />
              <button className="roll-save-patern">Enregistrer</button>
            </form>}
          </div>

        </div>
      </div>
    </div>
  );
}
