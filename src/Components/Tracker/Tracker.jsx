import React, { useState, useEffect, useRef, useContext } from "react";
// import * as Tone from 'tone';
import trackerContext from "../../context/trackerContext";
import { TrackerProvider } from "../../context/trackerContext";
import DragDrop from "../DragDrop/DragDrop";
import Card from "../DragDrop/Card";
import DragDropContext, { DragDropProvider } from "../../context/dragDropContext";
import * as Tone from 'tone';
import kick from "../../Assets/Sounds/kick.wav";
import bassDrum from "../../Assets/Sounds/bass_drum.wav";
import clap from "../../Assets/Sounds/clap.wav";
import hat from "../../Assets/Sounds/hat.wav";
import { fire } from "../../fire";
import TrackerPlayer from "./TrackerPlayer";


function Tracker() {







    /*
    * -------------
    * CONTEXT
    * -------------
    */

    const { dataDragDrop, setDataDragDrop } = useContext(DragDropContext);
    const { dataTracker, setDataTracker } = useContext(trackerContext);

    /*
     * -------------
     * STATES
     * -------------
     */
    const [showPanel, setShowPanel] = useState('browse');
    const [allFile, setAllFile] = useState([]);
    const [dataPlayPiste, setDataPlayPiste] = useState([]);
    const generatePistes = (stepsNum = 12) => Array.from({ length: stepsNum }, () => 0);
    const [dataSounds, setdataSounds] = useState({

        sounds: [
            {
                name: "sound1",
                url: hat
            },
            {
                name: "sound2",
                url: clap
            },
            {
                name: "sound3",
                url: bassDrum
            },
            {
                name: "sound4",
                url: kick
            }
        ]
    })

    const [dataPistes, setdataPistes] = useState({

        stepsNum: 12,

        tracks: [
            {
                name: "1",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "2",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "3",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "4",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "5",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "6",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "7",
                duration: 0,
                steps: generatePistes()
            },
            {
                name: "8",
                duration: 0,
                steps: generatePistes()
            }
        ]
    });

    const tracks = Array.isArray(dataPistes.tracks) && dataPistes.tracks.length ? dataPistes.tracks : [];
    const steps = dataPistes.stepsNum;

    /*
    * -------------
    * DB STORAGE
    * -------------
    */

    const fecthSong = () => {

        let gsReference = fire.storage().refFromURL('gs://jamracker-36ec0.appspot.com')


        gsReference.listAll().then(res => {
            setAllFile(res.items)
        })
    }

    useEffect(() => {
        fecthSong();
    }, [])

    /*
    * -------------
    * HANDLERS
    * -------------
    */
   
    const handleShowPanel = (ev, panel) => {
        ev.preventDefault();
        setShowPanel(panel);
    };

    //_____fin du menu nav disable switch game______

    //_____________________Debut du changement de volume d'un piste______

    const handleVolume = (event) => {
        const volume = event.target.value
        setDataTracker({
            volume
        })
        //A FAIRE --> lier le chiffre du volume au volume de la sortie de la piste
    }
    //_____________________fin du changement de volume d'un piste______


    /*
    * -------------
    * EFFECTS
    * -------------
    */

    useEffect(() => {
        const newTracks = [...tracks].map(el => ({ ...el, steps: generatePistes(steps) }));
        setdataPistes({ ...dataPistes, tracks: newTracks });
    }, [steps])

    /* useEffect(() => {
        setDataPlayPiste([...dataPlayPiste, dataDragDrop])
        
    }, [dataDragDrop])
 */
//console.log("tracker",dataDragDrop)
    /*
    * -------------
    * RENDER
    * -------------
    */
    return (

        <div className="box">

            <div className="box__bar">
                <div className="box__title"><h2>Tracker</h2></div>
            </div>

            <div className="box__content">

                <div className="tracker">
                
                <div className="tracker__tracks">
                    
                    {tracks.map((track, trackIdx) => (
                    
                        <div className="tracker__track">

                        <div className="tracker__steps">
                            
                            {track.steps.map((step, stepIdx) => (
                                
                                <div
                                    key={`${trackIdx}_${stepIdx}`}
                                    className="tracker__step"
                                    data-step={stepIdx} 
                                    data-track={trackIdx}>

                                <DragDrop
                                     id={`drag__item_${trackIdx}_${stepIdx}`}
                                     step={stepIdx}
                                     track={trackIdx}>
                                </DragDrop>
                            </div>

                        ))}
                        </div>
                        {/* <div className="box__volume">
                            <span>Volume : {dataTracker.volume}</span>
                            <input name="Volume" min="0" max="100" type="range" onChange={handleVolume} />
                            <button>Mute</button>
                        </div> */}
                        </div>
                    ))}
                </div>

                <div className="tracker__panels">
                    
                    <div className="tracker__panels__menu">
                        <button 
                            className={showPanel === "browse" && "tracker__panels__menu-active"}
                            onClick={(ev) => handleShowPanel(ev, "browse")}>
                            Browse
                        </button>
                        <button 
                            className={showPanel === "project" && "tracker__panels__menu-active"}
                            onClick={(ev) => handleShowPanel(ev, "project")}>
                            Project
                        </button>
                    </div>
                    
                    <div className="tracker__panel">
                        
                        {showPanel === "browse" &&
                        <div className="tracker__browse">
                            
                            <div className="tracker__sounds">
                            {allFile.map((item, index) => (
                                    <Card
                                        id={`sound_${index}`}
                                        className="tracker__sound"
                                        draggable="true">
                                        {item.location.path}
                                    </Card>
                            ))}
                            </div>
                            
                            <div className="tracker__browse__actions">
                                <button>Create new</button>
                                <button>Hunt</button>
                            </div>
                        </div>
                        }

                        {showPanel === "project" &&
                        <div className="tracker__project">
                            
                            <label>Project name</label>
                            <input placeholder="Your project name" type="text" />
                            <label>Project description</label>
                            <textarea placeholder="Your project description" type="text" />
                            <label>Project Visibility</label>
                            <select type="text">
                                <option value="pub">Choose a visibility for your project</option>
                                <option value="pub">Public</option>
                                <option value="pub">Private</option>
                            </select>

                            <div className="tracker__project__actions">
                                <button className="button">Enregistrer</button>
                            </div>

                        </div>
                        }

                    </div>{/* _________________________________fin du nav container */}

                </div>{/* _________________________________fin du bloc menu à droite du tracker */}

<TrackerPlayer items={dataDragDrop} />
</div>
                
            </div>{/* _________________________________fin du box_content tracker */}
            
        </div>


    );
}

export default Tracker;