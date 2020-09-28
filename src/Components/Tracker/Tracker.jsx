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


    //_____Fermeture de la fenetre______
    const handleClose = (ev) => {
        ev.preventDefault();
    };
    //_____fin Fermeture de la fenetre______

    //_____debut menu nav disable switch game (j'arrive pas encore à bien utiliser des foreach ou des map, alors j'ai mis ajouté/enlever une classe Disable au clic)
    // c'est pas opti mais ça fonctionne______

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



    // _____________essai de génération de pistes_______________
    //      
    //   useEffect(() => {
    //     console.log("pistes", pistes);
    //     const newPistes = [...pistes].map(el => ({ ...el, pistes: generatePistes(pistes) }));
    //     setdataTracker({ ...dataTracker, pistes: newPistes });
    //   }, [pistes])
    //
    // _____________fin essai de génération de pistes_______________


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
                <div className="box__title"><h2>Tracker</h2></div>
                <button className="box__close" onClick={handleClose}>X</button>
            </div>

            <div className="box__content">
                {/* _______________________________________________________________________début de la grille */}
                <ul className="box__content__pistes">
                    {/* Première colonne à gauche de la grille pour les nombres */}
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
                        {/* les 4 élément qui suivent sont là pour avoir le même nombre d'élément (de fractions grid) que dans les pistes */}
                        <div>Volume -&gt;</div>
                        <div>range -></div>
                        <button>Mute ? -></button>
                        <div>fin de la piste</div>

                    </li>
                    <li className="box__content__pistes__piste">
                        {/* colonne de la Première piste */}
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

                        {/* Essai de génération de la piste fail */}
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
                        {/* colonne de la deuxième piste */}
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

                {/* ______________________________________________________________________________________fin de la grille */}

                {/* ________début du gros bloc avec les menus sur la droite du tracker________ */}

                <div className="tracker_menu">
                    {/* Menu nav avec les 3 onglets */}
                    <nav className="tracker_menu_nav">
                        {/* onglet 1 inspector */}
                        <div className="box__bar" >
                            <div className="box__title box__title_inspector button" onClick={handleInspector}>Inspector</div>
                        </div>
                        {/* onglet 2 browser */}
                        <div className="box__bar">
                            <div className="box__title box__title_browser button " onClick={handleBrowser}>Browser</div>
                        </div>
                        {/* onglet 3 project */}
                        <div className="box__bar">
                            <div className="box__title box__title_project button" onClick={handleProject}>Project</div>
                        </div>
                    </nav>
                    {/* Fin du menu nav */}

                    {/* Debut du container pour les 3 onglets */}
                    <div className="tracker_menu__nav__container">
                        {/* _________________________________debut de la partie INSPECTOR */}
                        <div className="tracker_menu__nav__container__inspector disable">

                            <p>Bit Properties</p>
                            {/* name */}
                            <label className="button" htmlFor="name">Name</label>
                            <input className="button input" placeholder="Drumroll" type="text" />
                            {/* select color */}
                            <label className="button" htmlFor="name">Color</label>
                            <select className="button input" placeholder="" type="text" >

                                <option className="button_pink" value="pink">Pink</option>
                                <option className="button_red" value="red">Red</option>
                                <option className="button_violet" value="violet">Violet</option>
                                <option className="button_blue" value="blue">Blue</option>
                                <option className="button_green" value="green">Green</option>
                                <option className="button_yellow" value="yellow">Yellow</option>
                                <option className="button_orange" value="orange">Orange</option>

                            </select>
                            {/* div contenant loops et son select pour les mettre en flex row */}
                            <div>
                                <label className="button" htmlFor="name">Loops</label>
                                <select className="button input" placeholder="" type="text" >

                                    <option className="button" value="loops">Audio fil</option>

                                </select></div>

                            {/* ___________Deuxieme partie - les effets */}

                            <p>Channel effects</p>

                            {/* _____________________début d'un Composant effet */}
                            <div className="tracker_menu__nav__container__inspector__fx">
                                {/* label de l'effet */}
                                <label className="button" htmlFor="name">FX-1</label>
                                {/* selection de l'effet */}
                                <select className="button" name="fx1" id="">
                                    <option className="button" value="chorus">chorus</option>
                                    <option className="button" value="compressor">compressor</option>
                                    <option className="button" value="reverb">reverb</option>
                                </select>
                                {/* Valeur de l'effet de 0 à 100 */}
                                <input name="fx1" min="0" max="100" type="range" />
                            </div>
                            {/* _____________________fin d'un Composant effet */}

                            {/* Deuxieme composant effet */}
                            <div className="tracker_menu__nav__container__inspector__fx">
                                <label className="button" htmlFor="name">FX-2</label>
                                <select className="button" name="fx2" id="">
                                    <option className="button" value="chorus">chorus</option>
                                    <option className="button" value="compressor">compressor</option>
                                    <option className="button" value="reverb">reverb</option>
                                </select>
                                <input name="fx2" min="0" max="100" type="range" />
                            </div>
                            {/* troisième composant effet */}
                            <div className="tracker_menu__nav__container__inspector__fx">
                                <label className="button" htmlFor="name">FX-3</label>
                                <select className="button" name="fx3" id="">
                                    <option className="button" value="chorus">chorus</option>
                                    <option className="button" value="compressor">compressor</option>
                                    <option className="button" value="reverb">reverb</option>
                                </select>
                                <input name="fx3" min="0" max="100" type="range" />
                            </div>

                        </div>

                        {/* _________________________________Fin de la partie INSPECTOR */}




                        {/* _________________________________debut de la partie BROWSER */}
                        <div className="tracker_menu__nav__container__browser disable">
                            <p>Liste de mes pistes audio</p>
                            {/* image pour représenter la liste des Audio perso */}
                            <img src={require('./soundpalette.PNG')} />

                            <div className="tracker_menu__nav__container__browser__buttons">
                                {/* créer un nouveau son */}
                                <button className="button">Create new</button>
                                {/* Rechercher dans la bibliothèque des sons enregistrés par la communauté */}
                                <button className="button">Hunt</button>
                            </div>
                        </div>
                        {/* _________________________________fin de la partie BROWSER */}



                        {/* _________________________________debut de la partie Project */}

                        <div className="tracker_menu__nav__container__project disable">

                            <p >Project properties</p>

                            <label className="button" htmlFor="name">Name</label>
                            <input className="button input" placeholder="Your project name" type="text" />

                            <label className="button" htmlFor="description">Description</label>
                            <textarea className="button input" placeholder="Your project description" type="text" />

                            <label className="button" htmlFor="description">Visibility</label>
                            <select className="button input" placeholder="Your project description" type="text">
                                <option value="pub">Public</option>
                                <option value="pub">Private</option>
                            </select>

                            <div className="tracker_menu__nav__container__project__buttons">
                                <button className="button">Social Sharing</button>
                                <button className="button">Render and Donwload</button>

                            </div>

                        </div> {/* _________________________________fin de la partie Project */}

                    </div>{/* _________________________________fin du nav container */}

                </div>{/* _________________________________fin du bloc menu à droite du tracker */}

            </div>{/* _________________________________fin du box_content tracker */}

        </div> 


    );
}

export default Tracker;