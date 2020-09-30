import React, {useContext, useEffect, useState} from "react";
import DragDropContext, { DragDropProvider } from "../../context/dragDropContext";
import "./DragDrop.scss";

function DragDrop(props) {
    let itsHere = false;

    let [listNote,setListNote] = useState([]);
    const { dataDragDrop, setDataDragDrop } = useContext(DragDropContext);
    let data = null;


    const drop = (ev) => {
       
        ev.preventDefault();

        console.log(ev.target.parentNode);
        
        // recuepere les données en fonction de l'id de la personne cibler
        data = ev.dataTransfer.getData(ev.target.id);
        // condition pour voir si l'element est deja a l'interieure ou non
        if(!itsHere){

            ev.target.appendChild(document.getElementById(data))

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
            request.send()

            
            
            
        }
        else{
            return console.log("joe",itsHere)
        }
       
        
    }
    // moment du drag ou l'on passe au dessus des blocks ou l'ont peut deposé les blockElements
    const allowDrop = (ev) =>{
        ev.preventDefault();
        

        if(!(ev.target.id === "move")){
            itsHere = true;
        }
    }

    //console.log("dataDragDrop",dataDragDrop)
    return(
        
        <div
        id= {props.id}
        className= {props.className}
        onDrop={(ev) => drop(ev)}
        onDragOver={ (ev) => allowDrop(ev)}
        >
        {props.children}
        </div>
        
    )
}

export default DragDrop;