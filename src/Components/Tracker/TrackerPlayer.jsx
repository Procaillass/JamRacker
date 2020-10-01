import React from "react";
import * as Tone from "tone";

export default function TrackerPlayer({ items }) {
  const buffers = [...items].map((item) => new Tone.Buffer(item.data));

  const handlePlay = async () => {
    Tone.Transport.stop();

    const players = [...items].map((item, index) =>
      new Tone.Player(buffers[index]).toDestination().sync().start(item.step)
    );

    Tone.Transport.start();
    console.log("items",items)
  };

  return <button onClick={handlePlay}>play</button>;
}
