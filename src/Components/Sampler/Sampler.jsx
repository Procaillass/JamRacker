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
                <div className="box__title">Sampler</div>
                <button className="box__close" onClick={handleClose}>X</button>
            </div>

            <div className="box__content">

                <div className="sampler_content">
                    <div className="sampler_content_Lane">
                        <div>Sounds</div>
                        <div>Range</div>
                        <div>(vide)</div>
                        <div>loop</div>
                    </div>

                    <div className="sampler_content_Lane">
                        <select name="importSound" id="">
                            <option value="">piste 1</option>
                            <option value="">piste 2</option>
                        </select>

                        <select name="range" id="">
                            <option value="">C3</option>
                            <option value="">C4</option>
                        </select>

                        <select name="" id="">
                            <option value="">B6</option>
                            <option value="">B5</option>
                        </select>
                        <input type="checkbox" />
                    </div>

                    <div className="new_sampler_row">
                        <div className="sample_content_Lane">
                            <div>Import</div>
                        </div>
                        <div className="sampler_content_Lane">
                            <select name="importSound" id="">
                                <option value="">piste 1</option>
                                <option value="">piste 2</option>
                                <option value="">piste 3</option>
                            </select>

                            <select name="range" id="">
                                <option value="">C2</option>
                                <option value="">C1</option>
                            </select>

                            <select name="" id="">
                                <option value="">B6</option>
                                <option value="">B5</option>
                            </select>
                            <input type="checkbox" />
                        </div>
                    </div>


                </div>

            </div>

        </div>


    );
}

export default Sampler;