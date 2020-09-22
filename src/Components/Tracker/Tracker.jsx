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
        
    };

    //menu nav disable switch game

    const handleInspector = (ev) => {
        ev.preventDefault();

        document.querySelector(".box__title_inspector").classList.toggle("selected")
        document.querySelector(".box__title_browser").classList.remove("selected")
        document.querySelector(".box__title_project").classList.remove("selected")
        
        document.querySelector(".tracker_menu__nav__container__browser").classList.add("disable")
        document.querySelector(".tracker_menu__nav__container__project").classList.add("disable")
        document.querySelector(".tracker_menu__nav__container__inspector").classList.toggle("disable")


    };
    const handleBrowser = (ev) => {
        ev.preventDefault();

        document.querySelector(".tracker_menu__nav__container__browser").classList.toggle("disable")
        document.querySelector(".tracker_menu__nav__container__project").classList.add("disable")
        document.querySelector(".tracker_menu__nav__container__inspector").classList.add("disable")

        document.querySelector(".box__title_inspector").classList.remove("selected")
        document.querySelector(".box__title_browser").classList.toggle("selected")
        document.querySelector(".box__title_project").classList.remove("selected")
       
    };
    const handleProject = (ev) => {
        ev.preventDefault();
        document.querySelector(".tracker_menu__nav__container__browser").classList.add("disable")
        document.querySelector(".tracker_menu__nav__container__project").classList.toggle("disable")
        document.querySelector(".tracker_menu__nav__container__inspector").classList.add("disable")

        document.querySelector(".box__title_inspector").classList.remove("selected")
        document.querySelector(".box__title_browser").classList.remove("selected")
        document.querySelector(".box__title_project").classList.toggle("selected")
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

                        <div>Volume -&gt;</div>
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

                <div className="tracker_menu">

                    <nav>

                        <div className="box__bar" >
                            <div className="box__title box__title_inspector" onClick={handleInspector}>Inspector</div>
                        </div>

                        <div className="box__bar">
                            <div className="box__title box__title_browser selected" onClick={handleBrowser}>Browser</div>
                        </div>

                        <div className="box__bar">
                            <div className="box__title box__title_project" onClick={handleProject}>Project</div>
                        </div>

                    </nav>

                    <div className="tracker_menu__nav__container">

                        <div className="tracker_menu__nav__container__inspector disable">INSPECTOR</div>
                        <div className="tracker_menu__nav__container__browser disable">BROWSER</div>
                        <div className="tracker_menu__nav__container__project disable">PROJECT</div>

                    </div>






                </div>
            </div>

        </div>


    );
}

export default Tracker;