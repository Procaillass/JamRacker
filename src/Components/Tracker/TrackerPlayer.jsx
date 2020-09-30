import React from "react";
import * as Tone from "tone";

export default function TrackerPlayer({ items }) {
  const buffers = [...items].map((item) => new Tone.Buffer(item.data));

  const handlePlay = async () => {

    // "reset" transport, or something
    Tone.Transport.stop();
    Tone.Transport.cancel();

    let steps = [...items]
      .map(item => item.step) // new array with only steps
      .sort( (a, b) => a.step - b.step); // reorder by step
      steps = [...new Set(steps)]; // remove duplicates

    let durations = steps.map( step => {
      let a = [...items]
          .filter( item => step === item.step ) // new array of item that are on the step
          .map( item => item.duration); // take only duration data
      return Math.max(...a); // return the longest duration
    });

    let startTimes = [];
    for ( let i = 0; i < steps.length; i++ ) {
      let temp = 0.2;
      if(i > 0 ) {
      temp = durations
                    .slice(0, i) // takes durations of previous step only
                    .reduce( (total, num) => total + num); // sum all durations
      }
      startTimes.push(temp);
    }

    console.log("steps", steps, "durations", durations, "startTimes", startTimes);
    
    const players = [...items].forEach((item, index) => {

      // get the index of the steps
      // We will use it on the startTimaes array
      const indexOfStartT = steps.indexOf(item.step);

      new Tone.Player(buffers[index]).toDestination().sync().start(startTimes[indexOfStartT])
    }
    );

    Tone.Transport.start();
  };

  return <button onClick={handlePlay}>play</button>;
}
