import React, { useContext, useState } from "react";
import DragDropContext from "../../context/dragDropContext";
import classNames from 'classnames';

function DragDrop({id, step, track}) {

    const [allowDrop, setAllowDrop] = useState(false);
    const { dataDragDrop, setDataDragDrop } = useContext(DragDropContext);
    let data = null;


    const drop = (ev) => {
       
        ev.preventDefault();
        
        data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        console.log(data);
        

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
                      console.log(duration);
                      
                      const newItem = {step: step, track: track, data: data, duration: duration};
                        let newArray = [...dataDragDrop, newItem];
            
            // Remove items that have moved in and from the grid
            newArray = newArray.filter(el => 
                document.querySelector(`[data-step='${el.step}'][data-track='${el.track}']`)
                .querySelector('.tracker__sound') !== null
            );
            console.log([...newArray]);
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