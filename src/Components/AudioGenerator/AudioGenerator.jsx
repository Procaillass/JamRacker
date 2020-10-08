
import React, { useState, useEffect, useRef, useContext } from "react";
import "./AudioGenerator.scss";
import * as Tone from 'tone';

function AudioGenerator() {

  /*
   * -------------
   * CONTEXT
   * -------------
   */

   /*
   * -------------
   * STATES
   * -------------
   */

   const [src, setSrc] = useState("");
   const [name, setName] = useState("audio-file.wav");
   const [showLoader, setShowLoader] = useState(false);

  /*
   * -------------
   * METHODS
   * -------------
   */

    /*
    * -------------
    * HANDLERS
    * -------------
    */

    const handleClose = (ev) => {
        ev.preventDefault();
        alert("close");
    };
   
    /*
    * -------------
    * EFFECTS
    * -------------
    */
   
    const handleGenerate = (ev) => {
        ev.preventDefault();

        setShowLoader(true);
  
        const audio = document.querySelector('audio');
        const synth = new Tone.Synth();
        const actx  = Tone.context;
        const dest  = actx.createMediaStreamDestination();
        const recorder = new MediaRecorder(dest.stream);

        synth.connect(dest);
        synth.toMaster();
  
        const chunks = [];
  
        const notes = 'CDEFGAB'.split('').map(n => `${n}4`);
        let note = 0;
        Tone.Transport.scheduleRepeat(time => {
            if (note === 0) recorder.start();
            if (note > notes.length) {
                synth.triggerRelease(time)
                recorder.stop();
                Tone.Transport.stop();
            } else synth.triggerAttack(notes[note], time);
            note++;
        }, '4n');
  
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {
            let blob = new Blob(chunks, { type: 'audio/wav' });
            setSrc(URL.createObjectURL(blob));
            setShowLoader(false);
        };
  
        Tone.Transport.start();
    };

    const handleDownload = (ev) => {
        ev.preventDefault();
    }
   
    /*
    * -------------
    * RENDER
    * -------------
    */
   
    return (
        <div className="box audio-generator">

            <div className="box__bar">
                <div className="box__title">Générateur audio</div>
                <button className="box__close" onClick={handleClose}>X</button>
            </div>
            
            <div className="box__content">
                <div className="ag__content">
                <button className="button ag__generate-btn" onClick={handleGenerate}>Générer un fichier audio</button>
                {showLoader && <div className="loader"><div></div><div></div><div></div></div>}
                {/* src !== "" && <audio src={src} controls></audio>  */}
                {src !== "" && <a className="button ag__download-btn" href={src} download={name}>Télécharger un fichier audio</a>}
                </div>
            </div>
        
        </div>
    );
}
export default AudioGenerator;