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
import TrackerPlayer from "./TrackerPlayer";

import {db,fire} from "../../fire";
import { useHistory } from "react-router";
import classNames from 'classnames';

function Tracker() {

    /*
    * -------------
    * HISTORY
    * -------------
    */
    const history = useHistory();


    /*
    * -------------
    * REF
    * -------------
    */

    const titleTracker = useRef();
    const descriptionTracker = useRef();

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
    const [allFile, setAllFile] = useState([])
    const [src,setSrc] = useState("");
    const [link,setLink] = useState("");
    const [isVisibility , setIsVisibility] = useState(null);
    const [dataPlayPiste, setDataPlayPiste] = useState([]);
    const storageApiLink = "jamracker-776e7.appspot.com";
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

        let gsReference = fire.storage().refFromURL("gs://" + storageApiLink)

        gsReference.listAll().then(res => {
            setAllFile(res.items)
        })
    }
    const visibilityTrack = (e) => {
        
        if (e.target.value === "public") {
            setIsVisibility(true);
        } else if (e.target.value === "private") {
            setIsVisibility(false);
        }
    }

    const SaveTracker = (e) => {
        e.preventDefault();

        const titleValue = titleTracker.current.value;
        const descriptionValue = descriptionTracker.current.value;

        if (localStorage.getItem("pseudo")) {
            if(titleValue !== "" && descriptionValue !== ""){
                
                
                // envoie dans le storage .wav
                const storageRef = fire.storage().ref("Tracker")
                const element = storageRef.child(titleValue).put(src)
                
                
                const gsReference = fire.storage().refFromURL('gs://jamracker-776e7.appspot.com')
                
                // get lien dans le storage + temps de pause de 2 sec avant qu'ils partent le rechercher
                setTimeout(() => {
                    storageRef.child(titleValue).getDownloadURL().then(res => {
                        alert("Save to partern in DB !!! ")
                        db.collection("SongTracker").doc(titleValue).set({
                            title: titleValue,
                            author: JSON.parse(localStorage.getItem("pseudo")),
                            source: " Tracker ",
                            urlStorage: res,
                            description:descriptionValue,
                            visibility: isVisibility
                        })
                    })
                },2000)
                

            }else{
              alert("oops il manque un titre a votre piste !!!")
              return
            }
          }
        else {
            alert("you not have account for register");
            history.push("/login");
        }
        console.log(" src :",src)
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
                    
                        <div 
                            key={`track_${trackIdx}`}
                            className="tracker__track">

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
                            className={classNames({
                                "tracker__panels__menu-active": showPanel === "browse"
                            })}
                            onClick={(ev) => handleShowPanel(ev, "browse")}>
                            Browse
                        </button>
                        <button 
                            className={classNames({
                                "tracker__panels__menu-active": showPanel === "project"
                            })}
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
                                        key={`sound_${index}`}
                                        id={`sound_${index}`}
                                        dataUrl={`https://firebasestorage.googleapis.com/v0/b/${storageApiLink}/o/${item.location.path}?alt=media`}
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
                            <input placeholder="Your project name" type="text" ref={titleTracker} />
                            <label>Project description</label>
                            <textarea placeholder="Your project description" type="text" ref={descriptionTracker} />
                            <label>Project Visibility</label>
                            <select onChange={ (e) => visibilityTrack(e) }>
                                <option value="">Choose a visibility for your project</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                            {isVisibility}

                            <div className="tracker__project__actions">
                                {/* <button className="button">Social Sharing</button> */}
                                <button className="button" onClick={(e) => SaveTracker(e)}>Enregistrer</button>

                            </div>

                        </div>
                        }

                    </div>{/* _________________________________fin du nav container */}

                </div>{/* _________________________________fin du bloc menu à droite du tracker */}

<TrackerPlayer src={src} setSrc={setSrc} items={dataDragDrop} />
</div>
                
            </div>{/* _________________________________fin du box_content tracker */}
            
        </div>


    );
}

export default Tracker;