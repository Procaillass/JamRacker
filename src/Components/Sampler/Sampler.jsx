import React, { useState, useContext, useEffect } from "react";
import "./Sampler.scss";
import * as Tone from 'tone';
import SamplerContext from "../../context/samplerContext";
import MusicalNotesContext from "../../context/MusicalNotesContext.js";

import kick from "../../Assets/Sounds/kick.wav";
import bassDrum from "../../Assets/Sounds/bass_drum.wav";
import clap from "../../Assets/Sounds/clap.wav";
import hat from "../../Assets/Sounds/hat.wav"; // voir les sons dans tone




function Sampler() {

    const handleClose = (ev) => {
        ev.preventDefault();
        alert("close");
    };
    
    const musicalNotes = useContext(MusicalNotesContext);
    const {dataSampler, setDataSampler} = useContext(SamplerContext);
    
    const [numRow, setNumRow] = useState([{}]);

    const [sounds, setSounds] = useState([
        { name: "kick", url: kick },
        { name: "bassDrum", url: bassDrum },
        { name: "clap", url: clap },
        { name: "hat", url: hat }
    ]);

    const handleAddNewLane = (ev) => {
        ev.preventDefault();
        setNumRow([...numRow, {}]);
    }

    const handleLanes = (ev, index, type) => {
        let t = [...numRow];
        t[index][type] = ev.target.value;
        setNumRow([...t]);
        //console.log(numRow);
    }

    useEffect( () => {
        let newUrls = {};
        numRow.map( el => {

            if( el.sound && el.start ) {
            
                console.log(el.end);
                const startPos = musicalNotes.map(note => note.name).indexOf(el.start);
                const endPos = musicalNotes.map(note => note.name).indexOf(el.end);

                let pos = [];

                if( endPos === -1 || startPos === endPos ) {
                    pos = musicalNotes.filter((el, index) => index === startPos).map(note => note.name);

                } else if( startPos < endPos ) {
                    pos = musicalNotes.slice(startPos, endPos+1).map(note => note.name);

                } else if( startPos > endPos ) {
                    pos = musicalNotes.slice(endPos, startPos+1).map(note => note.name);
                }

                pos.map( p => newUrls[p] = el.sound);
            }

            //console.log(newUrls);
            //if( el.sound && el.note) newUrls[el.note] = el.sound;
        });
        setDataSampler({...dataSampler, urls: newUrls});
    }, [numRow]);

    /*
    * -------------
    * RENDER
    * -------------
    */
   
    return (

        <div className="box sampler">

            <div className="box__bar">
                <div className="box__title"><h2>Sampler</h2></div>
                <button className="box__close" onClick={handleClose}>X</button>
            </div>

            <div className="box__content">
                <div className="sampler__content">
                    
                    <div className="sampler__Lane sampler__Lane__head">
                        <h3>Sounds</h3>
                        <h3>Note</h3>
                        {/* <h3>Note de fin</h3> */}
                    </div>

                    <form>
                    
                    {numRow.map( (row, rowIdx) =>
                    <div key={rowIdx} className="sampler__Lane sampler__Lane__body">
                        <select className={`sampler__sound ${rowIdx}`} onChange={(ev) => handleLanes(ev, rowIdx, "sound")}>
                            <option value="">Choisir un son</option>
                            {sounds.map( el => <option key={el.name} value={el.url}>{el.name}</option> )}
                        </select>
                        
                        <select className="sampler__note" onChange={(ev) => handleLanes(ev, rowIdx, "start")}>
                            <option value="">Choisir une note de départ</option>
                            {musicalNotes.map( el => <option key={el.name} value={el.name}>{el.name}</option> )}
                        </select>
                        
                        {/* <select className="sampler__note" onChange={(ev) => handleLanes(ev, rowIdx, "end")}>
                            <option value="">Choisir une note de fin</option>
                            {musicalNotes.map( el => <option key={el.name} value={el.name}>{el.name}</option> )}
                        </select> */}
                    </div>
                    )}
                    
                    </form>

                    <div className="sampler__addnewlane">
                        <button className="sampler__addnewlane__btn" onClick={handleAddNewLane}>Add a new sound</button>
                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Sampler;