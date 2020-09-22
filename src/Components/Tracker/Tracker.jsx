import React, { useState, useEffect, useRef, useContext } from "react";
import "./Tracker.scss";
// import * as Tone from 'tone';
import trackerContext from "../../context/trackerContext";
import { TrackerProvider } from "../../context/trackerContext";




function Tracker() {

    // const handleAddPiste = (ev) => {
    //     ev.preventDefault();
    //     if (ev.target.value !== "") {          
    //       const newPiste = {pistes: generatePiste(piste)};
    //       setdataTracker({ ...dataTracker, pistes: [...dataTracker.pistes, newPiste] });
    //     }
    //     ev.target.value = "";
    //   };



    const handleClose = (ev) => {
        ev.preventDefault();
        alert("close");
    };

    const handleVolume = (event) => {
        const volume = event.target.value
        setDataTracker({
            volume
        })
        //A FAIRE --> lier le chiffre du volume au volume de la sortie de la piste
    }

    //      
    //   useEffect(() => {
    //     console.log("pistes", pistes);
    //     const newPistes = [...pistes].map(el => ({ ...el, pistes: generatePistes(pistes) }));
    //     setdataTracker({ ...dataTracker, pistes: newPistes });
    //   }, [pistes])


    /*
* -------------
* CONTEXT
* -------------
*/

    const { dataTracker, setDataTracker } = useContext(trackerContext)

    /*
    * -------------
    * RENDER
    * -------------
    */
    return (

        <div className="box tracker">

            <div className="box__bar">
                <div className="box__title">Tracker</div>
                <button className="box__close" onClick={handleClose}>X</button>
            </div>

            <div className="box__content">

                <ul className="box__content__pistes">
                    <li className="box__content__pistes__rangeesNumb">

                        <div>Nom -></div>
                        <div>x</div>
                        <div className="step">1</div>
                        <div className="step">2</div>
                        <div className="step">3</div>
                        <div className="step">4</div>
                        <div className="step">5</div>
                        <div className="step">6</div>
                        <div className="step">7</div>
                        <div className="step">8</div>

                        <div>Volume -></div>
                        <div>range -></div>
                        <button>Mute ? -></button>
                        <div>fin de la piste</div>

                    </li>
                    <li className="box__content__pistes__piste">

                        <div>debut de la piste 1</div>
                        <div>1</div>

                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>


                        {/* <div data-pistes={pistes} className="tracker__track">
                                {track.pistes.map((piste, pisteIdx) => (
                                    <div
                                        key={pisteIdx}
                                        
                                    />
                                ))}
                            </div> */}

                        <div>Volume : {dataTracker.volume}</div>
                        <input name="Volume" min="0" max="100" type="range" onChange={handleVolume} />
                        <button>Mute</button>
                        <div>fin de la piste 1</div>

                    </li>
                    <li className="box__content__pistes__piste">

                        <div>debut de la piste 2</div>
                        <div>2</div>

                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>
                        <div className="step">bloc</div>

                        {/* <div data-pistes={pistes} className="tracker__track">
                            {track.pistes.map((piste, pisteIdx) => (
                                <div key={pisteIdx} /> ))}
                                                                    </div> */}

                        <div>Volume : {dataTracker.volume}</div>
                        <input name="Volume" min="0" max="100" type="range" onChange={handleVolume} />
                        <button>Mute</button>
                        <div>fin de la piste 2</div>

                    </li>
                </ul>

                {<div className="tracker__controls">
                    <select className="Tracker__addAudioFile" >
                        {/* onChange={handleAddAudioFile} */}
                        <option value="">Add Audio File</option>
                        {/* {AudioFileList.map((AudioFile, index) =>
              Listes.map(el => el.name).includes(note.name) === false &&
              <option key={index + '_' + AudioFile.name} value={AudioFile.name}>{AudioFile.name}</option>
            )} */}
                    </select>
                    <select className="Tracker__choosePiste" >
                        <option value="">piste 1</option>
                        <option value="">piste 2</option>
                        <option value="">piste 3</option>
                        <option value="">piste 4</option>
                        <option value="">piste 5</option>
                        <option value="">piste 6</option>
                        <option value="">piste 7</option>
                        <option value="">piste 8</option>


                    </select>
                    {/* <button " onClick={handlePlaying}>{playing ? "stop" : "play"}</button> */}
                    <button className="tracker__addAudioFileToPiste"> Send To Piste</button>
                </div>}

            </div>

        </div>


    );
}

export default Tracker;