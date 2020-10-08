import React, { useState } from "react";
import Waveforms from '../Waveforms';
import classNames from 'classnames';

function LibrarySound({index, title, author, url,handleFavoris,item,isFav}) {

/*
* -------------
* STATE 
* -------------
*/
const [changeFav,setIsFav] = useState(isFav);

/*
* -------------
* METHODS 
* -------------
*/

const favo = () => {
    setIsFav(!changeFav);
    handleFavoris(item)
}

/*
* -------------
* RENDER
* -------------
*/

    return (
    <li className="library__sound">
        
        <h3 className="library__sound__header">
            <span className="library__sound__title">{title}</span>
            <span className="library__sound__author">Par {author}</span>
            <span className="library__sound__addFav" onClick={favo} >
                <svg className={classNames({
                    "library__sound__heart": true,
                    "library__sound__heart--active": changeFav
                    })}
                    width="30" height="20" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	                c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                </svg> 
            </span>
        </h3>
        
        <div className="library__sound__waveform">
            <Waveforms
                url={url}
                id={`wf_${index}`}
                height="200"
                barWidth="4"
                waveColor="rgba(255,255,255,0.4)"
                progressColor="rgba(255,255,255,0.9)"
                cursorColor="rgba(0,0,0,0.7)" />
        </div>
    </li>
    );
}

export default LibrarySound;
