import React, { useEffect, useState, useContext, createRef } from 'react';
import '../../App.scss';
import PinaoOctave from './PianoOctave'
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
  const [octLength, setoctLength] = useState([5]);
  const title = createRef();
  const [currentStep, setCurrentStep] = useState(0);

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

  const SavePatern = (ev) => {
    ev.preventDefault();
    const titleValue = title.current.value

    // const regex = /[a-z]/;
    // const file = src.split("blob:")[1]

    if (localStorage.getItem("pseudo")) {
      alert("Save patern to DB");
     
      if (titleValue !== "" && dataPiano.notes.length) {

        // envoie dans le storage .wav
        const storageRef = fire.storage().ref()
        storageRef.child(titleValue).put(src)

        // envoie le lien dans une db 
        // db.collection("Song").doc(titleValue).set({
        //   title: titleValue,
        //   author: JSON.parse(localStorage.getItem("pseudo")),
        //   source: " Piano Roll ",
        //   url: src
        // })

        // envoie vers la db firestore
        db.collection("Tracks").doc(titleValue).set({
          title: titleValue,
          author: JSON.parse(localStorage.getItem("pseudo")),
          source: " Piano Roll ",
          notes: dataPiano.notes
        })
      }
    }
    else {
      alert("you not have account for register");
      history.push("/login");
    }
  }

  const handleClose = (ev) => {
    ev.preventDefault();
    alert("Save patern to DB");
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
    <div className="box">
      <div className="box__bar">
        <div className="box__title">Piano</div>
        <button className="box__close" onClick={handleClose}>X</button>
      </div>
      <div className="box__content">
        <div className="Roll">
          <button className="plusBtn" onClick={() => plusOcatve()}>Octave supp</button>
          <button className="moinsBtn" onClick={() => moinsOctave()}>Octave inf</button>

          {octLength.map((item, index) =>
            <PinaoOctave key={`${item}__${index}`} octave={item} dataPiano={dataPiano} instrument={dataInstrument} setDataPiano={setDataPiano}/>
          )}


          <div className="piano__controls">
            <form onSubmit={SavePatern}>
              <input className="roll-patern-title" ref={title} />
              <button className="roll-save-patern">Enregistrer</button>
            </form>
            <Instrument dataTracks={dataPiano} />
            <Play  src={src} setSrc={setSrc} dataTracks={dataPiano} instrument={dataInstrument} handleCurrentStep={handleCurrentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
