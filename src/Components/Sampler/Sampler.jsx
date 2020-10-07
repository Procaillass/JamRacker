import React, { useState, useContext, useEffect } from "react";
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
        alert("Fermé");
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
            </div>

            <div className="box__content">
                <div className="sampler__content">
                    
                    {numRow.map( (row, rowIdx) =>
                    <div key={rowIdx} className="sampler__Lane">
                    <select className="sampler__note" onChange={(ev) => handleLanes(ev, rowIdx, "start")}>
                        <option value="">Choisir une note</option>
                        {musicalNotes.map( el => <option key={el.name} value={el.name}>{el.name}</option> )}
                    </select>

                        <select className={`sampler__sound ${rowIdx}`} onChange={(ev) => handleLanes(ev, rowIdx, "sound")}>
                            <option value="">Associer un son</option>
                            {sounds.map( el => <option key={el.name} value={el.url}>{el.name}</option> )}
                        </select>
                    </div>
                    )}

                    <div className="sampler__addnewlane">
                        <button className="sampler__addnewlane__btn" onClick={handleAddNewLane}>Ajouter un nouveau son</button>
                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Sampler;