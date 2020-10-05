import React, {useState} from "react";
import * as Tone from "tone";

export default function TrackerPlayer({ items,src,setSrc }) {

  /*
   * ------
   * CONTS
   * ------
   */

  const buffers = [...items].map((item) => new Tone.Buffer(item.data));

  /*
   * ------
   * STATES
   * ------
   */
  
  // For AudioGenerator
  // const [src, setSrc] = useState("");
  // const [name, setName] = useState("jamtracker-sequence.wav");

  /*
   * ------
   * METHODS
   * ------
   */

  const handlePlay = async () => {

    // "reset" transport
    Tone.Transport.stop();
    Tone.Transport.cancel();

    // Put steps in an array
    // Reorder steps
    // Remove duplicates
    let steps = [...items]
      .map(item => item.step)
      .sort( (a, b) => a.step - b.step);
      steps = [...new Set(steps)];

    // For each step
    // get the items that are on the step
    // get the longest duration of these items
    let durations = steps.map( step => {
      let a = [...items]
          .filter( item => step === item.step )
          .map( item => item.duration);
      return Math.max(...a);
    });

    // For each step
    // sum durations of previous steps only
    let startTimes = [];
    for ( let i = 0; i < steps.length; i++ ) {
      let temp = 0.2;
      if(i > 0 ) {
      temp = durations
                    .slice(0, i)
                    .reduce( (total, num) => total + num);
      }
      startTimes.push(temp);
    }

    // For AudioGenerator
    const actx  = Tone.context;
    const dest  = actx.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream);
    const chunks = [];
    recorder.ondataavailable = evt => chunks.push(evt.data);
    recorder.onstop = evt => {
      let blob = new Blob(chunks, { type: 'audio/wav' });
      setSrc(blob);
    };
    
    // Play each audio at the right time
    // connect(dest) is used for the AudioGenerator
    // Sync prevent player playing directly and sent it to the "Tone.Transport timeline"
    const players = [...items].forEach((item, index) => {
      const indexOfStartT = steps.indexOf(item.step);
      new Tone.Player(buffers[index]).toDestination().connect(dest).sync().start(startTimes[indexOfStartT])
    });

    
    
    // AudioGenerator
    recorder.start();
    Tone.Transport.start();
    let totalDuration = durations.reduce( (total, num) => total + num);
    // Stop the recorder after the total time of the audios + 1 sec. because of bugs
    setTimeout(function(){ recorder.stop(); }, totalDuration*1000+1000);
  };

  return (
    <>
      <div className="tracker__player">
      <button onClick={handlePlay}>play</button>
      {/* {src !== "" && <a className="button" href={src} download={name}>Enregistrer</a>} */}
      </div>
    </>
  );
}
