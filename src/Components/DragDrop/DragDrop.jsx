import React, { useState } from "react";
import classNames from 'classnames';

function DragDrop({id, className, step, track, }) {

    const [allowDrop, setAllowDrop] = useState(false);


    const drop = (ev) => {
       
        ev.preventDefault();
        
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        
        // recuepere les données en fonction de l'id de la personne cibler
        //data = ev.dataTransfer.getData(ev.target.parentNode.id);
        // condition pour voir si l'element est deja a l'interieure ou non

            /* ev.target.parentNode.appendChild(document.getElementById(data))

            // Get audio duration
            let duration = 0.2;
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const request = new XMLHttpRequest()
            request.open('GET', data, true)
            request.responseType = 'arraybuffer'
            request.onload = function() {
                audioContext.decodeAudioData(request.response,
                    function(buffer) {
                      duration = buffer.duration
                      // console.log(duration);

                      const newItem = {step: props.step, track: props.track, data: data, duration: duration};
                    let newArray = [...dataDragDrop, newItem];
            
            // Remove items that have moved in and from the grid
            newArray = newArray.filter(el => 
                document.querySelector(`[data-step='${el.step}'][data-track='${el.track}']`)
                .querySelector('.tracker__sound') !== null
            );
            setDataDragDrop([...newArray])


                    }
                )
            } 
            request.send() */
       
        
    }
    // Necessaire pour react (bug?)
    const preventWeirdBug = (ev) => {
        ev.preventDefault();
    }

    return(
        
        <div
            id= {id}
            className={classNames({
                "drag__item": true,
                "drap__item--ondrap": allowDrop
              })}
            onDragOver={preventWeirdBug}
            onDragEnter={(ev) => setAllowDrop(!allowDrop)}
            onDragLeave={(ev) => setAllowDrop(!allowDrop)}
            onDrop={drop}>
        </div>
    )
}

export default DragDrop;