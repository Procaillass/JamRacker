
import React, { useState } from "react";
import "./Play.scss";
import * as Tone from 'tone';

function Play({dataTracks, instrument, handleCurrentStep}) {
   
   /*
   * -------------
   * STATES
   * -------------
   */
 
   const [playing, setPlaying] = useState(false);

   // AudioGenerator
   const [src, setSrc] = useState("");
   const [name, setName] = useState("jamtracker-sequence.wav");
   //

    /*
    * -------------
    * HANDLERS
    * -------------
    */
    const handlePlaying = (ev) => {
        ev.preventDefault();

        if(dataTracks.notes.length === 0) return;

        // Remove scheduled events from the timeline after the given time.
        // Repeated events will be removed if their startTime is after the given time
        Tone.Transport.cancel();

        // AudioGenerator
        const actx  = Tone.context;
        const dest  = actx.createMediaStreamDestination();
        const recorder = new MediaRecorder(dest.stream);
        instrument.connect(dest);
        const chunks = [];
        //

        // Converti dataTracks (passé en props) en tableau lisible par scheduleRepeat
        const reorderedNotes = [];
        for (let i = 0; i < 16; i++) {
            const filteredNotes = [...dataTracks.notes].filter(el => el.steps === i);
            if(filteredNotes.length) {
                reorderedNotes[i] = filteredNotes;
            }
        }

        let currentStep = 0;
        Tone.Transport.scheduleRepeat(
            (time) => {

                // AudioGenerator
                if (currentStep === 0) recorder.start();
                //

                if (reorderedNotes[currentStep]) {
                    const now = Tone.now();
                    reorderedNotes[currentStep].map((el, eli) => {
                        instrument.triggerAttackRelease(
                          el.name,
                          el.duration,
                          now
                        );
                    });
                }
                handleCurrentStep(currentStep);
                console.log(currentStep);
                currentStep++; 
                // AudioGenerator
                if (currentStep === 15) {
                    recorder.stop();
                    //instrument.triggerRelease(time);
                }
                //
                if (currentStep > 15) { currentStep = 0 };
          },
          "16n",
          0
        );
        
        // AudioGenerator
        recorder.ondataavailable = evt => chunks.push(evt.data);
        recorder.onstop = evt => {
            let blob = new Blob(chunks, { type: 'audio/wav' });
            setSrc(URL.createObjectURL(blob));
        };
        //

        playing === false ?
            Tone.Transport.start()
                : Tone.Transport.stop();

        setPlaying(!playing);
        
    };
    
    /*
    * -------------
    * RENDER
    * -------------
    */
    
    return (
        <>
        <button className="play" onClick={handlePlaying}>{playing ? "stop" : "play"}</button>
        <a className="button ag__download-btn" href={src} download={name}>Download audio file</a>
        </>
    );
}
export default Play;