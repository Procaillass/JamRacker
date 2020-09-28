import React, { useState, useEffect, useRef, useContext } from "react";
import "./Sampler.scss";
import * as Tone from 'tone';


function Sampler() {

    const handleClose = (ev) => {
        ev.preventDefault();
        alert("close");
    };


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

                <select className="sequencer__addtrack">
                    <option value="">Choisir une composition</option>
                    <option value="">Compo 01</option>
                    <option value="">Compo 02</option>
                </select>
                    
                    <div className="sampler__Lane">
                        <h3>Sounds</h3>
                        <h3>Note</h3>
                        <h3>loop</h3>
                    </div>
                    
                    <div className="sampler__Lane">
                        <select className="sampler__sound">
                            <option value="">Choisir un son</option>
                            <option value="">piste 1</option>
                            <option value="">piste 2</option>
                        </select>
                        
                        <select className="sampler__note">
                            <option value="">Choisir un range de départ</option>
                            <option value="">piste 1</option>
                            <option value="">piste 2</option>
                        </select>

                        <div className="sampler__loop">
                            <input className="" type="checkbox" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Sampler;