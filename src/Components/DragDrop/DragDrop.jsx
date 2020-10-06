import React, { useContext, useState } from "react";
import DragDropContext from "../../context/dragDropContext";
import classNames from 'classnames';

function DragDrop({id, step, track}) {

    const [allowDrop, setAllowDrop] = useState(false);
    const { dataDragDrop, setDataDragDrop } = useContext(DragDropContext);


    const drop = (ev) => {
       
        ev.preventDefault();
        
        const data = JSON.parse(ev.dataTransfer.getData("text"));
        ev.target.appendChild(document.getElementById(data.id));
        //console.log(data.parent);
        const url = document.getElementById(data.id).dataset.url;
        //console.log(url);
        

            // Get audio duration
            let duration = 0.2;
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const request = new XMLHttpRequest()
            request.open('GET', url, true)
            request.responseType = 'arraybuffer'
            request.onload = function() {
                //console.log(request.response);
                audioContext.decodeAudioData(request.response,
                    function(buffer) {
                      duration = buffer.duration
                      
                      const newItem = {step: step, track: track, data: url, duration: duration};
                        let newArray = [...dataDragDrop, newItem];
            
            // Remove items that have moved in and from the grid
            newArray = newArray.filter(el => 
                document.querySelector(`[data-step='${el.step}'][data-track='${el.track}']`)
                .querySelector('.tracker__sound') !== null
            );
            //console.log([...newArray]);
            setDataDragDrop([...newArray])


                    }
                )
            } 
            request.send();
       
        
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
                "drap__item--ondrop": allowDrop
              })}
            onDragOver={preventWeirdBug}
            onDragEnter={(ev) => setAllowDrop(!allowDrop)}
            onDragLeave={(ev) => setAllowDrop(!allowDrop)}
            onDrop={(ev) => {drop(ev); setAllowDrop(!allowDrop);}}>
        </div>
    )
}

export default DragDrop;